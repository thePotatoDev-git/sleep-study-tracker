// Add study form
function openForm() {
    document.getElementById('patient-form').style.display = 'block';
}

function closeForm() {
    document.getElementById('patient-form').style.display = 'none';
}

const deleteRow = document.querySelectorAll('.fa-trash-can');
const editRow = document.querySelectorAll('.fa-pen-to-square');
const studyTechIncomplete = document.querySelectorAll('td.techIncomplete');
const studyTechComplete = document.querySelectorAll('td.techComplete');
const studyDoctorIncomplete = document.querySelectorAll('td.doctorIncomplete');
const studyDoctorComplete = document.querySelectorAll('td.doctorComplete');
const osaPositive = document.querySelectorAll('td.osaPositive');
const osaNegative = document.querySelectorAll('td.osaNegative');

// Delete study
// Array.from(deleteRow).forEach(element => {
//     element.addEventListener('click', deleteStudy)
// });

// async function deleteStudy() {
//     const studyObjId = this.parentNode.dataset.id;
//     const studyLab = this.parentNode.dataset.lab;
//     try {
//             const response = await fetch('deleteStudy', {
//                 method: 'delete',
//                 headers: {'Content-type': 'application/json'},
//                 body: JSON.stringify({
//                     'studyObjIdFromJSFile': studyObjId,
//                 }),
//             });
//             const data = await response.json();
//             console.log(data);
//             location.reload();
//     } catch (err) {
//         console.log(err);
//     }
// };

// Mark study complete/positive
Array.from(studyTechIncomplete).forEach(el => {
    el.addEventListener('click', markTechComplete)
});

Array.from(studyDoctorIncomplete).forEach(el => {
    el.addEventListener('click', markDoctorComplete)
});

Array.from(osaNegative).forEach(el => {
    el.addEventListener('click', markOSAPositive)
});

async function markTechComplete() {
    const studyObjId = this.parentNode.dataset.id;
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markTechComplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function markDoctorComplete() {
    const studyObjId = this.parentNode.dataset.id;
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markDoctorComplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function markOSAPositive() {
    const studyObjId = this.parentNode.dataset.id;
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markOSAPositive', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Mark study incomplete
Array.from(studyTechComplete).forEach(el => {
    el.addEventListener('click', markTechIncomplete)
});

Array.from(studyDoctorComplete).forEach(el => {
    el.addEventListener('click', markDoctorIncomplete)
});

Array.from(osaPositive).forEach(el => {
    el.addEventListener('click', markOSANegative)
});

async function markTechIncomplete() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('markTechIncomplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function markDoctorIncomplete() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('markDoctorIncomplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function markOSANegative() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('markOSANegative', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};