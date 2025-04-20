const funcionarioGet = {
    nome: document.querySelector("#nome-Funcionario"),
    cargo: document.querySelector("#cargo-Funcionario"),
    salario: document.querySelector("#salario-Funcionario"),
    infoAntiga: {
        numero: document.querySelector("#info-antigo-numero"),
        nome: document.querySelector("#info-antigo-nome"),
        cargo: document.querySelector("#info-antigo-cargo"),
        salario: document.querySelector("#info-antigo-salario")
    },
    infoNova: {
        numero: document.querySelector("#info-novo-numero"),
        nome: document.querySelector("#info-novo-nome"),
        cargo: document.querySelector("#info-novo-cargo"),
        salario: document.querySelector("#info-novo-salario")
    }
}

const controleOpcoes = {
    adicionarFuncionario: document.querySelector("#button-controle-adicionar"),
    atualizarFuncionario: document.querySelector("#button-controle-atualizar"),removerFuncionario: document.querySelector("#button-controle-remover")
}

const messageSituacao = document.querySelector("#aviso-situacao-controle");
const atualizarTituloControle = document.querySelector("#section h2");
const atualizacaoDisplay = document.querySelector("#info-atualizacao")

const buttons = {
    enviarCadastro: document.querySelector("#enviar-cadastro"),
    limparConteudo: document.querySelector("#limpar-conteudo")
}

buttons.limparConteudo.addEventListener("click", () => {
    limparConteudoAutomatico();
})

const cadastros = {
    funcionarios: []
}

const funcionariosParaJson = JSON.stringify(cadastros, null, 2);

let possuiCadastro = false;

const faixaSalarial = {
                
    gerente: {
        salarioMinimo: 2000,
        salarioMaximo: 5000
    },

    administrador: {
        salarioMinimo: 1600,
        salarioMaximo: 2500
    },

    vendedor: {
        salarioMinimo: 1100,
        salarioMaximo: 1500
    },

    estagiario: {
        salarioMinimo: 700,
        salarioMaximo: 900
    }

}

const functionSwitchSalario = (cargo, salario) => {
    switch(cargo) {

        case 'Gerente':
            
            if (salario < faixaSalarial.gerente.salarioMinimo || salario > faixaSalarial.gerente.salarioMaximo) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = `Salário de Gerente entre R$ ${faixaSalarial.gerente.salarioMinimo} a R$ ${faixaSalarial.gerente.salarioMaximo}`;
                return false;
            }
            break;
        
        case 'Administrador': 

            if (salario < faixaSalarial.administrador.salarioMinimo || salario > faixaSalarial.administrador.salarioMaximo) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = `Salário de Administrador entre R$ ${faixaSalarial.administrador.salarioMinimo} a R$ ${faixaSalarial.administrador.salarioMaximo}`;
                return false;
            }
            break;
        
        case 'Vendedor':

            if (salario < faixaSalarial.vendedor.salarioMinimo || salario > faixaSalarial.vendedor.salarioMaximo) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = `Salário de Vendedor entre R$ ${faixaSalarial.vendedor.salarioMinimo} a R$ ${faixaSalarial.vendedor.salarioMaximo}`;
                return false;
            }
            break;
        
        case 'Estagiário':

            if (salario < faixaSalarial.estagiario.salarioMinimo || salario > faixaSalarial.estagiario.salarioMaximo) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = `Salário de Estagiário entre R$ ${faixaSalarial.estagiario.salarioMinimo} a R$ ${faixaSalarial.estagiario.salarioMaximo}`;
                return false;
            }
            break;
    }

    return true;
}

class Funcionario {
    constructor (nome, cargo, salario) {
        this.nome = nome;
        this.cargo = cargo;
        this.salario = salario;
        this.cargos = ["Gerente", "Administrador", "Vendedor", "Estagiário"]
    }

    adicionarFuncionario() {

        return new Promise((resolve, reject) => {

            let encontrouNumero = false;

            const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = 0; i < numeros.length; i++) {
                for (let letra of String(this.nome)) {
                    if (letra === String(numeros[i])) {
                        encontrouNumero = true;
                        break;
                    }
                }
            }

            this.salario = Number(this.salario);

            if (!this.nome || encontrouNumero) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = "Digite o nome do funcionário corretamente!";
                return reject(new Error());
            }

            this.nome = this.nome.trim();

            if (!this.cargo || typeof this.cargo !== "string" || !this.cargos.includes(this.cargo)) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = "Escolha um cargo disponível!";
                return reject(new Error());
            }

            if (!this.salario || typeof this.salario !== "number") {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = "Insira o salário. Observação: Somente números e maior que zero!";
                return reject(new Error());
            }

            if (!functionSwitchSalario(this.cargo, this.salario)) {
                return reject(new Error());
            }

            messageSituacao.textContent = "";

            let numeroFuncionario = String(Date.now());
            let numero = numeroFuncionario.slice(8, 14);

            cadastros.funcionarios.push(
                {
                    Numero: numero,
                    Nome: this.nome,
                    Cargo: this.cargo,
                    Salario: this.salario
                }
            )

            resolve(cadastros.funcionarios);
            messageSituacao.style.color = "green"
            messageSituacao.textContent = "Funcionário adicionado com sucesso!"
            possuiCadastro = true;

        })
    }

    atualizarFuncionario(nome, cargo, salario) {
        return new Promise((resolve, reject) => {

            let funcionarioEncontrado = false;

            if (!possuiCadastro) {
                messageSituacao.style.color = "#ee1111"
                messageSituacao.textContent = "Não há nenhum funcionário para atualizar!"
                return reject(new Error());
            }

            for (let i = 0; i < cadastros.funcionarios.length; i++) {
                if (nome === cadastros.funcionarios[i].Nome) {
                    funcionarioEncontrado = true;
                    break;
                }
            }

            if (!funcionarioEncontrado) {
                messageSituacao.style.color = "#ee1111"
                messageSituacao.textContent = "Funcionário não encontrado!"
                return reject(new Error());
            }

            if (!functionSwitchSalario(cargo, salario)) {
                return reject(new Error());
            }

            salario = Number(salario);

            if (!cargo || !this.cargos.includes(cargo)) {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = "Escolha um cargo disponível!";
                return reject(new Error());
            }

            if (!salario || typeof salario !== "number") {
                messageSituacao.style.color = "#ee1111";
                messageSituacao.textContent = "Não foi inserido nenhum um novo salário!";
                return reject(new Error());
            }

            atualizacaoDisplay.style.display = "Flex";

            let numeroFuncionario = 0;

            const {infoAntiga} = funcionarioGet;

            for (let i = 0; i < cadastros.funcionarios.length; i++) {
                if (nome === cadastros.funcionarios[i].Nome) {
                    numeroFuncionario = cadastros.funcionarios[i].Numero
                    infoAntiga.numero.textContent = `Número: ${cadastros.funcionarios[i].Numero}`;
                    infoAntiga.nome.textContent = `Nome: ${nome}`;
                    infoAntiga.cargo.textContent = `Antigo Cargo: ${cadastros.funcionarios[i].Cargo}`;
                    infoAntiga.salario.textContent = `Antigo Salário: ${cadastros.funcionarios[i].Salario}`;

                    cadastros.funcionarios[i].Cargo = cargo;
                    cadastros.funcionarios[i].Salario = salario;

                }
            }

            const {infoNova} = funcionarioGet;

            infoNova.numero.textContent = `Número: ${numeroFuncionario}`;
            infoNova.nome.textContent = `Nome: ${nome}`;
            infoNova.cargo.textContent = `Novo Cargo: ${cargo}`;
            infoNova.salario.textContent = `Novo Salário: ${salario}`;

            messageSituacao.textContent = "";

            resolve(cadastros.funcionarios)
            messageSituacao.style.color = "green"
            messageSituacao.textContent = "Funcionário atualizado com sucesso!";
            
 
        })
    }

    removerFuncionario(nomeFuncionario) {
        return new Promise((resolve, reject) => {

            let funcionarioEncontrado = false;
  
            for (let i = 0; i < cadastros.funcionarios.length; i++) {
                if (nomeFuncionario === cadastros.funcionarios[i].Nome) {
                    cadastros.funcionarios.splice(i, 1);
                    funcionarioEncontrado = true;
                    break;
                }
            }

            if (!possuiCadastro) {
                messageSituacao.style.color = "#ee1111"
                messageSituacao.textContent = "Não há nenhum funcionário para remover!"
                return reject(new Error());
            }

            if (!funcionarioEncontrado) {
                messageSituacao.style.color = "#ee1111"
                messageSituacao.textContent = "Funcionário não encontrado!"
                return reject(new Error());  
            }

            messageSituacao.textContent = "";

            messageSituacao.style.color = "green"
            messageSituacao.textContent = `Funcionário '${nomeFuncionario}' removido com sucesso!`;
            resolve(cadastros.funcionarios);

        })

    }

}

const tiposOpcoes = {
    adicionar: false,
    atualizar: false,
    remover: false
}

function controleDisplay(atributo) {
    funcionarioGet.cargo.style.display = atributo;
    funcionarioGet.salario.style.display = atributo;
}

function limparConteudoAutomatico() {
    funcionarioGet.nome.value = '';
    funcionarioGet.cargo.value = '';
    funcionarioGet.salario.value = '';
    setTimeout(() => {
        messageSituacao.textContent = '';
    }, 2000)
}


async function efetivarCadastroFuncionario() {
    try {
        const funcionario = new Funcionario(funcionarioGet.nome.value, funcionarioGet.cargo.value, funcionarioGet.salario.value);
        await funcionario.adicionarFuncionario();
        limparConteudoAutomatico();
    } catch (error) {
        console.error();
    }

}

async function efetivarAtualizacaoFuncionario() {
    try {
        const funcionarioAtualizar = new Funcionario();
        await funcionarioAtualizar.atualizarFuncionario(
            funcionarioGet.nome.value, funcionarioGet.cargo.value, funcionarioGet.salario.value
        );
        limparConteudoAutomatico();
    } catch (error) {
        console.error()
    }
}

async function efetivarRemocaoFuncionario() {
    try {
        const funcionarioRemover = new Funcionario();
        await funcionarioRemover.removerFuncionario(funcionarioGet.nome.value);
        limparConteudoAutomatico();
    } catch (error) {
        console.error();
    }
}

controleOpcoes.adicionarFuncionario.addEventListener("click", () => {
    buttons.enviarCadastro.setAttribute("value", "Adicionar");
    atualizarTituloControle.textContent = "Adicionar Funcionário";
    limparConteudoAutomatico();
    tiposOpcoes.adicionar = true;
    tiposOpcoes.atualizar = false;
    tiposOpcoes.remover = false;
    funcionarioGet.nome.setAttribute("placeholder", "Nome do Funcionário")
    controleDisplay("block");
    atualizacaoDisplay.style.display = "none";

})

controleOpcoes.atualizarFuncionario.addEventListener("click", () => {
    const atualizar = buttons.enviarCadastro;
    atualizar.setAttribute("value", "Atualizar")
    atualizarTituloControle.textContent = "Atualizar Funcionário";
    limparConteudoAutomatico();
    tiposOpcoes.atualizar = true;
    tiposOpcoes.adicionar = false;
    tiposOpcoes.remover = false;
    funcionarioGet.nome.setAttribute("placeholder", "Pesquisar Funcionário")
    controleDisplay("block");
    funcionarioGet.cargo.value = '';
    funcionarioGet.salario.value = '';
})

controleOpcoes.removerFuncionario.addEventListener("click", () => {
    const remover = buttons.enviarCadastro;
    remover.setAttribute("value", "Remover")
    atualizarTituloControle.textContent = "Remover Funcionário"
    limparConteudoAutomatico();
    tiposOpcoes.remover = true;
    tiposOpcoes.adicionar = false;
    tiposOpcoes.atualizar = false;
    atualizacaoDisplay.style.display = "none"
    controleDisplay("none");
})


buttons.enviarCadastro.addEventListener("click", () => {
    if (tiposOpcoes.adicionar) {
        efetivarCadastroFuncionario();
    } else if (tiposOpcoes.atualizar) {
        efetivarAtualizacaoFuncionario();
    } else if (tiposOpcoes.remover) {
        efetivarRemocaoFuncionario();
    } else {
        messageSituacao.style.color = "#ee1111"
        messageSituacao.textContent = "Hum... Nenhum tipo de controle selecionado!"
    }

    setTimeout(() => {
        const json = JSON.stringify(cadastros, null, 2);
        console.log(json);
    }, 6000)

})