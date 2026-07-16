import { useState, useMemo, useEffect } from "react";
import { useHeaderPreferences } from "./useHeaderPreferences";

export function usePreferencesSelection() {
  const {
    aiAgents,
    aiModels,
    reasoningLevels,
    verbosityLevels,
    preferences,
    savePreferences,
  } = useHeaderPreferences();

  const [model, setModel] = useState();
  const [temperature, setTemperature] = useState();
  const [reasoning, setReasoning] = useState();
  const [verbosity, setVerbosity] = useState();
  const [category, setCategory] = useState();
  const [agent, setAgent] = useState();
  const [savingSelection, setSavingSelection] = useState(false);

  const agentCategories = useMemo(() => {
    return [
      ...new Set(aiAgents.map((agent) => agent.category).filter(Boolean)),
    ];
  }, [aiAgents]);

  const toAgentCategory = (category) =>
    category.charAt(0).toUpperCase() + category.slice(1);

  const filteredAgents = useMemo(() => {
    if (!category) return [];

    return aiAgents.filter(
      (agent) => agent.category === toAgentCategory(category),
    );
  }, [aiAgents, category]);

  const selectedAgent = aiAgents.find((aiAgent) => aiAgent.agentId === agent);

  const selectedReasoning = reasoningLevels.find(
    (level) => level.levelId === reasoning,
  );

  const selectedVerbosity = verbosityLevels.find(
    (level) => level.levelId === verbosity,
  );

  const selectedModel = aiModels.find((aiModel) => aiModel.modelId === model);

  useEffect(() => {
    if (!preferences || !aiAgents.length) return;

    setModel(preferences.defaultModelId);
    setTemperature(preferences.temperature);
    setReasoning(preferences.defaultReasoningId);
    setVerbosity(preferences.defaultVerbosityId);

    const defaultAgent = aiAgents.find(
      (item) => item.agentId === preferences.defaultAgentId,
    );

    setCategory(defaultAgent?.category ?? "");
    setAgent(preferences.defaultAgentId);
  }, [preferences, aiAgents]);

  useEffect(() => {
    if (!filteredAgents.some((a) => a.agentId === agent)) {
      setAgent(filteredAgents[0]?.agentId ?? "");
    }
  }, [filteredAgents, agent]);

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);

    const nextAgents = aiAgents.filter(
      (item) => item.category === nextCategory,
    );

    setAgent(nextAgents[0]?.agentId ?? "");
  };

  const save = (updates) => {
    const input = {
      ...preferences,
      ...updates,
    };

    const { userId, ...rest } = input;

    return savePreferences(rest);
  };

  const saveModelSelection = async (nextModel) => {
    const previousModel = model;

    setModel(nextModel);
    setSavingSelection(true);

    try {
      await save({ defaultModelId: nextModel });
    } catch (error) {
      setModel(previousModel);
      throw error;
    } finally {
      setSavingSelection(false);
    }
  };

  const saveAgentSelection = async (nextAgent) => {
    const previousAgent = agent;
    const previousCategory = category;
    const nextCategory = aiAgents.find(
      (item) => item.agentId === nextAgent,
    )?.category;

    setAgent(nextAgent);
    setCategory(nextCategory ?? category);
    setSavingSelection(true);

    try {
      await save({ defaultAgentId: nextAgent });
    } catch (error) {
      setAgent(previousAgent);
      setCategory(previousCategory);
      throw error;
    } finally {
      setSavingSelection(false);
    }
  };

  return {
    models: aiModels,
    allAgents: aiAgents,
    agents: filteredAgents,
    categories: agentCategories,
    reasoningLevels,
    verbosityLevels,

    model,
    temperature,
    category,
    agent,
    reasoning,
    verbosity,

    preferences,
    save,
    savingSelection,
    saveModelSelection,
    saveAgentSelection,

    selectedAgent,
    selectedModel,
    selectedReasoning,
    selectedVerbosity,

    setCategory: changeCategory,
    setModel,
    setTemperature,
    setReasoning,
    setVerbosity,
    setAgent,
  };
}
