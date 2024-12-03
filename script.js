async function consultarCEP() {
    const cep = document.getElementById("cep").value.trim();
    const url = `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`;

    try {
        // Validação do formato de CEP
        if (!/^\d{8}$/.test(cep.replace('-', '')) || !/^\d{5}-?\d{3}$/.test(cep)) {
            alert("CEP inválido! Por favor, digite um CEP válido.");
            return;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("CEP não encontrado ou inválido!");
        }

        const data = await response.json();
        if (data.erro) {
            alert("CEP inexistente!");
            return;
        }

        document.getElementById("resultado").innerHTML = `
            <p><strong>Logradouro:</strong> ${data.logradouro}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
        `;
    } catch (error) {
        alert(error.message);
    }
}