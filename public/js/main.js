// Add study form
function openForm() {
    document.getElementById('patient-form').style.display = 'block';
};

function closeForm() {
    document.getElementById('patient-form').style.display = 'none';
};

function previousPage() {
    window.history.back()
};

const deleteRow = document.querySelectorAll('.fa-trash-can');
const editRow = document.querySelectorAll('.fa-pen-to-square');
const studyTechIncomplete = document.querySelectorAll('td.techIncomplete');
const studyTechComplete = document.querySelectorAll('td.techComplete');
const studyDoctorIncomplete = document.querySelectorAll('td.doctorIncomplete');
const studyDoctorComplete = document.querySelectorAll('td.doctorComplete');
const osaPositive = document.querySelectorAll('td.osaPositive');
const osaNegative = document.querySelectorAll('td.osaNegative');
const maskFittingFollowupDateTBD = document.querySelectorAll('td.mask-fitting-date-tbd');
const maskFittingFollowUpDate = document.querySelectorAll('td.mask-fitting-date');
const cpapOrderDateTBD = document.querySelectorAll('td.cpap-order-date-tbd');
const cpapOrderDate = document.querySelectorAll('td.cpap-order-date');
const cpapReceivedDateTBD = document.querySelectorAll('td.cpap-received-date-tbd');
const cpapReceivedDate = document.querySelectorAll('td.cpap-received-date');
const techFollowUpDateTBD = document.querySelectorAll('td.tech-followup-date-tbd');
const techFollowUpDate = document.querySelectorAll('td.tech-followup-date');
const doctorFollowUpDateTBD = document.querySelectorAll('td.doctor-followup-date-tbd');
const doctorFollowUpDate = document.querySelectorAll('td.doctor-followup-date');

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
    const studyObjId = this.parentNode.dataset.id; // Unique ID of study entry
    const studyLab = this.parentNode.dataset.lab; // Sleep lab of study entry
    try {
            const response = await fetch('markTechComplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                    'studyLabFromJSFile': studyLab,
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
                    'studyLabFromJSFile': studyLab,
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
                    'studyLabFromJSFile': studyLab,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Mark study incomplete/negative
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
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markTechIncomplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                    'studyLabFromJSFile': studyLab,
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
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markDoctorIncomplete', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                    'studyLabFromJSFile': studyLab,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId)
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function markOSANegative() {
    const studyObjId = this.parentNode.dataset.id;
    const studyLab = this.parentNode.dataset.lab;
    try {
            const response = await fetch('markOSANegative', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                    'studyLabFromJSFile': studyLab,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId)
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Update follow-up to current date

Array.from(maskFittingFollowupDateTBD).forEach(el => {
    el.addEventListener('click', updateMaskFittingDate)
});

Array.from(cpapOrderDateTBD).forEach(el => {
    el.addEventListener('click', updateCPAPOrderDate)
});

Array.from(cpapReceivedDateTBD).forEach(el => {
    el.addEventListener('click', updateCPAPReceivedDate)
});

Array.from(techFollowUpDateTBD).forEach(el => {
    el.addEventListener('click', updateTechFollowUpDate)
});

Array.from(doctorFollowUpDateTBD).forEach(el => {
    el.addEventListener('click', updateDoctorFollowUpDate)
});

async function updateMaskFittingDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('updateMaskFittingDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function updateCPAPOrderDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('updateCPAPOrderDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function updateCPAPReceivedDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('updateCPAPReceivedDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function updateTechFollowUpDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('updateTechFollowUpDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function updateDoctorFollowUpDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('updateDoctorFollowUpDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Clear follow-up date

Array.from(maskFittingFollowUpDate).forEach(el => {
    el.addEventListener('click', clearMaskFittingDate)
});

Array.from(cpapOrderDate).forEach(el => {
    el.addEventListener('click', clearCPAPOrderDate)
});

Array.from(cpapReceivedDate).forEach(el => {
    el.addEventListener('click', clearCPAPReceivedDate)
});

Array.from(techFollowUpDate).forEach(el => {
    el.addEventListener('click', clearTechFollowUpDate)
});

Array.from(doctorFollowUpDate).forEach(el => {
    el.addEventListener('click', clearDoctorFollowUpDate)
});

async function clearMaskFittingDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('clearMaskFittingDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function clearCPAPOrderDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('clearCPAPOrderDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function clearCPAPReceivedDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('clearCPAPReceivedDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function clearTechFollowUpDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('clearTechFollowUpDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};

async function clearDoctorFollowUpDate() {
    const studyObjId = this.parentNode.dataset.id;
    try {
            const response = await fetch('clearDoctorFollowUpDate', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log(studyObjId);
            location.reload();
    } catch (err) {
        console.log(err);
    }
};