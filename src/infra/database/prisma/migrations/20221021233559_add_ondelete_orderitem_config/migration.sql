-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_item_id_fkey";

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
