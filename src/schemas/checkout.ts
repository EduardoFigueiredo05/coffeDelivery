import { z } from 'zod'

export const paymentMethods = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
} as const

export type PaymentMethod = keyof typeof paymentMethods

export const checkoutSchema = z.object({
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido'),
  street: z.string().trim().min(3, 'Informe a rua'),
  number: z.string().trim().min(1, 'Informe o número').max(10, 'Número muito longo'),
  complement: z.string().trim().max(60, 'Máximo de 60 caracteres').optional(),
  district: z.string().trim().min(2, 'Informe o bairro'),
  city: z.string().trim().min(2, 'Informe a cidade'),
  uf: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, 'UF inválida'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    error: 'Selecione a forma de pagamento',
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
