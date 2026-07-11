import { classNames } from '../../utils/helpers'
import './Common.css'

const TONE_MAP = {
  Available: 'success',
  Paid: 'success',
  Resolved: 'success',
  Occupied: 'warn',
  Pending: 'warn',
  Overdue: 'danger',
  Rejected: 'danger',
}

export default function Badge({ children, tone }) {
  const resolvedTone = tone || TONE_MAP[children] || 'neutral'
  return <span className={classNames('badge', `badge--${resolvedTone}`)}>{children}</span>
}
