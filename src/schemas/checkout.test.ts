import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './checkout'

const valid = {
  cep: '90250-440',
  street: 'Rua João Daniel Martinelli',
  number: '102',
  complement: '',
  district: 'Farrapos',
  city: 'Porto Alegre',
  uf: 'RS',
  paymentMethod: 'credit',
}

describe('checkoutSchema', () => {
  it('aceita um endereço válido', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true)
  })

  it('aceita CEP sem hífen', () => {
    expect(checkoutSchema.safeParse({ ...valid, cep: '90250440' }).success).toBe(true)
  })

  it('rejeita CEP incompleto', () => {
    const result = checkoutSchema.safeParse({ ...valid, cep: '9025' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Informe um CEP válido')
  })

  it('rejeita UF com mais de 2 letras', () => {
    expect(checkoutSchema.safeParse({ ...valid, uf: 'RSS' }).success).toBe(false)
  })

  it('exige os campos obrigatórios', () => {
    const result = checkoutSchema.safeParse({ ...valid, street: '', number: '', city: '' })
    const fields = result.error?.issues.map((issue) => issue.path[0])
    expect(fields).toEqual(expect.arrayContaining(['street', 'number', 'city']))
  })

  it('exige a forma de pagamento', () => {
    const result = checkoutSchema.safeParse({ ...valid, paymentMethod: undefined })
    expect(result.error?.issues[0].message).toBe('Selecione a forma de pagamento')
  })
})
