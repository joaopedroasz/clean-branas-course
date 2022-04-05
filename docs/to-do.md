# Modificações e próximas atividades do sistema:

- [x] Alterar todos os nomes, no código e no banco de dados, de *itens* para *items*;

- [] Adicionar sufixo "Error" nas classes de erro que não tem;

- [] Rever a estrutura da entidade *OrderCode*:
  - Receber dados via construtor (*data* e *sequence*);
  - Criar esse código na instanciação da classe;

- [] Rever relações das entidades *Order* e *OrderCode*:
  - Ter uma propriedade dentro de *Order* que faz referência ao *order code*;
  - Setar essa propriedade na instanciação da entidade *Order*;

- [] Adicionar coluna *price* na tabela *OrderItem* -> Banco de dados;

- [] Rever estrutura da entidade *Order*;
  - [] Adicionar campo *issue_date* -> Banco de dados e entidade;
  - [] Privar propriedades como CPF, coupon, etc.
  - [] Na implementação *OrderRepositoryPostgres* retirar as referências as propriedades de **CPF** e **Coupon**;
  - [] Retirar referência de *Freight* essa entidade;
    - Vamos receber o frete de fora, **não é responsabilidade de _Order_ calcular o frete**;
    - Alterar mudanças nos testes;

- [] Rever estrutura da entidade *Freight*:
  - Ter uma propriedade, privada, para receber o calculo do frete;
  - O cálculo ser realizado na instanciação da classe;
  - Ter um método para expor a propriedade calculada;
  - Transformar essa **entidade** em um *Domain Service*:
    - Criar uma camada *Services* dentro da pasta *Domain* para guardar esses serviços;
    - Esse serviço será orquestrado pelo **Case de Uso**;

- [] Rever comportamento *isExpired()* da entidade *Coupon*:
  - Não seria mais semântico ter uma **propriedade** ou algum **método**, *isValid* por exemplo, que seria chamado através da própria entidade *Coupon*, exibindo **se** aquele cupom á valido.

- [] Rever retorno do *Order Repository save method*. **Um método de salvar deve retornar um código?**:
  - Questionamento: Esse método deverá retornar *void* ou a entidade que foi **criada**?;
  - Mudar o **teste** para que o repositório receba apenas o **pedido** como parâmetro;
  - Alterar *interface* para receber apenas **order** e retornar *void* ou entidade criada;

- [] Rever estrutura do caso de uso *Place Order*:
  - [] Adicionar possibilidade de mandar um cupom no caso de uso *Place Order*;
  - [] No caso de uso *Place Order*, também salvar no banco de dados os registros de *Order Items*, que estarão dentro da entidade *Order*, só o *Order ID* que teremos que receber de fora;

- [] Mudar os nomes das pastas em **src/domain/repositories** para padrão dos nomes;

- [] Criar tipos específicos para os parâmetros das funções de *query* nos repositórios:
  - No *OrderRepositoryPostgres*, por exemplo, não receber um *object* como tipo dos parâmetros, mas um objeto definido;

- Testes:
  - [] Testar, nos casos de uso, exceções que podem ser lançadas pelos repositórios ou por outras dependências;
  - [] Criar testes de **integração** dos **casos de uso**, adicionando as dependências reais e analisando retornos do banco de dados;
  - [] Testar o caso de salvar um pedido **sem** cupom;


- Próximos passos:
  - Casos de uso:
    - [] Deve retornar um pedido com base no código;
    - [] Deve retornar a lista de todos os pedidos feitos;
      - Focar em uma visão de dados produtiva e eficiente;
  - Considere:
    - Criar uma *API* para os casos de uso;
    - Criar os testes de integração dessa *API*;
