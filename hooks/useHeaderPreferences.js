import { useEffect, useState } from "react";

import { usePreferencesStore } from "@/store/stores/preferencesStore";

import { updatePreferences } from "@/lib/graphql/preference/preference";
import { getAiAgents } from "@/lib/graphql/ai/aiAgents";
import { getAiModels } from "@/lib/graphql/ai/aiModels";
import { getVerbosityLevels } from "@/lib/graphql/ai/verbosityLevels";
import { getReasoningLevels } from "@/lib/graphql/ai/reasoningLevels";

export const useHeaderPreferences = () => {
  const { preferences, setPreferences } = usePreferencesStore();
  const [aiAgents, setAiAgents] = useState([]);
  const [aiModels, setAiModels] = useState([]);
  const [verbosityLevels, setVerbosityLevels] = useState([]);
  const [reasoningLevels, setReasoningLevels] = useState([]);

  const savePreferences = async (input) => {
    const updatedPreferences = await updatePreferences(input);

    setPreferences(updatedPreferences);

    return updatedPreferences;
  };

  useEffect(() => {
    const load = async () => {
      const [aiAgents, aiModels, reasoningLevels, verbosityLevels] =
        await Promise.all([
          getAiAgents(),
          getAiModels(),
          getReasoningLevels(),
          getVerbosityLevels(),
        ]);

      setAiAgents(aiAgents);
      setAiModels(aiModels);
      setVerbosityLevels(verbosityLevels);
      setReasoningLevels(reasoningLevels);
    };

    load();
  }, []);

  return {
    aiAgents,
    aiModels,
    reasoningLevels,
    verbosityLevels,
    preferences,
    savePreferences,
  };
};
