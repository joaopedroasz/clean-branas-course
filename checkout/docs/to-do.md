- To Do:
  - Create new **bounded context** for freight calculation;
    - REST API;
    - Express;
    - New database;
  - Reference **aggregates** using **aggregate identifiers**;
    - This will break some repository classes, fix them;
  - Create static build method in **aggregates**:

```ts
class Item {
  private id: string;
  private price: string;

  public createOrderItem(quantity: number): OrderItem {
    return new OrderItem(this.id, this.price, quantity);
  }
}
```
