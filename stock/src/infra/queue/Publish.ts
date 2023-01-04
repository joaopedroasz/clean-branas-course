import { OrderPlaced } from '@/domain/event'
import { RabbitMQAdapter } from './RabbitMQAdapter'

async function publisher (): Promise<void> {
  const queue = new RabbitMQAdapter()
  await queue.connect()
  await queue.publish(new OrderPlaced({
    code: '123',
    items: {
      id: '1',
      quantity: 100
    }
  }))
}

publisher().catch(console.error)
