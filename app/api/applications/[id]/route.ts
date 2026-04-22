// app/api/applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  updateApplicationSchema,
  updateStageSchema,
} from "@/lib/schemas/application";
import { getUserFromRequest } from "@/lib/auth";

// Shared ownership check
async function getOwnedApplication(userId: string, id: string) {
  return prisma.application.findFirst({
    where: { id, userId, deletedAt: null },
  });
}

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
        data: { stage: result.data.stage },
      });
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
        ...(stage ? { stage } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/applications/[id]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

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

    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    console.error("[DELETE /api/applications/[id]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
