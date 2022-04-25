# Search Order By Code use case:

O caso de uso *Search Order by Code* tem como objetivo pegar um **Pedido** através de **Código** desse pedido.

- Input:

O input desse caso de uso tem o seguinte formato:

```json
{
  "orderCode": "202200000001"
}
```

- Output:

Esse caso de uso retorna o **Pedido** respectivo ao código fornecido no seguinte formato:

```json
{
  "orderId": "uuid",
  "orderCode": "202200000001",
  "buyerCpf": "111.222.333-44",
  "issueDate": "04/25/2022",
  "price": 100,
  "freightValue": 100,
  "couponId": "uuid | null",
  "items": [
    { "id": "uuid", "quantity": 1 },
    { "id": "uuid", "quantity": 2 },
    { "id": "uuid", "quantity": 3 },
  ]
}
```
