// app/dashboard/applications/[id]/page.tsx
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { ApplicationStage } from "@prisma/client";

const stageLabels: Record<ApplicationStage, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  ASSESSMENT: "Assessment",
  OFFER: "Offer",
  CLOSED: "Closed",
};

const stageColours: Record<ApplicationStage, string> = {
  APPLIED: "bg-blue-100   text-blue-800",
  SCREENING: "bg-yellow-100 text-yellow-800",
  INTERVIEW: "bg-purple-100 text-purple-800",
  ASSESSMENT: "bg-orange-100 text-orange-800",
  OFFER: "bg-green-100  text-green-800",
  CLOSED: "bg-gray-100   text-gray-600",
};

interface DetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { id } = await params;
  const { from } = await searchParams;

  const backHref = from === "kanban" ? "/dashboard?from=kanban" : "/dashboard";
  const backLabel = from === "kanban" ? "← Back to Kanban" : "← Back to list";
  const editHref =
    from === "kanban"
      ? `/dashboard/applications/${id}/edit?from=kanban`
      : `/dashboard/applications/${id}/edit`;

  const cookieStore = await cookies();
  const token = cookieStore.get("hiretrace-token")?.value;
  if (!token) redirect("/login");

  let userId: string;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    userId = payload.userId as string;
  } catch {
    redirect("/login");
  }

  const application = await prisma.application.findFirst({
    where: { id, userId, deletedAt: null },
  });

  if (!application) notFound();

  const isOverdue =
    application.followUpAt &&
    new Date(application.followUpAt) < new Date() &&
    application.stage !== "CLOSED";

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {/* Back link */}
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center text-sm text-gray-500
             hover:text-gray-700"
      >
        {backLabel}
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {application.role}
          </h1>
          <p className="mt-1 text-gray-500">{application.company}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium
                      ${stageColours[application.stage]}`}
        >
          {stageLabels[application.stage]}
        </span>
      </div>

      {/* Details card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <dl className="divide-y divide-gray-100">
          {[
            { label: "Location", value: application.location },
            { label: "Salary", value: application.salary },
            {
              label: "Job URL",
              value: application.jobUrl ? (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-500"
                >
                  View posting
                </a>
              ) : null,
            },
            {
              label: "Follow-up",
              value: application.followUpAt
                ? new Date(application.followUpAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : null,
            },
            {
              label: "Applied",
              value: new Date(application.appliedAt).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              ),
            },
          ]
            .filter((row) => row.value)
            .map((row) => (
              <div key={row.label} className="flex py-3 text-sm">
                <dt className="w-32 shrink-0 font-medium text-gray-500">
                  {row.label}
                </dt>
                <dd className="text-gray-900">{row.value}</dd>
              </div>
            ))}
        </dl>

        {isOverdue && (
          <div className="mt-4 rounded-md bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              ⚠ Follow-up is overdue. Consider reaching out.
            </p>
          </div>
        )}

        {application.notes && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="mb-1 text-sm font-medium text-gray-500">Notes</p>
            <p className="whitespace-pre-wrap text-sm text-gray-900">
              {application.notes}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <Link
          href={editHref}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium
                     text-white hover:bg-indigo-700"
        >
          Edit
        </Link>
        <DeleteButton applicationId={id} />
      </div>
    </main>
  );
}
