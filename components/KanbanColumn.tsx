// components/KanbanColumn.tsx
import { Droppable } from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@prisma/client";
import KanbanCard from "./KanbanCard";

const stageColours: Record<ApplicationStage, string> = {
  APPLIED: "border-blue-200   bg-blue-50",
  SCREENING: "border-yellow-200 bg-yellow-50",
  INTERVIEW: "border-purple-200 bg-purple-50",
  ASSESSMENT: "border-orange-200 bg-orange-50",
  OFFER: "border-green-200  bg-green-50",
  CLOSED: "border-gray-200   bg-gray-50",
};

const stageLabels: Record<ApplicationStage, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  ASSESSMENT: "Assessment",
  OFFER: "Offer",
  CLOSED: "Closed",
};

interface KanbanColumnProps {
  stage: ApplicationStage;
  applications: Application[];
}

export default function KanbanColumn({
  stage,
  applications,
}: KanbanColumnProps) {
  return (
    <div className="flex min-w-55 flex-col rounded-lg border bg-white shadow-sm">
      {/* Column header */}
      <div
        className={`rounded-t-lg border-b px-3 py-2.5 ${stageColours[stage]}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            {stageLabels[stage]}
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500 shadow-sm">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-1 flex-col gap-2 p-2 transition-colors
                        ${snapshot.isDraggingOver ? "bg-indigo-50" : ""}`}
            style={{ minHeight: 120 }}
          >
            {applications.map((app, index) => (
              <KanbanCard key={app.id} application={app} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
