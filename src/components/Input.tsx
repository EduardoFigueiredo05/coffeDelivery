import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label: string
  error?: string
  optional?: boolean
  containerClassName?: string
}

/**
 * Campo de texto do checkout. O label fica acessível (sr-only) e o placeholder
 * reproduz o visual do Figma. Recebe o `ref` do React Hook Form via props (React 19).
 */
export function Input({ label, error, optional, containerClassName = '', id, ...props }: InputProps) {
  const inputId = id ?? props.name
  const errorId = `${inputId}-error`

  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div
        className={`flex items-center rounded border bg-base-input transition-colors focus-within:border-yellow-dark ${
          error ? 'border-danger' : 'border-base-button'
        }`}
      >
        <input
          id={inputId}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="w-full min-w-0 bg-transparent p-3 text-sm text-base-text outline-none placeholder:text-base-label"
          {...props}
        />
        {optional && <span className="pr-3 text-xs text-base-label italic">Opcional</span>}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
