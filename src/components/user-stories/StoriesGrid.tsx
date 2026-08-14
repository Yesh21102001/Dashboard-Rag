"use client";

import { useState } from "react";
import { EpicRowData } from "@/types";
import EpicRow from "./EpicRow";
import FeatureRow from "./FeatureRow";
import UserStoryRow from "./UserStoryRow";

interface StoriesGridProps {
  epics: EpicRowData[];
}

export default function StoriesGrid({ epics }: StoriesGridProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(epics.flatMap((e) => [e.id, ...e.features.map((f) => f.id)]))
  );

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col font-body-sm text-body-sm text-on-surface">
      {epics.map((epic) => {
        const epicExpanded = expandedIds.has(epic.id);
        return (
          <div key={epic.id}>
            <EpicRow epic={epic} expanded={epicExpanded} onToggle={() => toggle(epic.id)} />

            {epicExpanded &&
              epic.features.map((feature) => {
                const featureExpanded = expandedIds.has(feature.id);
                return (
                  <div key={feature.id}>
                    <FeatureRow
                      feature={feature}
                      expanded={featureExpanded}
                      onToggle={() => toggle(feature.id)}
                    />
                    {featureExpanded &&
                      feature.stories.map((story) => (
                        <UserStoryRow key={story.id} story={story} />
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
