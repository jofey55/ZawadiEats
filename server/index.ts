import { db } from "./db";

async function main() {
  console.log("DB is configured:", !!db);
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
