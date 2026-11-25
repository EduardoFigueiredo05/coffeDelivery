import { describe, expect, it } from 'vitest'
import { isCompleteCep, maskCep, onlyDigits } from './cep'

describe('utils de CEP', () => {
  it('aplica a máscara enquanto digita', () => {
    expect(maskCep('9025')).toBe('9025')
    expect(maskCep('902504')).toBe('90250-4')
    expect(maskCep('90250440')).toBe('90250-440')
  })

  it('ignora letras e dígitos excedentes', () => {
    expect(maskCep('9a0250-4401234')).toBe('90250-440')
    expect(onlyDigits('90250-440')).toBe('90250440')
  })

  it('identifica CEP completo', () => {
    expect(isCompleteCep('90250-440')).toBe(true)
    expect(isCompleteCep('90250-44')).toBe(false)
  })
})
