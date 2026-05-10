<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

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

  display:flex;

  justify-content:center;

  align-items:center;

  min-height:100vh;

  padding:20px;

}

.container{

  width:100%;

  max-width:500px;

  text-align:center;

}

.logo{

  font-size:42px;

  font-weight:bold;

  margin-bottom:10px;

}

.desc{

  opacity:.7;

  margin-bottom:40px;

  line-height:1.8;

}

#getCodeBtn{

  width:100%;

  padding:18px;

  border:none;

  border-radius:18px;

  background:#06b6d4;

  color:#000;

  font-size:20px;

  font-weight:bold;

  cursor:pointer;

  transition:.2s;

}

#getCodeBtn:hover{

  transform:scale(1.02);

}

#getCodeBtn:disabled{

  opacity:.6;

  cursor:not-allowed;

}

.code-box{

  margin-top:30px;

  background:#111827;

  padding:25px;

  border-radius:20px;

  font-size:30px;

  letter-spacing:2px;

  font-weight:bold;

  display:none;

  word-break:break-all;

}

.note{

  margin-top:20px;

  opacity:.6;

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
    كل مستخدم يمكنه الحصول على كود واحد فقط.
  </div>

  <button id="getCodeBtn">
    اضغط للحصول على كود التفعيل
  </button>

  <div class="code-box" id="codeBox"></div>

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
// هل أخذ كود سابقاً؟
// ======================

const alreadyUsed =
  localStorage.getItem("got_code");

if(alreadyUsed){

  btn.disabled = true;

  btn.innerText =
    "تم استلام كود التفعيل";

}

// ======================
// الضغط على الزر
// ======================

btn.addEventListener("click", async () => {

  // منع أكثر من مرة
  if(localStorage.getItem("got_code")){

    alert(
      "لقد حصلت مسبقاً على كود التفعيل 🎉\n\nنظام التفعيل يسمح بكود واحد فقط لكل مستخدم."
    );

    return;

  }

  btn.innerText =
    "جاري التحميل...";

  try{

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

    // إظهار الكود
    codeBox.style.display =
      "block";

    codeBox.innerText =
      data.code;

    // نسخ تلقائي
    await navigator.clipboard.writeText(
      data.code
    );

    // حفظ أنه أخذ كود
    localStorage.setItem(
      "got_code",
      "true"
    );

    // تعطيل الزر
    btn.disabled = true;

    btn.innerText =
      "تم نسخ الكود بنجاح";

    // رسالة لطيفة
    alert(
      "تم نسخ كود التفعيل بنجاح ✅\n\nلا يمكن الحصول على أكثر من كود لنفس المستخدم."
    );

  }catch(error){

    alert(
      "حدث خطأ أثناء جلب الكود"
    );

    btn.innerText =
      "اضغط للحصول على كود التفعيل";

  }

});

</script>

</body>

</html>