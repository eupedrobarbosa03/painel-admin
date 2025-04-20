# 🧑‍💼 Painel Administrativo - Sistema de Cadastro de Funcionários

Este projeto é um **Painel Administrativo** criado com **JavaScript**, **HTML** e **CSS**, que simula o gerenciamento de funcionários em uma empresa. Ele permite adicionar, atualizar e remover funcionários com base em suas informações e cargos, além de realizar **validações específicas de salário por cargo** e exibir atualizações em tempo real na interface.

> 🔗 Acesse o projeto online: [Clique aqui para ver o painel](https://eupedrobarbosa03.github.io/painel-admin/)

---

## ✨ Funcionalidades

- ✅ **Cadastro de Funcionário**  
- ✅ **Validação de nome, cargo e faixa salarial**  
- ✅ **Atualização de dados com histórico visual (antes e depois)**  
- ✅ **Remoção de funcionário**  
- ✅ **Mensagens visuais para sucesso e erros**  
- ✅ **Sistema orientado a objetos com `Promise` e controle de estados**

---

## 🧠 Tecnologias Utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript (Vanilla)**  
- **Programação Orientada a Objetos (POO)**  
- **Promises**  
- **Manipulação do DOM**

## 🧪 Como Funciona

O sistema foi projetado com validações específicas por cargo, garantindo que os salários inseridos estejam dentro da **faixa salarial adequada**:

| Cargo         | Faixa Salarial (R$) |
|---------------|---------------------|
| Gerente       | 2.000 - 5.000       |
| Administrador | 1.600 - 2.500       |
| Vendedor      | 1.100 - 1.500       |
| Estagiário    | 700 - 900           |

Se o salário não estiver dentro do intervalo ou os dados forem inseridos de forma incorreta, o sistema exibirá uma **mensagem de erro amigável** para o usuário.

Além disso, ao atualizar um funcionário, é exibido o **antes e depois das informações** na interface, facilitando o acompanhamento de mudanças.

---

## 🧠 Lógica e Validações

A classe `Funcionario` gerencia toda a lógica por trás do cadastro:

- `adicionarFuncionario()`  
  Valida os dados e adiciona o funcionário ao array principal.

- `atualizarFuncionario()`  
  Localiza o funcionário pelo nome e atualiza suas informações.

- `removerFuncionario()`  
  Remove o funcionário com base no nome informado.

Todas essas ações retornam Promises e são executadas de forma assíncrona, garantindo que o sistema possa evoluir para uso com APIs futuramente.

---

## 🖼️ Exemplo de Interface

A interface é simples, mas funcional, com uma seção de controle de ações, formulários e um display de atualização com antes e depois das alterações.

---

## 🚀 Possíveis Melhorias Futuras

- Integração com `localStorage` ou banco de dados  
- Interface mais responsiva e com design moderno  
- Listagem visual de todos os funcionários cadastrados  
- Sistema de login e permissões por usuário  
- Exportação de dados em JSON/CSV

---

## 👨‍💻 Desenvolvedor

[Pedro Barbosa](https://github.com/eupedrobarbosa03)
