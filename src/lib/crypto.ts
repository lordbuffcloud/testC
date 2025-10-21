import { createHmac, timingSafeEqual } from 'crypto'

export function sign(payload: string, secret: string): string {
  const hmac = createHmac('sha256', secret)
  hmac.update(payload)
  return hmac.digest('base64url')
}

export function verify(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = sign(payload, secret)
  
  if (expectedSignature.length !== signature.length) {
    return false
  }
  
  return timingSafeEqual(
    Buffer.from(expectedSignature, 'base64url'),
    Buffer.from(signature, 'base64url')
  )
}
