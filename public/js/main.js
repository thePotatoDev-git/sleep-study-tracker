function openLab (event, labName) {
    let tabContent = document.getElementsByClassName('tab-content');
    let tabLinks = document.getElementsByClassName('tab-links');

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }

    document.getElementById(labName).style.display = 'block';
    event.currentTarget.className += ' active';
}

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
    const lName = this.parentNode.childNodes[3].innerText;
    const fName = this.parentNode.childNodes[5].innerText;
    const sDate = this.parentNode.childNodes[7].innerText;
    try {
        const response = await fetch('deleteStudy', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'lastNameS': lName,
                'firstNameS': fName,
                'studyDateS': sDate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}