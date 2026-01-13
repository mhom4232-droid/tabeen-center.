const scriptURL = 'https://script.google.com/macros/s/AKfycbxf1_9IvOs2qYR9XabunfNbMiSzQq7JSPTg_gd1f6jQhJPebJc139zFUVWzs9ApSyrOlg/exec';

// جلب بيانات الطالب
async function fetchStudentData(id) {
    try {
        const response = await fetch(`${scriptURL}?action=getStudent&id=${id}`);
        return await response.json();
    } catch (e) { return { found: false }; }
}

// تسجيل طالب جديد
async function registerNewStudent(data) {
    data.action = 'registerNew';
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        return true;
    } catch (e) { return false; }
}

// تحديث إنجاز (للمحفظ)
async function updateStudentScore(data) {
    data.action = 'updateScore';
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        return true;
    } catch (e) { return false; }
}
