import assert from "node:assert/strict";
import test from "node:test";

import { ObjectId } from "mongodb";
import { createConversationRepository } from "../repositories/conversationRepository.js";

function databaseWithCollection(collection) {
  return { collection: (name) => {
    assert.equal(name, "conversations");
    return collection;
  } };
}

test("malformed conversation IDs are rejected without querying MongoDB", async () => {
  let databaseRequested = false;
  const repository = createConversationRepository({
    getDatabase: async () => {
      databaseRequested = true;
      return databaseWithCollection({});
    },
  });

  assert.equal(await repository.getConversationById("not-an-object-id"), null);
  await assert.rejects(
    repository.appendMessages({ conversationId: "bad", messages: [] }),
    /Invalid conversation ID/,
  );
  assert.equal(databaseRequested, false);
});

test("conversation lookup uses a validated ObjectId", async () => {
  const id = new ObjectId();
  let filter;
  const repository = createConversationRepository({
    getDatabase: async () => databaseWithCollection({
      findOne: async (value) => {
        filter = value;
        return { _id: id };
      },
    }),
  });

  const result = await repository.getConversationById(id.toString());

  assert.equal(result._id, id);
  assert.equal(filter._id.toString(), id.toString());
});

test("conversation summaries project the first message as their preview", async () => {
  let findOptions;
  const cursor = {
    sort() { return this; },
    async toArray() { return []; },
  };
  const repository = createConversationRepository({
    getDatabase: async () => databaseWithCollection({
      find: (_filter, options) => {
        findOptions = options;
        return cursor;
      },
    }),
  });

  await repository.getUserConversations("user-1");

  assert.equal(findOptions.projection.messages.$slice, 1);
});
