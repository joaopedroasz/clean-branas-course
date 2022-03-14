# Validate Coupon use case.

O caso de uso *Validate Coupon* valida um cupom com base na data de expiração desse cupom.

- Input:

Recebemos um DTO que contêm o id do cupom e a data atual da validação. O DTO têm o seguinte formato:

```json
{
  "couponId": "1",
  "currentDate": "03/13/2022"
}
```

O parâmetro *currentDate* é opcional para realizar a validação do cupom. Mas recebemos essa informação de fora por causa da DIP (dependence inversion principle).

- Output:

Retornamos um boolean que mostra se o Cupom é válido ou não.
