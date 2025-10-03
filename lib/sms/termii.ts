import axios from 'axios'
import { SMSProvider } from './interface'

export class TermiiProvider implements SMSProvider {
  private apiKey: string
  private senderId: string
  constructor() {
    if (!process.env.TERMII_API_KEY || !process.env.TERMII_SENDER_ID) {
      throw new Error('TERMII_API_KEY and TERMII_SENDER_ID required')
    }
    this.apiKey = process.env.TERMII_API_KEY
    this.senderId = process.env.TERMII_SENDER_ID
  }
  async send(to: string, message: string) {
    const url = 'https://api.ng.termii.com/api/sms/send'
    const payload = {
      api_key: this.apiKey,
      to,
      from: this.senderId,
      sms: message,
      type: 'plain',
      channel: 'generic'
    }
    const res = await axios.post(url, payload, { timeout: 15000 })
    const ok = res.status >= 200 && res.status < 300 && (res.data?.message_id || res.data?.code === 'ok')
    return { success: ok, provider: 'termii', id: res.data?.message_id }
  }
}
