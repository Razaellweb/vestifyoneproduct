export interface SMSProvider {
  send(to: string, message: string): Promise<{ success: boolean; provider: string; id?: string }>
}
