### Esta é uma mini SPA para gerenciamento de empresas, construída com Next.js, TypeScript e Material-UI, focada em uma experiência de usuário limpa e responsiva.

#### Listagem Dinâmica: A página principal exibe as empresas em cards e conta com uma busca em tempo real que filtra os resultados por Nome Fantasia, Razão Social ou CNPJ.

## Cadastro Inteligente: Um formulário completo permite o cadastro de novas empresas, com validação de dados em tempo real (Joi), máscara de input para o CNPJ e feedbacks de sucesso/erro através de notificações.

## Visualização de Rendimento: Ao clicar em um card, um modal é aberto para exibir o rendimento atual da empresa.


## Observação sobre a Funcionalidade "Buscar CNPJ"
## Durante os testes, o endpoint da API (https://api.arkmeds.com/cnpj) começou a retornar um erro 403. Após uma investigação, verificou que a falha não está na implementação do front-end, mas sim no servidor da API, que parece estar rejeitando as credenciais de teste fornecidas (possivelmente por terem expirado ou por outra restrição de acesso). O teste E2E de cadastro foi adaptado para validar o fluxo de preenchimento manual.


## Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

## Node.js: Versão 18 ou superior.
## npm ou yarn

## Crie o arquivo de variáveis de ambiente. Crie um arquivo chamado .env na raiz do projeto e copie o conteúdo abaixo para ele, preenchendo com as chaves fornecidas.

NEXT_PUBLIC_API_TOKEN=SEU_TOKEN_AQUI
NEXT_PUBLIC_CNPJ_API_KEY=SUA_CHAVE_DE_API_DO_CNPJ_AQUI
NEXT_PUBLIC_ARKMEDS_API_URL=https://n8ndev.arkmeds.xyz/webhook/14686c31-d3ab-4356-9c90-9fbd2feff9f1
NEXT_PUBLIC_CNPJ_LOOKUP_API_URL=https://api.arkmeds.com/cnpj

## Instale as dependências do projeto:
npm install

## Executar aplicação:
npm run dev


## Os testes End-to-End foram escritos com Cypress para validar os principais fluxos da aplicação.

## Inicie a aplicação: Primeiro, certifique-se de que o servidor de desenvolvimento esteja rodando em um terminal 'npm run dev'.

## Instalação e Configuração do Cypress.
npm install -D cypress

## Os testes usando Cypress estão na pasta cypress/e2e, são dois testes.
npx cypress open

## Escolha um dos testes 'company-list.cy.ts' ou 'company-details.cy.ts.
