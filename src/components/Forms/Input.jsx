import { classNames } from '../../utils/helpers'
import './Forms.css'

export function Input({ className, ...props }) {
  return <input className={classNames('input', className)} {...props} />
}

export function Select({ className, children, ...props }) {
  return (
    <select className={classNames('input', 'input--select', className)} {...props}>
      {children}
    </select>
  )
}

export function Textarea({ className, ...props }) {
  return <textarea className={classNames('input', 'input--textarea', className)} {...props} />
}
