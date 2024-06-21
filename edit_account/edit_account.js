document.addEventListener('DOMContentLoaded', async () => {
    const accountForm = document.getElementById('accountForm');
    const accountId = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');

    if (!accountId) {
        alert('ID da conta não fornecido');
        window.location.href = '/account/account.html';
        return;
    }

    async function fetchConta() {
        
        const response = await fetch(`/api/contas/${accountId}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': token,
            },
        });
        if (response.ok) {
            const conta = await response.json();
            document.getElementById('accountName').value = conta.nome;
            document.getElementById('accountValue').value = conta.valor;
            document.getElementById('accountDueDate').value = conta.datavenc;
            document.getElementById('accountPaid').value = conta.pago;
        } else {
            alert('Falha ao carregar os dados da conta');
            window.location.href = '/account/account.html';
        }
    }

    accountForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('accountName').value;
        const valor = document.getElementById('accountValue').value;
        const datavenc = document.getElementById('accountDueDate').value;
        const pago = document.getElementById('accountPaid').value;

        const response = await fetch(`/api/contas/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': token,
            },
            body: JSON.stringify({ nome, valor, datavenc, pago }),
        });

        if (response.ok) {
            alert('Conta atualizada com sucesso');
            window.location.href = '/account/account.html'; 
        } else {
            alert('Falha ao atualizar a conta');
        }
    });

    fetchConta();
});
