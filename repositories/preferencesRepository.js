// repositories/preferencesRepository.js

import { eq } from "drizzle-orm";

import { db } from "@/lib/db/neon";
import { preferences } from "@/drizzle/preferences";
import {
  DEFAULT_AI_MODEL_ID,
  defaultAiModels,
} from "@/repositories/aiModelsRepository";

export async function getPreferencesByUserId(userId) {
  const [preference] = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId));

  if (
    preference &&
    defaultAiModels.some(({ modelId }) => modelId === preference.defaultModelId)
  ) {
    return preference;
  }

  return upsertPreferences({
    userId,
    theme: preference?.theme ?? "dark",
    defaultModelId: DEFAULT_AI_MODEL_ID,
    temperature: preference?.temperature ?? 0.7,
    defaultReasoningId: preference?.defaultReasoningId ?? "medium",
    defaultVerbosityId: preference?.defaultVerbosityId ?? "medium",
    defaultAgentId: preference?.defaultAgentId ?? "assistant",
  });
}

export async function upsertPreferences({
  userId,
  theme,
  defaultModelId,
  temperature,
  defaultReasoningId,
  defaultVerbosityId,
  defaultAgentId,
}) {
  const [preference] = await db
    .insert(preferences)
    .values({
      userId,
      theme,
      defaultModelId,
      temperature,
      defaultReasoningId,
      defaultVerbosityId,
      defaultAgentId,
    })
    .onConflictDoUpdate({
      target: preferences.userId,
      set: {
        theme,
        defaultModelId,
        temperature,
        defaultReasoningId,
        defaultVerbosityId,
        defaultAgentId,
        updatedAt: new Date(),
      },
    })
    .returning();

  return preference;
}
