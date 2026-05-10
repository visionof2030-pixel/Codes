<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>كود نيكسوس</title>

  <!-- Prism -->

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.min.css"
  />

  <script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/prismjs/components/prism-python.min.js"></script>

  <!-- Style -->

  <style>

    body{

      margin:0;

      background:#0b1220;

      color:white;

      font-family:Arial;

    }

    .container{

      display:flex;

      min-height:100vh;

    }

    .sidebar{

      width:320px;

      background:#111827;

      padding:20px;

      border-left:1px solid #1f2937;

    }

    .viewer{

      flex:1;

      padding:30px;

    }

    h1{

      margin-top:0;

    }

    #searchInput{

      width:100%;

      padding:12px;

      border:none;

      border-radius:10px;

      margin-bottom:20px;

      background:#1f2937;

      color:white;

      outline:none;

    }

    .snippet-item{

      background:#1f2937;

      padding:14px;

      border-radius:12px;

      margin-bottom:10px;

      cursor:pointer;

      transition:0.2s;

    }

    .snippet-item:hover{

      background:#374151;

    }

    .snippet-title{

      font-weight:bold;

      margin-bottom:5px;

    }

    .snippet-lang{

      font-size:14px;

      opacity:0.7;

    }

    button{

      background:#06b6d4;

      color:black;

      border:none;

      padding:12px 20px;

      border-radius:12px;

      cursor:pointer;

      margin-bottom:20px;

      font-weight:bold;

    }

    pre{

      border-radius:15px;

      overflow:auto;

    }

    .description{

      opacity:0.8;

      margin-bottom:20px;

    }

    @media(max-width:768px){

      .container{

        flex-direction:column;

      }

      .sidebar{

        width:auto;

      }

    }

  </style>

</head>

<body>

<div class="container">

  <!-- Sidebar -->

  <aside class="sidebar">

    <h1>كود نيكسوس</h1>

    <input
      type="text"
      id="searchInput"
      placeholder="بحث..."
    >

    <div id="snippetsList"></div>

  </aside>

  <!-- Viewer -->

  <main class="viewer">

    <h2 id="title">
      اختر كود
    </h2>

    <p
      class="description"
      id="description">
    </p>

    <button id="copyBtn">
      نسخ الكود
    </button>

    <pre>
      <code
        id="codeBlock"
        class="language-javascript">
      </code>
    </pre>

  </main>

</div>

<script>

// =======================
// Backend API URL
// =======================

const API_URL =
  "https://codes-5lyb.onrender.com/api/snippets";

// =======================
// Elements
// =======================

const snippetsList =
  document.getElementById("snippetsList");

const titleEl =
  document.getElementById("title");

const descEl =
  document.getElementById("description");

const codeBlock =
  document.getElementById("codeBlock");

const copyBtn =
  document.getElementById("copyBtn");

const searchInput =
  document.getElementById("searchInput");

// =======================
// State
// =======================

let snippets = [];

// =======================
// Load snippets
// =======================

async function loadSnippets(){

  try{

    const response =
      await fetch(API_URL);

    snippets =
      await response.json();

    renderSnippets(snippets);

    if(snippets.length){

      showSnippet(snippets[0]);

    }

  }catch(error){

    console.error(error);

    alert("فشل تحميل الأكواد");

  }

}

// =======================
// Render snippets
// =======================

function renderSnippets(data){

  snippetsList.innerHTML = "";

  data.forEach(snippet => {

    const div =
      document.createElement("div");

    div.className =
      "snippet-item";

    div.innerHTML = `

      <div class="snippet-title">
        ${snippet.title}
      </div>

      <div class="snippet-lang">
        ${snippet.language}
      </div>

    `;

    div.addEventListener("click", () => {

      showSnippet(snippet);

    });

    snippetsList.appendChild(div);

  });

}

// =======================
// Show snippet
// =======================

function showSnippet(snippet){

  titleEl.textContent =
    snippet.title;

  descEl.textContent =
    snippet.description;

  codeBlock.textContent =
    snippet.code;

  codeBlock.className =
    `language-${snippet.language}`;

  Prism.highlightElement(codeBlock);

  copyBtn.onclick = async () => {

    await navigator.clipboard.writeText(
      snippet.code
    );

    alert("تم النسخ");

  };

}

// =======================
// Search
// =======================

searchInput.addEventListener("input", e => {

  const value =
    e.target.value.toLowerCase();

  const filtered =
    snippets.filter(s =>

      s.title.toLowerCase()
      .includes(value)

    );

  renderSnippets(filtered);

});

// =======================
// Start
// =======================

loadSnippets();

</script>

</body>

</html>