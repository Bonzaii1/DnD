interface ErrorMessageProps {
  error: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ErrorMessage({ error, className = '', size = 'sm' }: ErrorMessageProps) {
  if (!error) return null

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex items-start gap-2 ${className}`} role="alert">
      <svg
        className="h-5 w-5 text-red-600 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
      <p className={`${sizeClasses[size]} text-red-600`}>{error}</p>
    </div>
  )
}
