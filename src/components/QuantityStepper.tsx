type Props = {
  value: number
  onChange: (v: number) => void
  min?: number
}

export function QuantityStepper({ value, onChange, min = 1 }: Props) {
  return (
    <div className="qty-stepper">
      <button
        type="button"
        className="qty-btn"
        aria-label="减少"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="qty-value">{value}</span>
      <button
        type="button"
        className="qty-btn plus"
        aria-label="增加"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}
