import './Cards.css'

export default function StatCard({ label, value, hint, tone = 'default' }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value mono">{value}</p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </div>
  )
}
