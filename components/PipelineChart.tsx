// components/PipelineChart.tsx
import { Application, ApplicationStage } from "@prisma/client";

const STAGES: ApplicationStage[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "ASSESSMENT",
  "OFFER",
  "CLOSED",
];

const STAGE_COLOURS: Record<ApplicationStage, string> = {
  APPLIED: "bg-blue-400",
  SCREENING: "bg-yellow-400",
  INTERVIEW: "bg-purple-400",
  ASSESSMENT: "bg-orange-400",
  OFFER: "bg-green-400",
  CLOSED: "bg-gray-300",
};

interface PipelineChartProps {
  applications: Application[];
}

export default function PipelineChart({ applications }: PipelineChartProps) {
  const total = applications.length;

  const counts = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = applications.filter((a) => a.stage === stage).length;
      return acc;
    },
    {} as Record<ApplicationStage, number>,
  );

  if (total === 0) {
    return (
      <p className="text-sm text-gray-500">
        No applications yet. Add applications to see your pipeline distribution.
      </p>
    );
  }

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">
        Pipeline Distribution
      </h2>

      {/* Proportional bar */}
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {STAGES.map((stage) => {
          const pct = total > 0 ? (counts[stage] / total) * 100 : 0;
          if (pct === 0) return null;
          return (
            <div
              key={stage}
              className={`${STAGE_COLOURS[stage]} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${stage}: ${counts[stage]}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3">
        {STAGES.map((stage) => (
          <div key={stage} className="flex items-center gap-1.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${STAGE_COLOURS[stage]}`}
            />
            <span className="text-xs text-gray-600">
              {stage.charAt(0) + stage.slice(1).toLowerCase()} ({counts[stage]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
