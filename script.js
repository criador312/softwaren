// Função para adicionar um serviço à tabela
function adicionarServico() {
    var nomeServico = document.getElementById('nomeServico').value;
    var precoServico = document.getElementById('precoServico').value;

    // Verificar se todos os campos estão preenchidos
    if (nomeServico === "" || precoServico === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Adicionar o serviço ao localStorage
    var servicos = JSON.parse(localStorage.getItem('servicos')) || []; // Recuperar os serviços existentes
    var novoServico = {
        nome: nomeServico,
        preco: precoServico
    };
    servicos.push(novoServico); // Adicionar o novo serviço
    localStorage.setItem('servicos', JSON.stringify(servicos)); // Salvar no localStorage

    // Criar nova linha na tabela
    var tabela = document.getElementById("tabelaServicos").getElementsByTagName('tbody')[0];
    var novaLinha = tabela.insertRow();

    var celulaNome = novaLinha.insertCell(0);
    var celulaPreco = novaLinha.insertCell(1);
    var celulaAcoes = novaLinha.insertCell(2);

    // Adicionar dados do serviço à nova linha
    celulaNome.innerHTML = nomeServico;
    celulaPreco.innerHTML = "R$ " + parseFloat(precoServico).toFixed(2);
    celulaAcoes.innerHTML = `<button onclick="removerServico(this)">Remover</button>`;

    // Limpar os campos após adicionar
    document.getElementById('nomeServico').value = '';
    document.getElementById('precoServico').value = '';
}

// Função para remover um serviço da tabela
function removerServico(btn) {
    var linha = btn.parentNode.parentNode;
    var nomeServico = linha.cells[0].innerHTML;
    var precoServico = linha.cells[1].innerHTML.replace("R$ ", "").replace(",", ".");

    // Remover o serviço do localStorage
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos = servicos.filter(function(servico) {
        return servico.nome !== nomeServico || servico.preco !== precoServico;
    });
    localStorage.setItem('servicos', JSON.stringify(servicos));

    linha.parentNode.removeChild(linha);
}

// Função para carregar os serviços do localStorage ao carregar a página
function carregarServicos() {
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    // Preencher a tabela com os serviços armazenados
    var tabela = document.getElementById("tabelaServicos").getElementsByTagName('tbody')[0];
    servicos.forEach(function(servico) {
        var novaLinha = tabela.insertRow();

        var celulaNome = novaLinha.insertCell(0);
        var celulaPreco = novaLinha.insertCell(1);
        var celulaAcoes = novaLinha.insertCell(2);

        celulaNome.innerHTML = servico.nome;
        celulaPreco.innerHTML = "R$ " + parseFloat(servico.preco).toFixed(2);
        celulaAcoes.innerHTML = `<button onclick="removerServico(this)">Remover</button>`;
    });
}

// Chamar a função de carregamento dos serviços ao iniciar a página
window.onload = carregarServicos;
