const express = require("express");

const fs = require("fs");

const path = require("path");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// ======================
// Middleware
// ======================

app.use(cors());

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
// Home
// ======================

app.get("/", (req, res) => {

  res.send("Code Nexus API Running");

});

// ======================
// GET snippets
// ======================

app.get("/api/snippets", (req, res) => {

  const snippets = readSnippets();

  // إخفاء الأكواد المستخدمة
  const available =
    snippets.filter(s => !s.used);

  res.json(available);

});

// ======================
// Copy once only
// ======================

app.post("/api/copy/:id", (req, res) => {

  const snippets = readSnippets();

  const snippet =
    snippets.find(
      s => s.id == req.params.id
    );

  // غير موجود
  if(!snippet){

    return res.status(404).json({
      error: "الكود غير موجود"
    });

  }

  // مستخدم مسبقًا
  if(snippet.used){

    return res.status(400).json({
      error: "الكود مستخدم مسبقًا"
    });

  }

  // تفعيل الاستخدام
  snippet.used = true;

  writeSnippets(snippets);

  // إرسال الكود
  res.json({
    code: snippet.code
  });

});

// ======================
// POST snippet
// ======================

app.post("/api/snippets", (req, res) => {

  const snippets = readSnippets();

  const newSnippet = {

    id: Date.now(),

    title:
      req.body.title || "كود تفعيل",

    language:
      req.body.language || "text",

    description:
      req.body.description || "",

    code:
      req.body.code || "",

    used: false,

    createdAt:
      new Date().toISOString()

  };

  snippets.unshift(newSnippet);

  writeSnippets(snippets);

  res.json(newSnippet);

});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});