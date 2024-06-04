let challengeToken = '';
let challenge = '';
let captchaSolved = false;
let mouseMovements = []; // Array to store mouse movement data

function fetchChallenge() {
    fetch('/api/v1/challenge')
        .then(response => response.json())
        .then(data => {
            challengeToken = data.challengeToken;
            const decoded = JSON.parse(atob(challengeToken.split('.')[1]));
            challenge = decoded.challenge;
        });
}

function displayMessage(success) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = ''; // Clear previous message

    const text = document.createElement('span');

    if (success) {
        text.textContent = 'Successful';
        text.style.color = 'green';
    } else {
        text.textContent = 'Failed';
        text.style.color = 'red';
    }

    messageDiv.appendChild(text);
}

function solveJSChallenge(challenge) {
    const solution = eval(challenge);
    console.log('JS Challenge solved:', solution);
    return solution;
}

function trackMouse(event) {
    const timestamp = Date.now();
    if (mouseMovements.length > 0) {
        const lastMovement = mouseMovements[mouseMovements.length - 1];
        const factor = event.isTrusted ? 0 : 100;
        const velocity = Math.sqrt(
            Math.pow(event.clientX - lastMovement.x, 2) +
            Math.pow(event.clientY - lastMovement.y, 2)
        ) / (timestamp - lastMovement.timestamp);
        mouseMovements.push({
            x: event.clientX,
            y: event.clientY,
            timestamp,
            velocity
        }) + factor;
    } else {
        mouseMovements.push({
            x: event.clientX,
            y: event.clientY,
            timestamp,
            velocity: 0
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchChallenge();

    const captchaContainer = document.getElementById('captcha-container');
    captchaContainer.addEventListener('mousemove', trackMouse);

    const customCheckbox = document.getElementById('custom-checkbox');
    customCheckbox.addEventListener('click', function () {
        if (captchaSolved) return;

        customCheckbox.classList.add('checked');
        const checkboxIcon = document.getElementById('checkbox-icon');
        checkboxIcon.src = '/res/tick.png';
        const captchaResponse = 'checkbox_clicked';
        const solution = solveJSChallenge(challenge);
        const mouseMovementData = JSON.stringify(mouseMovements);

        // Posting the data back to the parent or server
        parent.postMessage({ type: 'captcha-solved', challengeToken, solution: solution.toString(), mouseMovementData }, '*');
    });

    const reloadIcon = document.getElementById('reload');
    reloadIcon.addEventListener('click', function () {
        captchaSolved = false;
        mouseMovements = [];
        document.getElementById('message').innerHTML = '';
        document.getElementById('checkbox-icon').src = '';
        document.getElementById('custom-checkbox').classList.remove('checked');
        fetchChallenge();
    });

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'captcha-validation') {
            displayMessage(event.data.success);
            captchaSolved = true;
            const checkboxIcon = document.getElementById('checkbox-icon');
            checkboxIcon.src = event.data.success ? '/res/tick.png' : '/res/cross.png';
        }
    });
});
