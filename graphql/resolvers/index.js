// graphql/resolvers/index.js

import { preferencesResolver } from "./preferences.js";
import { aiAgentsResolvers } from "./aiAgents.js";
import { aiModelResolvers } from "./aiModel.js";
import { reasoningLevelsResolver } from "./reasoningLevels.js";
import { verbosityLevelResolver } from "./verbosityLevel.js";

export const resolvers = {
  Query: {
    ...preferencesResolver.Query,
    ...aiAgentsResolvers.Query,
    ...aiModelResolvers.Query,
    ...reasoningLevelsResolver.Query,
    ...verbosityLevelResolver.Query,
  },
  Mutation: {
    ...preferencesResolver.Mutation,
  },
};
