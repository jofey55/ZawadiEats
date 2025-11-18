"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function main() {
    console.log("DB is configured:", !!db_1.db);
}
main().catch((err) => {
    console.error("Error in main:", err);
    process.exit(1);
});
