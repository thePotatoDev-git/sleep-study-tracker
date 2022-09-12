// function openLab (event, labName) {
//     let tabContent = document.getElementsByClassName('tab-content');
//     let tabLinks = document.getElementsByClassName('tab-links');

//     for (let i = 0; i < tabContent.length; i++) {
//         tabContent[i].style.display = 'none';
//     }

//     for (let i = 0; i < tabLinks.length; i++) {
//         tabLinks[i].className = tabLinks[i].className.replace(' active', '');
//     }

//     document.getElementById(labName).style.display = 'block';
//     event.currentTarget.className += ' active';
// }

function openForm() {
    document.getElementById('patient-form').style.display = 'block';
}

function closeForm() {
    document.getElementById('patient-form').style.display = 'none';
}

const deleteRow = document.querySelectorAll('.fa-trash-can');
const editRow = document.querySelectorAll('.fa-pen-to-square');

Array.from(deleteRow).forEach(element => {
    element.addEventListener('click', deleteStudy)
});

async function deleteStudy() {
    const studyObjId = this.parentNode.dataset.id;
    const studyLab = this.parentNode.dataset.lab;
    try {
        if (studyLab === 'hackensack') {
            const response = await fetch('hackensack/deleteStudy', {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'studyObjIdFromJSFile': studyObjId,
                    'studyLabFromJSFile': studyLab,
                }),
            });
            const data = await response.json();
            console.log(data);
            location.reload();
    } else if (studyLab === 'wayne') {
        const response = await fetch('wayne/deleteStudy', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'studyObjIdFromJSFile': studyObjId,
                'studyLabFromJSFile': studyLab,
            }),
        });
            const data = await response.json();
            console.log(data);
            location.reload();
    }
        // const data = await response.json();
        // console.log(data);
        // location.reload();
    } catch (err) {
        console.log(err);
    }
    console.log(this.parentNode.dataset.lab)
};