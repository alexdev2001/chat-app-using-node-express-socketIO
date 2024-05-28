document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password}),
            });

            if (response.ok) {
                window.location.href = '/chat';
            } else {
                const errorData = await response.json();
                alert('Login failed: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occured. Please try again');
        }
    })
})