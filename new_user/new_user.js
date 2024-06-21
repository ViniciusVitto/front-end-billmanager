document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const senha = document.getElementById('registerPassword').value;

        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (response.ok) {
            alert('User registered successfully');
            registerForm.reset();
            window.history.back(); 
        } else {
            alert('User registration failed');
        }
    });
});
