// التكوين العام للتطبيق
const APP_CONFIG = {
    version: '1.0.0',
    name: 'تطبيق القرآن الكريم التعليمي',
    developer: 'عبدالرحمن عوض صالح الرشيدي للبرمجة وتطوير',
    copyright: {
        year: new Date().getFullYear(),
        owner: "عبدالرحمن عوض صالح الرشيدي للبرمجة وتطوير",
        phone: "+966 599900121",
        email: "Tiger3Saudi@gmail.com",
        location: "المملكة العربية السعودية، الرياض",
        rights: "جميع الحقوق محفوظة"
    }
};

// حالة التطبيق
const appState = {
    isLoading: true,
    currentPage: 'home-page',
    darkMode: false,
    language: 'ar',
    prayerTimes: {},
    quranData: {
        currentSurah: 1,
        currentAyah: 1,
        bookmarks: []
    }
};

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // شاشة البداية التحميل
    simulateSplashScreen();
    
    // التحقق من وضع الظلام
    checkDarkMode();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // تهيئة التطبيق
    initializeApp();
});

// محاكاة شاشة التحميل
function simulateSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const progressBar = document.getElementById('loading-progress');
    const appContainer = document.getElementById('app-container');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    appContainer.classList.remove('hidden');
                    appState.isLoading = false;
                }, 500);
            }, 500);
        }
    }, 100);
}

// التحقق من وضع الظلام
function checkDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        appState.darkMode = true;
    }
    
    // الاستماع للتغييرات في وضع الظلام
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            appState.darkMode = true;
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            appState.darkMode = false;
        }
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر تبديل النمط الداكن/الفاتح
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            document.body.classList.toggle('light');
            appState.darkMode = document.body.classList.contains('dark');
        });
    }
    
    // تغيير اللغة
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            appState.language = this.value;
            document.documentElement.lang = appState.language;
            document.documentElement.dir = appState.language === 'ar' || appState.language === 'ur' ? 'rtl' : 'ltr';
        });
    }
    
    // أزرار الأقسام الرئيسية
    const sectionButtons = document.querySelectorAll('.section-button');
    sectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // تنفيذ الانتقال إلى الصفحة المناسبة
            console.log('الانتقال إلى قسم جديد');
        });
    });
}

// تهيئة التطبيق
function initializeApp() {
    // محاكاة تحديث مواقيت الصلاة
    updatePrayerTimes();
    
    // تهيئة بوصلة القبلة
    initQiblaCompass();
}

// تحديث مواقيت الصلاة
function updatePrayerTimes() {
    // هذه بيانات توضيحية - في التطبيق الحقيقي ستكون من API
    appState.prayerTimes = {
        fajr: '04:30',
        dhuhr: '12:10',
        asr: '15:45',
        maghrib: '19:20',
        isha: '20:50'
    };
    
    // تحديث شريط التقدم والعد التنازلي
    updatePrayerCountdown();
}

// تحديث العد التنازلي للصلاة التالية
function updatePrayerCountdown() {
    const countdownEl = document.getElementById('next-prayer-countdown');
    if (!countdownEl) return;
    
    // محاكاة العد التنازلي - سيتم استبداله بحساب حقيقي في التطبيق النهائي
    let minutes = 45;
    let seconds = 30;
    
    const countdown = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            clearInterval(countdown);
            updatePrayerTimes(); // تحديث الصلوات عند انتهاء العد التنازلي
            return;
        }
        
        countdownEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// تهيئة بوصلة القبلة
function initQiblaCompass() {
    // محاكاة حركة البوصلة - سيتم استبداله ببيانات حقيقية من المستشعرات
    const needle = document.querySelector('.needle');
    if (!needle) return;
    
    // تدوير الإبرة بشكل عشوائي للعرض التوضيحي
    const rotation = Math.floor(Math.random() * 360);
    needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
}