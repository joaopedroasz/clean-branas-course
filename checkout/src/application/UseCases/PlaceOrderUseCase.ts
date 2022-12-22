import { Order } from '@/domain/entities'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { CountOrdersRepository, SaveOrderRepository } from '@/domain/repositories/Order'
import { CalculateFreightGateway, CalculateFreightItem, DecreaseStockGateway, PlaceOrder } from '@/application/contracts'
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from '@/application/DTOs'

export class PlaceOrderUseCase implements PlaceOrder {
  private readonly getItemByIdRepository: GetItemByIdRepository
  private readonly getCouponByCodeRepository: GetCouponByCodeRepository
  private readonly saveOrderRepository: SaveOrderRepository
  private readonly countOrdersRepository: CountOrdersRepository
  private readonly calculateFreightGateway: CalculateFreightGateway
  private readonly decreaseStockGateway: DecreaseStockGateway

  constructor (
    getItemByIdRepository: GetItemByIdRepository,
    getCouponByCodeRepository: GetCouponByCodeRepository,
    saveOrderRepository: SaveOrderRepository,
    countOrdersRepository: CountOrdersRepository,
    calculateFreightGateway: CalculateFreightGateway,
    decreaseStockGateway: DecreaseStockGateway
  ) {
    this.getItemByIdRepository = getItemByIdRepository
    this.getCouponByCodeRepository = getCouponByCodeRepository
    this.saveOrderRepository = saveOrderRepository
    this.countOrdersRepository = countOrdersRepository
    this.calculateFreightGateway = calculateFreightGateway
    this.decreaseStockGateway = decreaseStockGateway
  }

  public async execute (input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const {
      buyerCPF,
      orderItems,
      couponCode,
      purchaseDate,
      from,
      to
    } = input
    const count = await this.countOrdersRepository.count()
    const order = new Order({ buyerCPF, purchaseDate, sequence: count })
    const calculateFreightItems: CalculateFreightItem[] = []
    for (const orderItem of orderItems) {
      const item = await this.getItemByIdRepository.getById(orderItem.itemId)
      order.addItem({ item, quantity: orderItem.quantity })
      calculateFreightItems.push({
        density: item.calculateDensity(),
        quantity: orderItem.quantity,
        volume: item.calculateVolumeInCubicMeter()
      })
      await this.decreaseStockGateway.decrease({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity
      })
    }
    const { freight } = await this.calculateFreightGateway.calculate({
      from,
      to,
      items: calculateFreightItems
    })
    order.setFreight(freight)
    if (couponCode) {
      const coupon = await this.getCouponByCodeRepository.getByCode(couponCode)
      order.addCoupon(coupon)
    }
    const createdOrder = await this.saveOrderRepository.save(order)
    return {
      total: order.getTotalPrice(),
      order: {
        code: createdOrder.getCode(),
        purchaseDate: createdOrder.getPurchaseDate(),
        CPF: createdOrder.getCPF()
      },
      freight: order.getFreight()
    }
  }
}
