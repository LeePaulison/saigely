import { useMemo, useState } from "react";

import { useHeaderPreferences } from "./useHeaderPreferences";

export function useChatPreferencesSelection() {
  const {
    aiAgents,
    aiModels,
    preferences,
    savePreferences,
  } = useHeaderPreferences();
  const [savingSelection, setSavingSelection] = useState(false);

  const categories = useMemo(
    () => [...new Set(aiAgents.map((agent) => agent.category).filter(Boolean))],
    [aiAgents],
  );

  const saveSelection = async (updates) => {
    if (!preferences) return;

    const { userId, ...input } = { ...preferences, ...updates };
    setSavingSelection(true);

    try {
      await savePreferences(input);
    } finally {
      setSavingSelection(false);
    }
  };

  return {
    models: aiModels,
    allAgents: aiAgents,
    categories,
    model: preferences?.defaultModelId ?? "",
    agent: preferences?.defaultAgentId ?? "",
    preferences,
    savingSelection,
    saveModelSelection: (defaultModelId) => saveSelection({ defaultModelId }),
    saveAgentSelection: (defaultAgentId) => saveSelection({ defaultAgentId }),
  };
}
