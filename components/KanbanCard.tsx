// components/KanbanCard.tsx
"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Application } from "@prisma/client";
import Link from "next/link";

interface KanbanCardProps {
  application: Application;
  index: number;
}

export default function KanbanCard({ application, index }: KanbanCardProps) {
  const isOverdue =
    application.followUpAt &&
    new Date(application.followUpAt) < new Date() &&
    application.stage !== "CLOSED";

  return (
    <Draggable draggableId={application.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-md border bg-white p-3 shadow-sm
                      ${
                        snapshot.isDragging
                          ? "shadow-lg ring-2 ring-indigo-400"
                          : "hover:border-indigo-300"
                      }`}
        >
          <Link
            href={`/dashboard/applications/${application.id}?from=kanban`}
            onClick={(e) => snapshot.isDragging && e.preventDefault()}
          >
            <p className="text-sm font-medium text-gray-900 leading-tight">
              {application.role}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {application.company}
            </p>
            {isOverdue && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                ⚠ Follow-up overdue
              </p>
            )}
          </Link>
        </div>
      )}
    </Draggable>
  );
}
