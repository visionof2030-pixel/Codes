const express = require("express");

const fs = require("fs");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// ======================
// Middleware
// ======================

app.use(express.json());

// ======================
// Database Path
// ======================

const DB_PATH = path.join(
  __dirname,
  "snippets.json"
);

// ======================
// Read snippets
// ======================

function readSnippets(){

  try{

    const data = fs.readFileSync(
      DB_PATH,
      "utf8"
    );

    return JSON.parse(data);

  }catch{

    return [];

  }

}

// ======================
// Write snippets
// ======================

function writeSnippets(data){

  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2)
  );

}

// ======================
// Home Route
// ======================

app.get("/", (req, res) => {

  res.send("Code Nexus API Running");

});

// ======================
// GET snippets
// ======================

app.get("/api/snippets", (req, res) => {

  const snippets = readSnippets();

  res.json(snippets);

});

// ======================
// POST snippet
// ======================

app.post("/api/snippets", (req, res) => {

  const snippets = readSnippets();

  const newSnippet = {

    id: Date.now(),

    title:
      req.body.title || "Untitled",

    language:
      req.body.language || "text",

    description:
      req.body.description || "",

    code:
      req.body.code || "",

    createdAt:
      new Date().toISOString()

  };

  snippets.unshift(newSnippet);

  writeSnippets(snippets);

  res.json(newSnippet);

});

// ======================
// DELETE snippet
// ======================

app.delete("/api/snippets/:id", (req, res) => {

  const snippets = readSnippets();

  const filtered = snippets.filter(
    s => s.id != req.params.id
  );

  writeSnippets(filtered);

  res.json({
    success: true
  });

});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});