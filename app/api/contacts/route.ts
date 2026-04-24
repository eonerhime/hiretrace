// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { createContactSchema } from "@/lib/schemas/contact";

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = createContactSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 },
    );

  // Verify the application belongs to the user
  const application = await prisma.application.findFirst({
    where: {
      id: result.data.applicationId,
      userId: user.userId,
      deletedAt: null,
    },
  });
  if (!application)
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );

  const contact = await prisma.contact.create({ data: result.data });
  return NextResponse.json(contact, { status: 201 });
}
