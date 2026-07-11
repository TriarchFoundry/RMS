import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Badge from '../../components/Common/Badge'
import Button from '../../components/Buttons/Button'
import FormField from '../../components/Forms/FormField'
import { Select } from '../../components/Forms/Input'
import { EmptyState, Loader } from '../../components/Common/Loader'
import { useAuth } from '../../context/AuthContext'
import { listPaymentsByTenant, recordPayment } from '../../services/api'
import { formatCurrency, formatDate } from '../../utils/helpers'
import './Payments.css'

export default function Payments() {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState('UPI')
  const [paying, setPaying] = useState(false)

  async function refresh() {
    setLoading(true)
    const data = await listPaymentsByTenant(user.id)
    setPayments(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const pending = payments.find((p) => p.status === 'Pending')

  async function handlePay() {
    if (!pending) return
    setPaying(true)
    await recordPayment({ tenantId: user.id, roomId: pending.roomId, amount: pending.amount, method })
    // mark the old pending record resolved by refreshing — in a real API
    // the backend would update/replace the pending record.
    await refresh()
    setPaying(false)
  }

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <p className="eyebrow">Rent ledger</p>
        <h1>Payments & payment history</h1>

        {pending && (
          <div className="pay-now-card">
            <div>
              <p className="pay-now-card__label">Next payment due</p>
              <p className="pay-now-card__amount mono">{formatCurrency(pending.amount)}</p>
              <p className="pay-now-card__meta">Room {pending.roomId} · originally due {formatDate(pending.date)}</p>
            </div>
            <div className="pay-now-card__action">
              <FormField label="Payment method" htmlFor="method">
                <Select id="method" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option>UPI</option>
                  <option>Debit card</option>
                  <option>Net banking</option>
                </Select>
              </FormField>
              <Button variant="accent" onClick={handlePay} disabled={paying}>
                {paying ? 'Processing…' : 'Pay now'}
              </Button>
            </div>
          </div>
        )}

        <h2 className="payments-history-title">Payment history</h2>
        {loading ? (
          <Loader label="Loading payment history…" />
        ) : payments.length === 0 ? (
          <EmptyState title="No payments recorded yet" description="Your rent payments will appear here once made." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="mono">{p.id}</td>
                  <td>{p.roomId}</td>
                  <td className="mono">{formatCurrency(p.amount)}</td>
                  <td>{formatDate(p.date)}</td>
                  <td>{p.method}</td>
                  <td><Badge>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
