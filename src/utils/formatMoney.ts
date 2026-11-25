const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 9.9 -> "9,90" (sem o símbolo, usado no card do catálogo) */
export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

/** 9.9 -> "R$ 9,90" */
export function formatMoney(value: number): string {
  return `R$ ${formatNumber(value)}`
}
