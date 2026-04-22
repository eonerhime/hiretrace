"use client";

import { useState, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@prisma/client";
import KanbanColumn from "./KanbanColumn";

const STAGES: ApplicationStage[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "ASSESSMENT",
  "OFFER",
  "CLOSED",
];

interface KanbanBoardProps {
  initialApplications: Application[];
  onStageChange: (id: string, newStage: ApplicationStage) => void;
}

export default function KanbanBoard({
  initialApplications,
  onStageChange,
}: KanbanBoardProps) {
  const [applications, setApplications] = useState(initialApplications);

  const getByStage = (stage: ApplicationStage) =>
    applications.filter((a) => a.stage === stage);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { draggableId, destination, source } = result;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const newStage = destination.droppableId as ApplicationStage;

      // Optimistic update — local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === draggableId ? { ...app, stage: newStage } : app,
        ),
      );

      try {
        const res = await fetch(`/api/applications/${draggableId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: newStage }),
        });

        if (res.ok) {
          // Propagate to DashboardClient so list view stays in sync
          onStageChange(draggableId, newStage);
        } else {
          // Revert local state on failure
          setApplications((prev) =>
            prev.map((app) =>
              app.id === draggableId
                ? { ...app, stage: source.droppableId as ApplicationStage }
                : app,
            ),
          );
        }
      } catch {
        // Revert on network error
        setApplications((prev) =>
          prev.map((app) =>
            app.id === draggableId
              ? { ...app, stage: source.droppableId as ApplicationStage }
              : app,
          ),
        );
      }
    },
    [onStageChange],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            applications={getByStage(stage)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
