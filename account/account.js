document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const contasTableBody = document.querySelector('#contasTable tbody');

    async function fetchContas(query = '') {
        const token = localStorage.getItem('token');
        let url = '/api/contas';
        if (query) {
            url += `?q=${query}`;
        }
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': token,
            },
        });
        const contas = await response.json();
        return contas;
    }

    function renderContas(contas) {
        contasTableBody.innerHTML = '';
        contas.forEach(conta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${conta.nome}</td>
                <td>${conta.valor}</td>
                <td>${conta.datavenc}</td>
                <td>${conta.pago}</td>
                <td>
                    <button class="edit-button" data-id="${conta.id}">Editar</button>
                    <button class="delete-button" data-id="${conta.id}">Excluir</button>
                </td>
            `;
            contasTableBody.appendChild(tr);
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', handleEditConta);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', handleDeleteConta);
        });
    }

    async function handleEditConta(event) {
        const id = event.target.getAttribute('data-id');
        window.location.href = `/edit_account/edit_account.html?id=${id}`;
    }

    async function handleDeleteConta(event) {
        const id = event.target.getAttribute('data-id');
        const confirmDelete = confirm('Tem certeza de que deseja excluir esta conta?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/contas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-tokens': token,
                },
            });

            if (response.ok) {
                alert('Conta excluída com sucesso');
                fetchAndRenderContas();
            } else {
                alert('Falha ao excluir conta');
            }
        }
    }

    async function fetchAndRenderContas(query = '') {
        const contas = await fetchContas(query);
        renderContas(contas);
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        fetchAndRenderContas(query);
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token'); 
        alert('Você saiu da plataforma'); 
        window.location.href = '/login.html'; 
    });

    fetchAndRenderContas();
});
