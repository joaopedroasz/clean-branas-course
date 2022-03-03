# Place Order use case.

O caso de uso *Place Order* serve para fazer um pedido e salvá-lo no banco de dados.

- Input:

Recebemos o CPF do comprador, e uma lista dos ID's dos items que serão comprados e a quantidade desses items.

- Output:

Esse caso de uso nos retorna o *total do pedido* e um *código* específico criado unicamente para cada pedido.

Esse código sempre terá 12 dígitos, com o seguinte formato: AAAAPPPPPPPP

AAAA: Ano atual

PPPPPPPP: Número aleatório
