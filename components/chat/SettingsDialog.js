"use client";

import { useState, useEffect, useMemo } from "react";

import { Dialog } from "radix-ui";
import { ScrollArea } from "radix-ui";
import { useTheme } from "next-themes";

export const SettingsDialog = ({
  open,
  onOpenChange,
  aiAgents,
  aiModels,
  reasoningLevels,
  verbosityLevels,
  preferences,
  onSave,
}) => {
  const { theme, setTheme } = useTheme();
  const [model, setModel] = useState();
  const [temperature, setTemperature] = useState();
  const [reasoning, setReasoning] = useState();
  const [verbosity, setVerbosity] = useState();
  const [category, setCategory] = useState();
  const [agent, setAgent] = useState();

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

  const handleSave = async () => {
    await onSave({
      theme,
      defaultModelId: model,
      temperature,
      defaultReasoningId: reasoning,
      defaultVerbosityId: verbosity,
      defaultAgentId: agent,
    });

    onOpenChange(false);
  };

  const selectedAgent = aiAgents.find((aiAgent) => aiAgent.agentId === agent);

  const selectedReasoning = reasoningLevels.find(
    (level) => level.levelId === reasoning,
  );

  const selectedVerbosity = verbosityLevels.find(
    (level) => level.levelId === verbosity,
  );

  const selectedModel = aiModels.find((aiModel) => aiModel.modelId === model);
  const supportsTemperature = !!selectedModel?.supportsTemperature;
  const supportsReasoning = !!selectedModel?.supportsReasoning;
  const supportsVerbosity = !!selectedModel?.supportsVerbosity;

  useEffect(() => {
    if (!preferences) return;

    setTheme(preferences.theme);
    setModel(preferences.defaultModelId);
    setTemperature(preferences.temperature);
    setReasoning(preferences.defaultReasoningId);
    setVerbosity(preferences.defaultVerbosityId);
    setAgent(preferences.defaultAgentId);

    const selectedAgent = aiAgents.find(
      (agent) => agent.agentId === preferences.defaultAgentId,
    );

    if (selectedAgent) {
      setCategory(selectedAgent.category);
    }
  }, [open, preferences, aiAgents, setTheme]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Settings</Dialog.Title>

          <Dialog.Description className="DialogDescription">
            Customize your Saigely experience.
          </Dialog.Description>

          <ScrollArea.Root className="DialogScrollArea">
            <ScrollArea.Viewport className="DialogViewport">
              <div className="DialogCard">
                <div className="DialogCardTitle">Appearance</div>

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
                </div>
              </div>

              {/* AI Model */}
              <div className="DialogCard">
                <div className="DialogCardTitle">Model</div>

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
                  <p className="FieldDescription">
                    {selectedModel?.description}
                  </p>
                </div>

                {/* Temperature */}

                {supportsTemperature && (
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
                      onChange={(event) =>
                        setTemperature(Number(event.target.value))
                      }
                    />
                  </div>
                )}

                {supportsReasoning && (
                  <div className="DialogField">
                    <label className="DialogLabel" htmlFor="model">
                      AI Model Reasoning
                    </label>

                    <select
                      id="model"
                      className="DialogSelect"
                      value={reasoning}
                      onChange={(event) => setReasoning(event.target.value)}
                    >
                      {reasoningLevels.map((level) => (
                        <option key={level.levelId} value={level.levelId}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                    <p className="FieldDescription">
                      {selectedReasoning?.description}
                    </p>
                  </div>
                )}

                {supportsVerbosity && (
                  <div className="DialogField">
                    <label className="DialogLabel" htmlFor="model">
                      AI Model Verbosity
                    </label>

                    <select
                      id="model"
                      className="DialogSelect"
                      value={verbosity}
                      onChange={(event) => setVerbosity(event.target.value)}
                    >
                      {verbosityLevels.map((level) => (
                        <option key={level.levelId} value={level.levelId}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                    <p className="FieldDescription">
                      {selectedVerbosity?.description}
                    </p>
                  </div>
                )}
              </div>

              {/* AI Agents */}
              <div className="DialogCard">
                <div className="DialogCardTitle">Agent</div>

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
                  <p className="FieldDescription mb-0">
                    {selectedAgent?.description}
                  </p>
                </div>
              </div>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="DialogScrollbar"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="DialogScrollThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="DialogScrollCorner" />
          </ScrollArea.Root>

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
