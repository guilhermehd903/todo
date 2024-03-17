# Projeto Todo - Teste de Estágio

## Informações do Desenvolvedor
- **Nome:** Guilherme Brasil
- **E-mail:** guilhermegdrag@gmail.com

## Descrição
Este projeto Todo é um teste de estágio para a empresa unimble. Ele foi desenvolvido utilizando VueJS 3 para o frontend e NodeJS para o backend, ambos escritos em TypeScript. O banco de dados utilizado foi o SQLite e o arquivo `.env` necessário para o projeto está incluído neste repositório para fins de teste e praticidade.

## Instruções de Uso

1. **Frontend**:
   - Entre no diretório `frontend` do projeto.
   - Execute o seguinte comando para instalar as dependencias:
     ```
     npm install
     ```
   - Execute o seguinte comando para iniciar o servidor de desenvolvimento:
     ```
     npm run serve
     ```

2. **Backend**:
   - Entre no diretório `backend` do projeto.
   - Execute o seguinte comando para instalar as dependencias:
     ```
     npm install
     ```
   - Execute o seguinte comando para iniciar o servidor:
     ```
     npm start
     ```
## Stripe
A integração com api de pagamento foi realizada com stripe. Para fins de teste o trabalho que o webhook faria em de se comunicar com o sistema será realizado atraves de um botão chamado ativar na lista de todo. Então ao atingir as 5 tarefas o usuario segue esse fluxo para conseguir premium:

Clicar botão assina já => preencher os dados no checkout do stripe => clicar no botão ativar

Basicamente a api vai criar uma sessão de pagamento, e como é um ambiente de teste o pagamento será concluido automaticamente e será criado um paymentIntent. Ao clicar no botão
"assine já" ele vai salvar o id sessão no localstorage, e quando clicar no botão ativar basicamente a api vai requisitar o stripe atraves do id da sessão, e se o status for de sucesso então o campo premium vai ser atualizado para true.

## Credenciais de Teste
- **Usuário:** teste@gmail.com
- **Senha:** 123

## Cartão de Teste
- **Nº cartão:** 4242 4242 4242 4242
- **Validade:** Qualquer data maior que atual
- **CVV:** Qualquer numero
