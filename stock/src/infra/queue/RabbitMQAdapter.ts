import amqp, { Connection } from 'amqplib'

import { DomainEvent } from '@/domain/event'
import { Queue } from './Queue'

export class RabbitMQAdapter implements Queue {
  private connection?: Connection

  public async connect (): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost')
  }

  public async close (): Promise<void> {
    await this.connection?.close()
  }

  public async consume (eventName: string, callback: (msg: Buffer) => Promise<void>): Promise<void> {
    if (!this.connection) return
    const channel = await this.connection.createChannel()
    await channel.assertQueue(eventName, { durable: true })
    await channel.consume(eventName, async (msg) => {
      if (!msg) return
      const input = JSON.parse(msg.content.toString())
      await callback(input)
      channel.ack(msg)
    })
  }

  public async publish (event: DomainEvent): Promise<void> {
    if (!this.connection) return
    const channel = await this.connection.createChannel()
    await channel.assertQueue(event.name, { durable: true })
    channel.sendToQueue(event.name, Buffer.from(JSON.stringify(event)))
  }
}
