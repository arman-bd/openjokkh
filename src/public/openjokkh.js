(function() {
    const script = document.currentScript;
    const apiKey = script.getAttribute('data-api-key');

    // Create a container for the iframe
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '300px'; // Fixed width
    container.style.height = '100px'; // Fixed height
    container.style.margin = '20px auto'; // Center the iframe
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    //container.style.border = '1px solid #000000'; // Border on iframe
    //container.style.borderRadius = '15px'; // Rounded corners for iframe
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.src = '/openjokkh.html';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%'; // Set height to 100% of container
    // iframe.style.borderRadius = '15px';

    // Append iframe to container
    container.appendChild(iframe);

    // Append container to body
    document.body.appendChild(container);

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'captcha-solved') {
            const challengeToken = event.data.challengeToken;
            const captchaResponse = 'checkbox_clicked';
            const solution = event.data.solution;
            const mouseMovementData = event.data.mouseMovementData;
            fetch('/api/v1/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ apiKey, challengeToken, captchaResponse, solution, mouseMovementData })
            })
            .then(response => response.json())
            .then(data => {
                iframe.contentWindow.postMessage({ type: 'captcha-validation', success: data.success }, '*');
            });
        }
    });
})();
