import { useEffect, useState } from "react";

import { usePreferencesStore } from "@/store/stores/preferencesStore";

import { updatePreferences } from "@/lib/graphql/preference/preference";
import { getAiAgents } from "@/lib/graphql/ai/aiAgents";
import { getAiModels } from "@/lib/graphql/ai/aiModels";

export const useHeaderPreferences = () => {
  const { preferences, setPreferences } = usePreferencesStore();
  const [aiAgents, setAiAgents] = useState([]);
  const [aiModels, setAiModels] = useState([]);

  console.log("Preferences: ", preferences);
  console.log("aiAgents: ", aiAgents);
  console.log("aiModels: ", aiModels);

  const savePreferences = async (input) => {
    const updatedPreferences = await updatePreferences(input);

    setPreferences(updatedPreferences);

    return updatedPreferences;
  };

  useEffect(() => {
    const load = async () => {
      const [aiAgents, aiModels] = await Promise.all([
        getAiAgents(),
        getAiModels(),
      ]);

      setAiAgents(aiAgents);
      setAiModels(aiModels);
    };

    load();
  }, []);

  return { aiAgents, aiModels, preferences, savePreferences };
};
