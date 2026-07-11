import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Badge from '../../components/Common/Badge'
import Button from '../../components/Buttons/Button'
import FormField from '../../components/Forms/FormField'
import { Textarea } from '../../components/Forms/Input'
import { EmptyState, Loader } from '../../components/Common/Loader'
import { useAuth } from '../../context/AuthContext'
import {
  listMaintenanceByTenant,
  submitMaintenanceRequest,
  updateMaintenanceStatus,
} from '../../services/api'
import { formatDate } from '../../utils/helpers'
import './Maintenance.css'

export default function Maintenance() {
  const { user } = useAuth()
  const isLandlord = user?.role === 'landlord'
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [issue, setIssue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function refresh() {
    setLoading(true)
    // Demo: both roles look at the same tenant's queue (T-1) since this
    // is a frontend-only mock. A real API would scope by landlord's rooms.
    const data = await listMaintenanceByTenant('T-1')
    setRequests(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!issue.trim()) return
    setSubmitting(true)
    await submitMaintenanceRequest({ tenantId: user.id, roomId: 'RM-102', issue })
    setIssue('')
    setSubmitting(false)
    refresh()
  }

  async function markResolved(id) {
    await updateMaintenanceStatus(id, 'Resolved')
    refresh()
  }

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <p className="eyebrow">{isLandlord ? 'Maintenance queue' : 'Maintenance requests'}</p>
        <h1>{isLandlord ? 'Issues reported by tenants' : 'Report and track issues'}</h1>

        {!isLandlord && (
          <form className="form-card maintenance-form" onSubmit={handleSubmit}>
            <FormField label="Describe the issue" htmlFor="issue" hint="e.g. leaking tap, Wi-Fi down, electrical fault">
              <Textarea id="issue" value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="What's wrong, and where?" />
            </FormField>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit request'}
            </Button>
          </form>
        )}

        <h2 className="maintenance-list-title">{isLandlord ? 'All requests' : 'Your requests'}</h2>
        {loading ? (
          <Loader label="Loading requests…" />
        ) : requests.length === 0 ? (
          <EmptyState title="No maintenance requests" description="Reported issues will show up here with their status." />
        ) : (
          <ul className="maintenance-list">
            {requests.map((r) => (
              <li key={r.id} className="maintenance-item">
                <div>
                  <p className="maintenance-item__issue">{r.issue}</p>
                  <p className="maintenance-item__meta mono">{r.id} · Room {r.roomId} · {formatDate(r.date)}</p>
                </div>
                <div className="maintenance-item__right">
                  <Badge>{r.status}</Badge>
                  {isLandlord && r.status !== 'Resolved' && (
                    <Button size="sm" variant="outline" onClick={() => markResolved(r.id)}>
                      Mark resolved
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
