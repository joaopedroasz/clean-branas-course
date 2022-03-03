# Scripts:

Descrição dos scripts contidos no arquivo package.json:

*test*: Roda todos os testes do sistema, sejam unitários ou de integração. OBS: Para rodar esses testes, é preciso estar com o Docker rodando.

*test:staged*: Roda os testes que estão na área de *stage* do git. Comando unicamente utilizado para quando for fazer commit.

*test:integration*: Roda os testes de integração do sistema. OBS: Para rodar esse comando, é preciso estar com o Docker rodando.

*test:unit*: Roda os testes unitários do sistema.

*prepare*: Configura o Husky. Comando é rodado automaticamente após instalar uma nova dependência.

*build*: Comando utilizado para fazer a transpilação do *TypeScript*. Esse deve ser o comando para transpilar o código, esse tem uma configuração específica para isso.

*update-dependencies*: Comando para atualizar as dependências do projeto.
