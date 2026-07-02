"use client";

import { useState, useEffect, useMemo } from "react";

import { Dialog } from "radix-ui";
import { useTheme } from "next-themes";

export const SettingsDialog = ({
  open,
  onOpenChange,
  aiAgents,
  aiModels,
  preferences,
  onSave,
}) => {
  const { theme, setTheme } = useTheme();
  const [model, setModel] = useState();
  const [temperature, setTemperature] = useState();
  const [category, setCategory] = useState();
  const [agent, setAgent] = useState();

  console.log("Values: ", theme, model, temperature, category, agent);

  const agentCategories = useMemo(() => {
    return [
      ...new Set(aiAgents.map((agent) => agent.category).filter(Boolean)),
    ];
  }, [aiAgents]);

  const filteredAgents = useMemo(() => {
    if (!category) return [];

    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);

    return aiAgents.filter((agent) => agent.category === formattedCategory);
  }, [aiAgents, category]);

  console.log("agent categories: ", agentCategories);
  console.log("filtered agents: ", filteredAgents);

  const handleSave = async () => {
    await onSave({
      theme,
      defaultModelId: model,
      temperature,
      defaultAgentId: agent,
    });

    onOpenChange(false);
  };

  useEffect(() => {
    if (!preferences) return;

    setTheme(preferences.theme);
    setModel(preferences.defaultModelId);
    setTemperature(preferences.temperature);
    setAgent(preferences.defaultAgentId);

    const selectedAgent = aiAgents.find(
      (agent) => agent.agentId === preferences.defaultAgentId,
    );

    if (selectedAgent) {
      setCategory(selectedAgent.category);
    }
  }, [preferences, aiAgents, setTheme]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Settings</Dialog.Title>

          <Dialog.Description className="DialogDescription">
            Customize your Saigely experience.
          </Dialog.Description>

          <div className="DialogSection">
            <div className="DialogField">
              <label className="DialogLabel" htmlFor="theme">
                Theme
              </label>

              <select
                id="theme"
                className="DialogSelect"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* AI Model */}

            <div className="DialogField">
              <label className="DialogLabel" htmlFor="model">
                AI Model
              </label>

              <select
                id="model"
                className="DialogSelect"
                value={model}
                onChange={(event) => setModel(event.target.value)}
              >
                {aiModels.map((model) => (
                  <option key={model.modelId} value={model.modelId}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature */}

            <div className="DialogField">
              <label className="DialogLabel" htmlFor="temperature">
                Temperature
              </label>

              <input
                id="temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                className="DialogSlider"
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
              />
            </div>
          </div>

          {/* AI Agents */}

          <div className="DialogField">
            <label className="DialogLabel" htmlFor="agent">
              Agent Category
            </label>

            <select
              id="agent"
              className="DialogSelect"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {agentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="DialogField">
            <label className="DialogLabel" htmlFor="agent">
              Agent
            </label>

            <select
              id="agent"
              className="DialogSelect"
              value={agent}
              onChange={(event) => setAgent(event.target.value)}
            >
              {filteredAgents.map((agent) => (
                <option key={agent.agentId} value={agent.agentId}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="DialogFooter">
            <Dialog.Close asChild>
              <button className="border border-primary rounded-md py-2 px-3 hover:border-primary-hover cursor-pointer">
                Close
              </button>
            </Dialog.Close>

            <button
              className="bg-primary text-white rounded-md py-2 px-3 hover:bg-primary-hover cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
