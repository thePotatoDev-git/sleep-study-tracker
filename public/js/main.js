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
