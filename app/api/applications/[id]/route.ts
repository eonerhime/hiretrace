// app/api/applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  updateApplicationSchema,
  updateStageSchema,
} from "@/lib/schemas/application";
import { getUserFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Shared ownership check
async function getOwnedApplication(userId: string, id: string) {
  return prisma.application.findFirst({
    where: { id, userId, deletedAt: null },
  });
}

/**
 * GET /api/applications/[id]
 * Auth: Required (JWT cookie)
 *
 * Returns a single application by ID, scoped to the authenticated user.
 *
 * Responses:
 *   200 — Application object
 *   401 — Unauthorized { error }
 *   404 — Not found { error }
 */
// GET single application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getUserFromRequest(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const application = await getOwnedApplication(user.userId, id);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(application);
}

/**
 * PATCH /api/applications/[id]
 * Auth: Required (JWT cookie)
 *
 * Updates an application. Accepts either a stage-only update (from Kanban
 * drag-and-drop) or a full field update from the edit form.
 *
 * Stage-only request body:
 *   { stage: ApplicationStage }
 *
 * Full update request body:
 *   { company?: string, role?: string, location?: string, salary?: string,
 *     jobUrl?: string, followUpAt?: string, notes?: string,
 *     stage?: ApplicationStage, source?: string }
 *
 * Responses:
 *   200 — Updated Application object
 *   400 — Validation failed { error, details }
 *   401 — Unauthorized { error }
 *   404 — Not found { error }
 *   500 — Internal server error { error }
 */
// PATCH — edit application details or stage
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const application = await getOwnedApplication(user.userId, id);
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();

    // Stage-only update (from Kanban drag-and-drop)
    if (Object.keys(body).length === 1 && body.stage) {
      const result = updateStageSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: result.error.flatten().fieldErrors,
          },
          { status: 400 },
        );
      }
      const updated = await prisma.application.update({
        where: { id },
        data: {
          stage: result.data.stage,
          stageEnteredAt: new Date(),
        },
      });
      revalidatePath("/dashboard");
      revalidatePath(`/dashboard/applications/${id}`);
      return NextResponse.json(updated);
    }

    // Full field update
    const result = updateApplicationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      company,
      role,
      location,
      salary,
      jobUrl,
      followUpAt,
      notes,
      stage,
      source,
    } = result.data;

    const updated = await prisma.application.update({
      where: { id },
      data: {
        company,
        role,
        location: location ?? null,
        salary: salary ?? null,
        jobUrl: jobUrl ?? null,
        followUpAt: followUpAt ? new Date(followUpAt) : null,
        notes: notes ?? null,
        source: source ?? null,
        ...(stage ? { stage, stageEnteredAt: new Date() } : {}),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${id}`);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/applications/[id]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/applications/[id]
 * Auth: Required (JWT cookie)
 *
 * Soft-deletes an application by setting deletedAt to the current timestamp.
 * The record is retained in the database but excluded from all queries.
 *
 * Responses:
 *   200 — { message: "Application deleted" }
 *   401 — Unauthorized { error }
 *   404 — Not found { error }
 *   500 — Internal server error { error }
 */
// DELETE — soft delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const application = await getOwnedApplication(user.userId, id);
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.application.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Revalidate the dashboard page to reflect the deletion immediately
    revalidatePath("/dashboard");

    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    console.error("[DELETE /api/applications/[id]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
