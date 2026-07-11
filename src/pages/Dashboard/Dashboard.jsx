import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import StatCard from '../../components/Cards/StatCard'
import Button from '../../components/Buttons/Button'
import { useAuth } from '../../context/AuthContext'
import {
  listPaymentsByTenant,
  listMaintenanceByTenant,
  listRoomsByLandlord,
} from '../../services/api'
import { formatCurrency } from '../../utils/helpers'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuth()
  const isLandlord = user?.role === 'landlord'
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function load() {
      if (isLandlord) {
        const rooms = await listRoomsByLandlord(user.id)
        setStats({
          total: rooms.length,
          available: rooms.filter((r) => r.status === 'Available').length,
          occupied: rooms.filter((r) => r.status === 'Occupied').length,
        })
      } else {
        const [payments, requests] = await Promise.all([
          listPaymentsByTenant(user.id),
          listMaintenanceByTenant(user.id),
        ])
        const pending = payments.filter((p) => p.status === 'Pending')
        setStats({
          duePayments: pending.length,
          dueAmount: pending.reduce((sum, p) => sum + p.amount, 0),
          openRequests: requests.filter((r) => r.status !== 'Resolved').length,
        })
      }
    }
    if (user) load()
  }, [user, isLandlord])

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <p className="eyebrow">{isLandlord ? 'Landlord dashboard' : 'Tenant dashboard'}</p>
        <h1>Welcome back, {user?.name?.split(' ')[0] || 'there'}.</h1>

        {stats && (
          <div className="stats-grid">
            {isLandlord ? (
              <>
                <StatCard label="Total rooms" value={stats.total} />
                <StatCard label="Available" value={stats.available} tone="accent" />
                <StatCard label="Occupied" value={stats.occupied} />
              </>
            ) : (
              <>
                <StatCard label="Pending payments" value={stats.duePayments} tone={stats.duePayments ? 'danger' : 'default'} />
                <StatCard label="Amount due" value={formatCurrency(stats.dueAmount)} tone="accent" />
                <StatCard label="Open maintenance requests" value={stats.openRequests} />
              </>
            )}
          </div>
        )}

        <div className="dashboard-actions">
          {isLandlord ? (
            <>
              <Button as={Link} to="/landlord" variant="primary">Manage properties</Button>
              <Button as={Link} to="/maintenance" variant="outline">View maintenance queue</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/tenant" variant="primary">Find a room</Button>
              <Button as={Link} to="/payments" variant="outline">View payments</Button>
              <Button as={Link} to="/maintenance" variant="outline">Report an issue</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
