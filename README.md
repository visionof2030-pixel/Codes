<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8" />

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>كود نيكسوس</title>

<style>

body{

margin:0;
background:#0b1220;
color:white;
font-family:Arial;

display:flex;
justify-content:center;
align-items:center;

height:100vh;

}

.container{

text-align:center;
width:90%;
max-width:500px;

}

h1{

margin-bottom:20px;

}

p{

opacity:0.7;
margin-bottom:30px;

}

button{

background:#06b6d4;
color:black;
border:none;
padding:16px 26px;
border-radius:14px;
font-size:18px;
font-weight:bold;
cursor:pointer;

}

button:hover{

opacity:0.9;

}

.code-box{

margin-top:30px;
background:#111827;
padding:20px;
border-radius:14px;
display:none;
word-break:break-all;
font-size:20px;

}

</style>

</head>

<body>

<div class="container">

<h1>
كود نيكسوس
</h1>

<p>
اضغط على الزر للحصول على كود تفعيل جديد
</p>

<button id="getCodeBtn">
اضغط للحصول على كود التفعيل
</button>

<div
class="code-box"
id="codeBox">
</div>

</div>

<script>

const API_URL =
"https://codes-5lyb.onrender.com/api/get-code";

const getCodeBtn =
document.getElementById("getCodeBtn");

const codeBox =
document.getElementById("codeBox");

getCodeBtn.onclick = async () => {

try{

getCodeBtn.disabled = true;

getCodeBtn.textContent =
"جاري التحميل...";

const response =
await fetch(API_URL);

const data =
await response.json();

if(data.error){

alert(data.error);

getCodeBtn.disabled = false;

getCodeBtn.textContent =
"اضغط للحصول على كود التفعيل";

return;

}

// إظهار الكود
codeBox.style.display =
"block";

codeBox.textContent =
data.code;

// نسخ تلقائي
await navigator.clipboard.writeText(
data.code
);

getCodeBtn.textContent =
"تم الحصول على الكود";

}catch(error){

alert("حدث خطأ");

getCodeBtn.disabled = false;

getCodeBtn.textContent =
"اضغط للحصول على كود التفعيل";

}

};

</script>

</body>

</html>