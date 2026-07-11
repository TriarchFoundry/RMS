import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

const TENANT_ITEMS = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/tenant', label: 'Find rooms' },
  { to: '/payments', label: 'Payments' },
  { to: '/maintenance', label: 'Maintenance' },
  { to: '/profile', label: 'Profile & documents' },
]

const LANDLORD_ITEMS = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/landlord', label: 'My properties' },
  { to: '/maintenance', label: 'Maintenance queue' },
  { to: '/profile', label: 'Profile' },
]

export default function Sidebar() {
  const { user } = useAuth()
  const items = user?.role === 'landlord' ? LANDLORD_ITEMS : TENANT_ITEMS

  return (
    <aside className="sidebar">
      <p className="sidebar__label">{user?.role === 'landlord' ? 'Landlord menu' : 'Tenant menu'}</p>
      <nav className="sidebar__nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
