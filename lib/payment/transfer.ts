import axios from 'axios'

const base = axios.create({ baseURL: 'https://api.paystack.co', timeout: 20000, headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } })

export async function createTransferRecipient(name: string, accountNumber: string, bankCode: string) {
  const res = await base.post('/transferrecipient', { type: 'nuban', name, account_number: accountNumber, bank_code: bankCode, currency: 'NGN' })
  if (!res.data?.status) throw new Error(res.data?.message || 'Failed to create transfer recipient')
  return res.data.data.recipient_code as string
}

export async function initiateTransfer(amountNgn: number, recipientCode: string, reason: string, reference: string) {
  const res = await base.post('/transfer', { source: 'balance', amount: Math.ceil(amountNgn * 100), recipient: recipientCode, reason, reference })
  if (!res.data?.status) throw new Error(res.data?.message || 'Failed to initiate transfer')
  return { status: res.data.data.status as string, transferCode: res.data.data.transfer_code as string }
}
