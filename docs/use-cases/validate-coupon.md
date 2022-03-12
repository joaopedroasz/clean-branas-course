# Validate Coupon use case.

O caso de uso *Validate Coupon* valida um cupom com base na data de expiração desse cupom.

- Input:

Recebemos um DTO que contêm o id do cupom. O DTO têm o seguinte formato:

```json
{
  "couponId": "1"
}
```

- Output:

Retornamos um boolean que mostra se o Cupom é válido ou não.
