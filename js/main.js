const scriptURL = 'https://script.google.com/macros/s/AKfycbxf1_9IvOs2qYR9XabunfNbMiSzQq7JSPTg_gd1f6jQhJPebJc139zFUVWzs9ApSyrOlg/exec';

// 1. وظيفة التنقل بين الصفحات
function goToPage(url) {
    window.location.href = url;
}

// 2. جلب بيانات الطالب (student.html)
async function fetchStudentData(id) {
    try {
        const response = await fetch(`${scriptURL}?action=getStudent&id=${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { found: false };
    }
}

// 3. إرسال تسجيل جديد (mosques.html)
async function registerNewStudent(formData) {
    formData.action = 'registerNew';
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(formData)
        });
        return true;
    } catch (error) {
        return false;
    }
}

// 4. تحديث بيانات من المحفظ (admin.html)
async function updateStudentScore(updateData) {
    updateData.action = 'updateScore';
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(updateData)
        });
        return true;
    } catch (error) {
        return false;
    }
}