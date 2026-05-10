<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>كود نيكسوس</title>

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{

  background:#050816;

  color:white;

  font-family:Arial;

  min-height:100vh;

  display:flex;

  justify-content:center;

  align-items:center;

  padding:20px;

}

.container{

  width:100%;

  max-width:500px;

  text-align:center;

}

.logo{

  font-size:48px;

  font-weight:bold;

  margin-bottom:20px;

}

.desc{

  opacity:.7;

  line-height:1.8;

  margin-bottom:40px;

  font-size:18px;

}

#getCodeBtn{

  width:100%;

  padding:20px;

  border:none;

  border-radius:18px;

  background:#06b6d4;

  color:black;

  font-size:22px;

  font-weight:bold;

  cursor:pointer;

  transition:.2s;

}

#getCodeBtn:hover{

  transform:scale(1.02);

}

#getCodeBtn:disabled{

  opacity:.7;

  cursor:not-allowed;

}

.code-box{

  display:none;

  margin-top:30px;

  background:#111827;

  border-radius:20px;

  padding:25px;

  font-size:30px;

  font-weight:bold;

  letter-spacing:2px;

  word-break:break-all;

}

.note{

  margin-top:20px;

  opacity:.5;

  font-size:14px;

}

</style>

</head>

<body>

<div class="container">

  <div class="logo">
    كود نيكسوس
  </div>

  <div class="desc">
    اضغط على الزر للحصول على كود التفعيل الخاص بك.<br>
    يسمح النظام بكود واحد فقط لكل مستخدم.
  </div>

  <button id="getCodeBtn">
    اضغط للحصول على كود التفعيل
  </button>

  <div
    class="code-box"
    id="codeBox">
  </div>

  <div class="note">
    يتم نسخ الكود تلقائياً بعد ظهوره
  </div>

</div>

<script>

// ======================
// API
// ======================

const API_URL =
  "https://codes-5lyb.onrender.com/api/get-code";

// ======================
// Elements
// ======================

const btn =
  document.getElementById("getCodeBtn");

const codeBox =
  document.getElementById("codeBox");

// ======================
// منع التكرار
// ======================

let loading = false;

// ======================
// هل أخذ كود مسبقاً؟
// ======================

if(localStorage.getItem("got_code")){

  btn.disabled = true;

  btn.innerText =
    "تم استلام كود التفعيل";

}

// ======================
// الضغط على الزر
// ======================

btn.addEventListener("click", async () => {

  // منع الضغط المتكرر
  if(loading){

    return;

  }

  // منع أكثر من كود
  if(localStorage.getItem("got_code")){

    alert(
      "لقد حصلت مسبقاً على كود التفعيل 🎉\n\nيسمح النظام بكود واحد فقط لكل مستخدم."
    );

    return;

  }

  // قفل الزر
  loading = true;

  btn.disabled = true;

  btn.innerText =
    "جاري التحميل...";

  try{

    // طلب الكود
    const response =
      await fetch(API_URL);

    const data =
      await response.json();

    // لا توجد أكواد
    if(data.error){

      alert(
        "حالياً لا توجد أكواد متاحة 🙏"
      );

      btn.innerText =
        "لا توجد أكواد";

      return;

    }

    // حفظ أنه أخذ كود
    localStorage.setItem(
      "got_code",
      "true"
    );

    // إظهار الكود
    codeBox.style.display =
      "block";

    codeBox.innerText =
      data.code;

    // نسخ تلقائي
    await navigator.clipboard.writeText(
      data.code
    );

    // تغيير نص الزر
    btn.innerText =
      "تم نسخ الكود بنجاح";

    // رسالة نجاح
    alert(
      "تم استلام كود التفعيل بنجاح ✅\n\nلا يمكن الحصول على أكثر من كود."
    );

  }catch(error){

    // خطأ
    alert(
      "حدث خطأ أثناء جلب الكود"
    );

    // إعادة التفعيل
    loading = false;

    btn.disabled = false;

    btn.innerText =
      "اضغط للحصول على كود التفعيل";

  }

});

</script>

</body>

</html>