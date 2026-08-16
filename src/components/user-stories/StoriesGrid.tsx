"use client";

import { useState, useEffect } from "react";
import { EpicRowData, UserStoryRowData } from "@/types";
import EpicRow from "./EpicRow";
import FeatureRow from "./FeatureRow";
import UserStoryRow from "./UserStoryRow";

interface StoriesGridProps {
  epics: EpicRowData[];
}

export default function StoriesGrid({ epics: initialEpics }: StoriesGridProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(initialEpics.flatMap((e) => [e.id, ...e.features.map((f) => f.id)]))
  );
  const [epics, setEpics] = useState<EpicRowData[]>(initialEpics);

  useEffect(() => {
    setEpics(initialEpics);
    setExpandedIds(new Set(initialEpics.flatMap((e) => [e.id, ...e.features.map((f) => f.id)])));
  }, [initialEpics]);

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

  const handleDeleteStory = (storyId: string) => {
    setEpics((prev) =>
      prev.map((epic) => ({
        ...epic,
        features: epic.features.map((feature) => ({
          ...feature,
          stories: feature.stories.filter((story) => story.id !== storyId),
        })),
      }))
    );
  };

  const handleUpdateStory = (updatedStory: UserStoryRowData) => {
    setEpics((prev) =>
      prev.map((epic) => ({
        ...epic,
        features: epic.features.map((feature) => ({
          ...feature,
          stories: feature.stories.map((story) =>
            story.id === updatedStory.id ? updatedStory : story
          ),
        })),
      }))
    );
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
                        <UserStoryRow
                          key={story.id}
                          story={story}
                          onDelete={handleDeleteStory}
                          onUpdate={handleUpdateStory}
                        />
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
