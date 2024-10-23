document.getElementById('query-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('query').value;
    const responseElement = document.getElementById('response');
    const loadingElement = document.getElementById('loading');

    // Clear previous response and show loading
    responseElement.textContent = '';
    loadingElement.classList.remove('hidden');

    try {
        console.log('Sending query:', query);  // Check if query is being sent
        // Replace '/retrieve' with your Flask backend's public URL (IP or domain)
        const response = await fetch('http://your-ec2-ip-or-domain/retrieve', {  // Use full public URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        console.log('Response received:', response);  // Check the full response object

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response data:', data);  // Check the received data

        // Update response element
        if (data.generated_text) {
            responseElement.textContent = data.generated_text;
        } else {
            responseElement.textContent = 'No response text generated.';
        }
    } catch (error) {
        console.error('Error:', error);
        responseElement.textContent = 'An error occurred. Please try again.';
    } finally {
        // Hide the loading animation
        loadingElement.classList.add('hidden');
    }
});
