import { SMSProvider } from './interface'
import { TermiiProvider } from './termii'

export class SMSService {
  private provider: SMSProvider
  constructor() {
    const p = process.env.SMS_PROVIDER || 'termii'
    switch (p) {
      case 'termii':
      default:
        this.provider = new TermiiProvider()
        break
    }
  }
  send(to: string, message: string) {
    return this.provider.send(to, message)
  }
}
