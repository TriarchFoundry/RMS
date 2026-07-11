import Badge from '../Common/Badge'
import Button from '../Buttons/Button'
import { formatCurrency } from '../../utils/helpers'
import './Cards.css'

export default function RoomCard({ room, actionLabel = 'View details', onAction, footer }) {
  return (
    <article className="keytag-card">
      <div className="keytag-card__hole" aria-hidden="true" />
      <div className="keytag-card__body">
        <div className="keytag-card__top">
          <span className="keytag-card__id mono">{room.id}</span>
          <Badge>{room.status}</Badge>
        </div>
        <h3>{room.title}</h3>
        <p className="keytag-card__location">{room.location}</p>
        <p className="keytag-card__desc">{room.description}</p>
        <div className="keytag-card__meta">
          <span className="keytag-card__type">{room.type}</span>
          <span className="keytag-card__rent mono">{formatCurrency(room.rent)}<small>/mo</small></span>
        </div>
        {footer ? (
          footer
        ) : (
          onAction && (
            <Button variant="outline" size="sm" onClick={() => onAction(room)} className="keytag-card__cta">
              {actionLabel}
            </Button>
          )
        )}
      </div>
    </article>
  )
}
