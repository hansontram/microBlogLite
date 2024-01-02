document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            username: document.getElementById('username').value.trim(),
            fullname: document.getElementById('fullname').value.trim(),
            password: document.getElementById('password').value.trim(),
        };

        fetch('API_URL/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful registration response
            console.log('User registered successfully:', data);
        })
        .catch(error => {
            console.error('Registration error:', error.message);
        });
    });
});
