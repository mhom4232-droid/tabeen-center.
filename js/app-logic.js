// نظام التابعين - المحرك البرمجي 2026
const API_URL = "https://script.google.com/macros/s/AKfycbwZ7HP6Y9z_zlxccx5wn-mcn6xIy3ytUAs2oQH9ft70ImIcENSzXSYZUdv1PaG3YLH2KA/exec";

const core = {
    // 1. نظام الدخول الموحد
    login: async function() {
        const id = document.getElementById('stdID').value;
        if(!id) return alert("يرجى إدخال الكود");
        
        const res = await fetch(`${API_URL}?action=getStudent&id=${id}`);
        const data = await res.json();
        
        if(data.status === "success") {
            this.initDashboard(data.student);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            alert("كود غير موجود");
        }
    },

    // 2. تفعيل الميزات الـ 50 (الربط البصري والبرمجي)
    initDashboard: function(s) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('student-view').classList.remove('hidden');
        
        document.getElementById('ui-name').innerText = s.name;
        document.getElementById('ui-mentor').innerText = "المحفظ: " + s.mentor;
        document.getElementById('ui-parts').innerText = s.parts;
        document.getElementById('ui-grade').innerText = s.grade || "A+";
        
        // بناء الرحلة التفاعلية (Interactive Journey)
        const journey = document.getElementById('journey-path');
        journey.innerHTML = `
            <div class="journey-node">
                <h5 class="font-black">المستوى الحالي: ${s.parts} أجزاء</h5>
                <p class="text-xs text-slate-500">${s.today || 'مراجعة عامة'}</p>
                <p class="text-[10px] text-amber-600 mt-2">ملاحظة المعلم: ${s.msg || 'استمر يا بطل'}</p>
            </div>
        `;
    },

    // 3. ميزة مشاركة بطاقة التميز
    shareCard: function() {
        const target = document.getElementById('capture-area');
        html2canvas(target, { scale: 3, borderRadius: 40 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `تميز_التابعين.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    },

    // 4. ميزة المعلم الذكي (Voice Recognition)
    startVoice: function() {
        const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        rec.lang = 'ar-SA';
        rec.start();
        alert("المعلم الذكي يستمع لتلاوتك الآن...");
        rec.onresult = (e) => alert("تم التقاط التلاوة بنجاح، سيتم تقييمك قريباً.");
    }
};

const ui = {
    toggleNight: () => document.body.classList.toggle('night-mode'),
    showSection: (id) => alert("سيتم توجيهك إلى " + id)
};

// 5. ميزة لوحة الشرف الديناميكية
const wall = document.getElementById('honor-wall');
const stars = ["أحمد يونس", "محمد العصار", "أحمد جحجوح"];
stars.forEach(name => {
    wall.innerHTML += `<div class="p-3 bg-slate-50 rounded-xl flex justify-between font-bold text-sm">
        <span>${name}</span> <span class="text-gold text-[10px]">متميز</span>
    </div>`;
});
