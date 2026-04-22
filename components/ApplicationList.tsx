// components/ApplicationList.tsx
"use client";

import { Application } from "@prisma/client";
import ApplicationCard from "./ApplicationCard";
import Link from "next/link";

interface ApplicationListProps {
  applications: Application[];
}

export default function ApplicationList({
  applications,
}: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <p className="text-gray-500">No applications yet.</p>
        <Link
          href="/dashboard/applications/new"
          className="mt-3 inline-block text-sm font-medium text-indigo-600
                     hover:text-indigo-500"
        >
          Add your first application →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
