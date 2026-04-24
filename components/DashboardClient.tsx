"use client";

import { useState } from "react";
import { Application, ApplicationStage } from "@prisma/client";
import Link from "next/link";
import ApplicationList from "./ApplicationList";
import KanbanBoard from "./KanbanBoard";
import StatsBar from "./StatsBar";
import PipelineChart from "./PipelineChart";

interface DashboardClientProps {
  initialApplications: Application[];
  initialView: "list" | "kanban";
}

type ViewMode = "list" | "kanban";

export default function DashboardClient({
  initialApplications,
  initialView,
}: DashboardClientProps) {
  const [view, setView] = useState<ViewMode>(initialView);
  const [applications, setApplications] = useState(initialApplications);

  const handleStageChange = (id: string, newStage: ApplicationStage) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage: newStage } : app)),
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mr-6">
            Applications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {applications.length === 0
              ? "No applications yet"
              : `${applications.length} application${
                  applications.length === 1 ? "" : "s"
                }`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border border-gray-300 bg-white">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-sm font-medium rounded-l-md transition-colors
                          ${
                            view === "list"
                              ? "bg-indigo-600 text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
            >
              List
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`px-3 py-1.5 text-sm font-medium rounded-r-md transition-colors
                          ${
                            view === "kanban"
                              ? "bg-indigo-600 text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
            >
              Kanban
            </button>
          </div>
          <Link
            href="/dashboard/applications/new"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium
                       text-white hover:bg-indigo-700"
          >
            + Add Application
          </Link>
        </div>
      </div>

      {/* Stats bar — always visible */}
      <StatsBar applications={applications} />

      {/* Pipeline chart — only shown when applications exist */}
      {applications.length > 0 && <PipelineChart applications={applications} />}

      {/* View */}
      {view === "list" ? (
        <ApplicationList applications={applications} />
      ) : (
        <KanbanBoard
          applications={applications}
          onStageChange={handleStageChange}
        />
      )}
    </main>
  );
}
