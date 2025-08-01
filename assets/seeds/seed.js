const { createClient } = require("@sanity/client");

const fs = require("fs");
const path = require("path");

// Configure your Sanity client via environment variables

async function run() {
  // Grab the file path from CLI arguments
  const [_, __, filePath, projectId, dataset, token] = process.argv;
  const client = createClient({
    projectId: projectId || "your-project-id",
    dataset: dataset || "your-dataset",
    apiVersion: "2023-03-01", // use current ISO date
    token: token || "<your-write-token>",
    useCdn: false,
  });

  if (!filePath) {
    console.error(
      "❌  No file path provided. Usage: node seed.js <file-to-seed>"
    );
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), filePath);
  console.log(`🔍  Reading file: ${resolvedPath}`);

  // Check existence
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌  File not found: ${resolvedPath}`);
    process.exit(1);
  }

  let docs;
  try {
    const content = fs.readFileSync(resolvedPath, "utf8");
    docs = JSON.parse(content);
    console.log(`✅  Parsed ${docs.length} documents from JSON`);
  } catch (err) {
    console.error(`❌  Failed to read or parse JSON: ${err.message}`);
    process.exit(1);
  }

  const transaction = client.transaction();
  console.log("⏳  Starting transaction...");

  docs.forEach((doc, index) => {
    const { _id, ...body } = doc
    const operationIndex = index + 1
    console.log(`🔄  [${operationIndex}/${docs.length}] ${_id ? 'Replacing' : 'Creating'} document${_id ? `: ${_id}` : ''}`)
    if (_id) {
      transaction.createOrReplace({ _id, ...body })
    } else {
      transaction.create(body)
    }
  });

  try {
    await transaction.commit();
    console.log("🎉  All documents seeded successfully!");
  } catch (err) {
    console.error(`❌  Transaction failed: ${err.message}`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(`❌  Unexpected error: ${err.message}`);
  process.exit(1);
});
