document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.getElementById('accountForm');

    accountForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('accountName').value;
        const valor = document.getElementById('accountValue').value;
        const datavenc = document.getElementById('accountDueDate').value;
        const pago = document.getElementById('accountPaid').value;

        const token = localStorage.getItem('token');
        const response = await fetch('/api/contas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': token,
            },
            body: JSON.stringify({ nome, valor, datavenc, pago }),
        });

        if (response.ok) {
            alert('Conta criada com sucesso');
            accountForm.reset();
            window.location.href = '/account/account.html'; 
        } else {
            alert('Falha ao criar a conta');
        }
    });
});
