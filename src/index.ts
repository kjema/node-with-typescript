import * as dotenv from "dotenv";
dotenv.config();

import { CosmosClient } from "@azure/cosmos";
import users from "./data/users.json" assert { type: "json" };
import helloWorld from "./helper.cjs";
import { helper } from "./helper.js";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  const { container } = await database.containers.createIfNotExists({
    id: containerId,
  });

  console.log(helloWorld);
  helper();
  console.log(users);
}

try {
  await run();
} catch (error) {
  if (error instanceof Error) console.log(error.message);
  else console.log(error);
}
