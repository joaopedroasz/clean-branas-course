import { DomainEvent } from '@/domain/event'

export interface Queue {
  connect: () => Promise<void>
  close: () => Promise<void>
  consume: (eventName: string, callback: (msg: any) => Promise<void>) => Promise<void>
  publish: (event: DomainEvent) => Promise<void>
}
