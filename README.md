<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>كود نيكسوس | منصة تجربة ومشاركة الأكواد</title>
    <!-- Google Fonts & Prism.js -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
    <style>
        /* ------------------------------------------------------------
           RESET & GLOBAL (دمج الـ CSS الثلاثة: style, mobile, themes)
        ------------------------------------------------------------ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            transition: background-color 0.25s ease, color 0.2s;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.5;
        }

        /* متغيرات الثيم الداكن (الافتراضي) */
        body.dark-theme {
            --bg-primary: #0a0c10;
            --bg-surface: #111418;
            --text-primary: #eef2ff;
            --text-secondary: #a0aaba;
            --card-bg: #1e1f2c;
            --border: #2a2f3a;
            --sidebar-bg: rgba(18, 22, 28, 0.92);
            --accent-neon: #00e5ff;
            --accent-glow: #0ff;
            --shadow-sm: 0 12px 28px rgba(0,0,0,0.4);
            --hover-bg: rgba(0, 229, 255, 0.08);
        }

        /* الثيم الفاتح الاحترافي */
        body.light-theme {
            --bg-primary: #f8fafc;
            --bg-surface: #ffffff;
            --text-primary: #0f172a;
            --text-secondary: #334155;
            --card-bg: #ffffff;
            --border: #e2e8f0;
            --sidebar-bg: rgba(255, 255, 255, 0.96);
            --accent-neon: #0f6bff;
            --accent-glow: #3b82f6;
            --shadow-sm: 0 8px 20px rgba(0,0,0,0.05);
            --hover-bg: rgba(15, 107, 255, 0.06);
        }

        /* تخطيط عام */
        .app-wrapper {
            display: flex;
            min-height: 100vh;
            position: relative;
        }

        /* سايدبار زجاجي مع دعم RTL */
        .sidebar {
            width: 320px;
            background: var(--sidebar-bg);
            backdrop-filter: blur(20px);
            border-left: 1px solid var(--border);
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            height: 100vh;
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            z-index: 100;
        }

        /* المحتوى الرئيسي */
        .main-container {
            flex: 1;
            overflow-x: auto;
            background: var(--bg-primary);
        }

        .content-viewer {
            padding: 2rem 2rem 3rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* رأس السايدبار */
        .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid var(--border);
        }

        .logo-area {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: 700;
        }

        .logo-area i {
            color: var(--accent-neon);
            font-size: 1.7rem;
        }

        .logo-accent {
            color: var(--accent-neon);
        }

        .close-sidebar-mobile {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.4rem;
            cursor: pointer;
            display: none;
        }

        /* البحث */
        .search-wrapper {
            position: relative;
            margin: 1.25rem;
        }

        .search-icon {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        #searchInput {
            width: 100%;
            padding: 0.85rem 2.5rem 0.85rem 1rem;
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 40px;
            color: var(--text-primary);
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        #searchInput:focus {
            outline: none;
            border-color: var(--accent-neon);
            box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.2);
        }

        /* أزرار الفلترة (تشبس) */
        .filter-section {
            padding: 0 1.25rem 1rem;
        }

        .filter-label {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 12px;
        }

        .filter-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .chip {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 40px;
            padding: 6px 16px;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            color: var(--text-primary);
        }

        .chip.active {
            background: var(--accent-neon);
            color: #000;
            border-color: var(--accent-neon);
            box-shadow: 0 0 10px var(--accent-glow);
        }

        /* قائمة المقتطفات */
        .snippets-list-container {
            flex: 1;
            overflow-y: auto;
            padding: 0 0.75rem 1rem;
        }

        .snippets-header {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0.5rem 0.75rem;
            font-weight: 600;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border);
            margin-bottom: 1rem;
        }

        .snippet-item {
            padding: 12px 16px;
            border-radius: 20px;
            margin-bottom: 8px;
            cursor: pointer;
            background: var(--card-bg);
            transition: all 0.2s;
            border: 1px solid transparent;
        }

        .snippet-item:hover {
            background: var(--hover-bg);
            transform: translateX(-4px);
            border-color: var(--accent-neon);
        }

        .snippet-item.active {
            background: var(--hover-bg);
            border-right: 3px solid var(--accent-neon);
            border-left: none;
        }

        .snippet-title {
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 0.95rem;
        }

        .snippet-meta {
            font-size: 0.7rem;
            color: var(--text-secondary);
            display: flex;
            gap: 10px;
        }

        /* منطقة عرض الكود */
        .detail-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .detail-header h1 {
            font-size: 1.9rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-neon) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .lang-badge {
            background: rgba(0, 229, 255, 0.12);
            padding: 4px 14px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--accent-neon);
        }

        .copy-code-btn {
            background: rgba(0, 229, 255, 0.08);
            border: 1px solid var(--accent-neon);
            border-radius: 60px;
            padding: 10px 24px;
            backdrop-filter: blur(4px);
            transition: 0.2s;
            cursor: pointer;
            color: var(--accent-neon);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .copy-code-btn:hover {
            background: var(--accent-neon);
            color: #000;
            box-shadow: 0 0 14px var(--accent-glow);
        }

        .code-wrapper pre {
            border-radius: 28px;
            background: var(--card-bg);
            padding: 1.6rem;
            overflow-x: auto;
            border: 1px solid var(--border);
        }

        /* التوست通知 */
        .toast {
            position: fixed;
            bottom: 28px;
            left: 50%;
            transform: translateX(-50%);
            background: #1e293b;
            backdrop-filter: blur(24px);
            padding: 12px 28px;
            border-radius: 60px;
            color: white;
            font-weight: 500;
            z-index: 2000;
            opacity: 0;
            transition: 0.25s;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 1px solid var(--accent-neon);
        }

        .toast.show {
            opacity: 1;
            bottom: 32px;
        }

        /* حالات فارغة */
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
        }

        .empty-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            color: var(--accent-neon);
            opacity: 0.6;
        }

        .reset-filter-btn {
            background: var(--accent-neon);
            color: #0f172a;
            border: none;
            padding: 10px 24px;
            border-radius: 40px;
            font-weight: 600;
            margin-top: 24px;
            cursor: pointer;
        }

        /* شريط الموبايل */
        .mobile-menu-bar {
            display: none;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            background: var(--sidebar-bg);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
        }

        .hamburger-btn,
        .theme-toggle-mobile {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-primary);
            cursor: pointer;
        }

        /* استعلامات الموبايل (RTL متكامل) */
        @media (max-width: 1024px) {
            .sidebar {
                position: fixed;
                top: 0;
                right: -340px;
                width: 300px;
                height: 100%;
                z-index: 1100;
                transition: right 0.3s ease;
            }
            .sidebar.mobile-open {
                right: 0;
            }
            .mobile-overlay {
                display: none;
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                z-index: 1050;
            }
            .mobile-overlay.active {
                display: block;
            }
            .mobile-menu-bar {
                display: flex;
            }
            .close-sidebar-mobile {
                display: block;
            }
            .content-viewer {
                padding: 1rem;
            }
            .detail-header h1 {
                font-size: 1.5rem;
            }
        }

        /* تحسينات RTL إضافية */
        .snippet-item.active {
            border-right: 3px solid var(--accent-neon);
            border-left: none;
        }
        .chip, .copy-code-btn {
            font-family: 'Inter', sans-serif;
        }
        .search-icon {
            right: 1rem;
            left: auto;
        }
        #searchInput {
            padding: 0.85rem 2.5rem 0.85rem 1rem;
        }
        .detail-meta {
            display: flex;
            gap: 12px;
            margin: 8px 0 12px;
            align-items: center;
        }
        .description {
            color: var(--text-secondary);
            max-width: 85%;
        }
    </style>
</head>
<body class="dark-theme">
    <div id="toast-message" class="toast"></div>
    <div class="mobile-overlay" id="mobileOverlay"></div>
    
    <div class="app-wrapper">
        <!-- القائمة الجانبية المحسنة عربياً -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo-area">
                    <i class="fas fa-code-branch"></i>
                    <span>كود<span class="logo-accent">نيكسوس</span></span>
                </div>
                <button class="close-sidebar-mobile" id="closeSidebarMobile" aria-label="إغلاق القائمة">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="search-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" id="searchInput" placeholder="ابحث في العناوين، الوصف أو الوسوم..." autocomplete="off">
            </div>
            
            <div class="filter-section">
                <span class="filter-label"><i class="fas fa-filter"></i> التصفية حسب اللغة</span>
                <div class="filter-chips" id="filterChipsContainer">
                    <button data-lang="all" class="chip active">الكل</button>
                </div>
            </div>
            
            <div class="snippets-list-container">
                <div class="snippets-header">
                    <span><i class="fas fa-cubes"></i> المقتطفات البرمجية</span>
                    <span class="snippets-count" id="snippetsCount">0</span>
                </div>
                <nav class="snippets-nav" id="snippetsList">
                    <div class="empty-state-list" style="padding: 1rem; text-align: center;">جاري التحميل...</div>
                </nav>
            </div>
        </aside>
        
        <main class="main-container">
            <div class="mobile-menu-bar">
                <button id="hamburgerBtn" class="hamburger-btn" aria-label="فتح القائمة">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="logo-small" style="font-weight: 600;"><i class="fas fa-terminal"></i> كود نيكسوس</div>
                <button id="themeToggleMobile" class="theme-toggle-mobile" aria-label="تبديل الثيم">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
            
            <div class="content-viewer" id="contentViewer">
                <!-- الحالة الترحيبية -->
                <div class="empty-state" id="emptyState">
                    <div class="empty-icon"><i class="fas fa-laptop-code"></i></div>
                    <h3>مرحباً بك في كود نيكسوس</h3>
                    <p>استعرض الأكواد النموذجية، جرّبها وانسخها بنقرة واحدة. منصة مطورين عربية احترافية.</p>
                    <div class="empty-hint">✨ دعم كامل للبحث والتصفية • وضع مظلم/فاتح • إضاءة تركيبية للكود</div>
                </div>
                
                <!-- تفاصيل المقتطف -->
                <div class="snippet-detail hidden" id="snippetDetail">
                    <div class="detail-header">
                        <div>
                            <h1 id="snippetTitle">عنوان المقتطف</h1>
                            <div class="detail-meta">
                                <span class="lang-badge" id="snippetLang">JavaScript</span>
                                <span class="date-badge" id="snippetDate"></span>
                            </div>
                            <p class="description" id="snippetDesc"></p>
                        </div>
                        <button class="copy-code-btn" id="copyCodeBtn" aria-label="نسخ الكود">
                            <i class="fas fa-copy"></i> نسخ الكود
                        </button>
                    </div>
                    <div class="code-wrapper">
                        <pre class="line-numbers"><code id="codeBlock" class="language-javascript"></code></pre>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
    <script>
        // --------------------- البيانات الأساسية (سنيبتات نموذجية مع دعم عربي) ---------------------
        const FALLBACK_SNIPPETS = [
            { id: "fetch-users", title: "Fetch API - طلب GET (JavaScript)", language: "JavaScript", tags: ["api", "fetch"], description: "مثال حي لطلب بيانات المستخدمين باستخدام Fetch API مع async/await - مكتوب بطريقة عصرية.", code: "async function getUsers() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/users');\n  const users = await response.json();\n  console.log(users);\n  return users;\n}\n\ngetUsers();", createdAt: "2026-05-10" },
            { id: "python-requests", title: "طلبات HTTP في Python", language: "Python", tags: ["api", "http"], description: "استخدام مكتبة requests لجلب البيانات من API عامة مع معالجة الأخطاء.", code: "import requests\n\ntry:\n    response = requests.get('https://api.github.com/events', timeout=5)\n    data = response.json()\n    for event in data[:3]:\n        print(event['type'])\nexcept Exception as e:\n    print(f'خطأ: {e}')", createdAt: "2026-05-09" },
            { id: "php-json", title: "PHP - إرجاع JSON عربي", language: "PHP", tags: ["api", "json"], description: "إنشاء نقطة نهاية API تستجيب بتنسيق JSON مع رسالة ترحيب بالعربية.", code: "<?php\nheader('Content-Type: application/json');\n$data = [\n    'status' => 'success',\n    'message' => 'مرحباً بك في واجهة برمجة التطبيقات',\n    'data' => ['version' => '1.0']\n];\necho json_encode($data, JSON_UNESCAPED_UNICODE);\n?>", createdAt: "2026-05-08" },
            { id: "curl-get", title: "Curl مع Header مخصص", language: "Curl", tags: ["terminal", "api"], description: "أمر Curl متقدم لإرسال طلب GET مع توثيق Bearer Token.", code: "curl -X GET \"https://api.example.com/v1/users\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer YOUR_TOKEN_HERE\" \\\n  --compressed", createdAt: "2026-05-07" },
            { id: "html-starter", title: "قالب HTML5 عصري", language: "HTML", tags: ["html", "starter"], description: "هيكل HTML5 حديث مع دعم RTL و Meta tags متوافقة مع السيو والهواتف.", code: "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>صفحة عربية احترافية</title>\n    <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n    <main>\n        <h1>مرحباً بالعالم</h1>\n        <p>تصميم ريادي.</p>\n    </main>\n</body>\n</html>", createdAt: "2026-05-06" },
            { id: "css-glass", title: "تأثير الزجاج (Glassmorphism)", language: "CSS", tags: ["css", "ui"], description: "كود CSS لإنشاء بطاقة زجاجية بأناقة عالية تناسب الواجهات الحديثة.", code: ".glass-card {\n  background: rgba(255, 255, 255, 0.12);\n  backdrop-filter: blur(14px);\n  border-radius: 32px;\n  border: 1px solid rgba(255,255,255,0.25);\n  box-shadow: 0 8px 20px rgba(0,0,0,0.2);\n  padding: 2rem;\n  transition: 0.3s;\n}\n.glass-card:hover {\n  background: rgba(255,255,255,0.18);\n}", createdAt: "2026-05-05" },
            { id: "json-schema", title: "مخطط JSON لمستخدم", language: "JSON", tags: ["schema", "data"], description: "مثال JSON Schema للتحقق من بيانات المستخدمين مع دعم العربية.", code: "{\n  \"$schema\": \"http://json-schema.org/draft-07/schema#\",\n  \"title\": \"مستخدم\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"integer\" },\n    \"username\": { \"type\": \"string\", \"minLength\": 3 },\n    \"isActive\": { \"type\": \"boolean\" }\n  },\n  \"required\": [\"id\", \"username\"]\n}", createdAt: "2026-05-04" },
            { id: "js-reduce", title: "Array Reduce متقدم", language: "JavaScript", tags: ["array", "functional"], description: "استخدام reduce لحساب المجموع وتجميع الكائنات بطريقة عملية.", code: "const numbers = [15, 27, 32, 48, 51];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);\nconsole.log(`المجموع: ${sum}`);\n\nconst items = [\n  { name: 'دفتر', price: 20 },\n  { name: 'قلم', price: 5 }\n];\nconst total = items.reduce((total, item) => total + item.price, 0);\nconsole.log(`الإجمالي: ${total}`);", createdAt: "2026-05-03" }
        ];
        
        // --------------------- حالة التطبيق (موديولار) ---------------------
        window.App = {
            snippets: [],
            filtered: [],
            activeLang: 'all',
            searchQuery: '',
            currentId: null,
        };

        async function loadSnippets() {
            try {
                const res = await fetch('data/snippets.json');
                if (!res.ok) throw new Error();
                const data = await res.json();
                window.App.snippets = data;
            } catch {
                window.App.snippets = [...FALLBACK_SNIPPETS];
            }
            window.App.filtered = [...window.App.snippets];
            renderAll();
            if (window.App.snippets.length && !window.App.currentId) showSnippetById(window.App.snippets[0].id);
        }

        function renderAll() {
            populateFilterChips();
            updateSidebarList();
            const countSpan = document.getElementById('snippetsCount');
            if (countSpan) countSpan.innerText = window.App.filtered.length;
            applySearchAndFilter();
        }

        function populateFilterChips() {
            const container = document.getElementById('filterChipsContainer');
            const languages = [...new Set(window.App.snippets.map(s => s.language))].sort();
            let html = `<button data-lang="all" class="chip active">الكل</button>`;
            languages.forEach(lang => {
                html += `<button data-lang="${lang}" class="chip">${lang}</button>`;
            });
            container.innerHTML = html;
            document.querySelectorAll('.chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    const langVal = btn.dataset.lang;
                    window.App.activeLang = langVal;
                    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    applySearchAndFilter();
                });
            });
        }

        function updateSidebarList() {
            const listContainer = document.getElementById('snippetsList');
            if (!listContainer) return;
            const filteredList = window.App.filtered;
            if (filteredList.length === 0) {
                listContainer.innerHTML = `<div class="empty-state-list" style="padding: 2rem; text-align: center;"><i class="fas fa-ban"></i> لا توجد مقتطفات</div>`;
                return;
            }
            let itemsHtml = '';
            filteredList.forEach(snip => {
                const activeClass = (window.App.currentId === snip.id) ? 'active' : '';
                itemsHtml += `
                    <div class="snippet-item ${activeClass}" data-id="${snip.id}">
                        <div class="snippet-title">${escapeHtml(snip.title)}</div>
                        <div class="snippet-meta"><span>${escapeHtml(snip.language)}</span></div>
                    </div>
                `;
            });
            listContainer.innerHTML = itemsHtml;
            document.querySelectorAll('.snippet-item').forEach(el => {
                el.addEventListener('click', () => {
                    const id = el.dataset.id;
                    if (id) showSnippetById(id);
                    if (window.innerWidth <= 1024) closeSidebarManually();
                });
            });
        }

        function escapeHtml(str) { return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

        function applySearchAndFilter() {
            let results = [...window.App.snippets];
            if (window.App.activeLang !== 'all') {
                results = results.filter(s => s.language === window.App.activeLang);
            }
            const query = window.App.searchQuery.trim().toLowerCase();
            if (query !== '') {
                results = results.filter(s =>
                    s.title.toLowerCase().includes(query) ||
                    s.description.toLowerCase().includes(query) ||
                    (s.tags && s.tags.some(t => t.toLowerCase().includes(query)))
                );
            }
            window.App.filtered = results;
            updateSidebarList();
            const countSpan = document.getElementById('snippetsCount');
            if (countSpan) countSpan.innerText = results.length;
            const detailDiv = document.getElementById('snippetDetail');
            const emptyDiv = document.getElementById('emptyState');
            if (results.length === 0) {
                detailDiv.classList.add('hidden');
                emptyDiv.classList.remove('hidden');
                emptyDiv.innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fas fa-search-slash"></i></div><h3>لا توجد نتائج</h3><p>لم يتم العثور على مقتطفات تطابق معايير البحث والفلترة الحالية.</p><button class="reset-filter-btn" id="resetFilterBtnGlobal">إعادة ضبط الفلتر</button></div>`;
                const resetBtn = document.getElementById('resetFilterBtnGlobal');
                if (resetBtn) resetBtn.addEventListener('click', resetFilters);
                window.App.currentId = null;
            } else {
                if (!window.App.currentId || !results.find(r => r.id === window.App.currentId)) {
                    showSnippetById(results[0].id);
                } else {
                    showSnippetById(window.App.currentId);
                }
            }
        }

        function resetFilters() {
            window.App.activeLang = 'all';
            window.App.searchQuery = '';
            document.getElementById('searchInput').value = '';
            const chips = document.querySelectorAll('.chip');
            chips.forEach(ch => { if(ch.dataset.lang === 'all') ch.classList.add('active'); else ch.classList.remove('active'); });
            applySearchAndFilter();
        }

        function showSnippetById(id) {
            const snippet = window.App.snippets.find(s => s.id === id);
            if (!snippet) return;
            window.App.currentId = id;
            document.getElementById('emptyState').classList.add('hidden');
            document.getElementById('snippetDetail').classList.remove('hidden');
            document.getElementById('snippetTitle').innerText = snippet.title;
            document.getElementById('snippetLang').innerHTML = `<i class="fas fa-code"></i> ${snippet.language}`;
            document.getElementById('snippetDesc').innerText = snippet.description;
            document.getElementById('snippetDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${snippet.createdAt || '2026-05-10'}`;
            const codeElem = document.getElementById('codeBlock');
            codeElem.innerText = snippet.code;
            const langClass = snippet.language.toLowerCase();
            codeElem.className = `language-${langClass}`;
            delete codeElem.dataset.highlighted;
            if (window.Prism) Prism.highlightElement(codeElem);
            updateSidebarList(); // لتحديث Active class
        }

        // Clipboard + Toast
        function initClipboard() {
            const copyBtn = document.getElementById('copyCodeBtn');
            copyBtn.addEventListener('click', async () => {
                const codeText = document.getElementById('codeBlock').innerText;
                try {
                    await navigator.clipboard.writeText(codeText);
                    showToast("✅ تم نسخ الكود إلى الحافظة!", "success");
                } catch { showToast("❌ حدث خطأ، حاول النسخ يدوياً", "error"); }
            });
        }
        function showToast(msg) {
            const toast = document.getElementById('toast-message');
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // الموبايل والثيم
        function initMobile() {
            const hamburger = document.getElementById('hamburgerBtn');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            const closeBtn = document.getElementById('closeSidebarMobile');
            const openSidebar = () => { sidebar.classList.add('mobile-open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
            window.closeSidebarManually = () => { sidebar.classList.remove('mobile-open'); overlay.classList.remove('active'); document.body.style.overflow = ''; };
            hamburger.addEventListener('click', openSidebar);
            closeBtn.addEventListener('click', window.closeSidebarManually);
            overlay.addEventListener('click', window.closeSidebarManually);
        }

        function initTheme() {
            const themeBtn = document.getElementById('themeToggleMobile');
            const isDark = localStorage.getItem('codex_theme') !== 'light';
            if (!isDark) document.body.classList.replace('dark-theme', 'light-theme');
            else document.body.classList.add('dark-theme');
            const updateIcon = () => {
                const isDarkMode = document.body.classList.contains('dark-theme');
                themeBtn.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            };
            updateIcon();
            themeBtn.addEventListener('click', () => {
                if (document.body.classList.contains('dark-theme')) {
                    document.body.classList.replace('dark-theme', 'light-theme');
                    localStorage.setItem('codex_theme', 'light');
                } else {
                    document.body.classList.replace('light-theme', 'dark-theme');
                    localStorage.setItem('codex_theme', 'dark');
                }
                updateIcon();
                if (window.Prism) Prism.highlightAll();
            });
        }

        function debouncedSearch() {
            const input = document.getElementById('searchInput');
            let timer;
            input.addEventListener('input', (e) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    window.App.searchQuery = e.target.value;
                    applySearchAndFilter();
                }, 280);
            });
        }

        window.addEventListener('DOMContentLoaded', () => {
            loadSnippets();
            initClipboard();
            initMobile();
            initTheme();
            debouncedSearch();
        });
    </script>
</body>
</html>
