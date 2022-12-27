# TO DO:

## In order of priority:

1. Remove the rules in `Item` entity:

   All the business rules were moved to the `Catalog` service.

   Add the following props to `Item` entity:

   - [x] `volume`;
   - [x] `density`;

   Remove the methods that use to calculate the props above.

2. Change the `Item` table:

   - [x] Add the `volume` column;
   - [x] Add the `density` column;

3. Create `ItemGateway` services:

   - [ ] `GetItemById`; (Or change to `GetItemByIds`)

   **The dream feature**:
   Implement a queue in `Catalog` service that will send a message like `ItemCreated` and this service will receive it and save the new item in the database.

4. Update `ItemRepository` to handle the new columns:

   - [ ] `GetItemById`;
   - [ ] `GetItemsByOrderCode`;
   - [ ] `GetItemsByOrderCPF`;

5. Create resolvers to handle the following queries:

   - [ ] `PlaceOrder`;
   - [ ] `SearchOrderByCode`;
   - [ ] `SearchOrdersByCPF`;
   - [ ] `SimulateFreight`;
   - [ ] `ValidateCoupon`;
