"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

import { useHeaderPreferences } from "@/hooks/useHeaderPreferences";

import { UserMenu } from "./UserMenu";
import { SettingsDialog } from "../chat/SettingsDialog";

export const Header = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    aiAgents,
    aiModels,
    reasoningLevels,
    verbosityLevels,
    preferences,
    savePreferences,
  } = useHeaderPreferences();

  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  }

  return (
    <section className="flex justify-between items-center p-4 border-b border-border">
      <h1 className="font-bold text-2xl">sAIgely</h1>
      <UserMenu
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
      />
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={(open) => setSettingsOpen(open)}
        aiAgents={aiAgents}
        aiModels={aiModels}
        reasoningLevels={reasoningLevels}
        verbosityLevels={verbosityLevels}
        preferences={preferences}
        onSave={savePreferences}
      />
    </section>
  );
};
