import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Buttons/Button'
import RoomCard from '../../components/Cards/RoomCard'
import { Input, Select } from '../../components/Forms/Input'
import { listRooms } from '../../services/api'
import './Home.css'

const PROBLEM_ROWS = [
  { role: 'Tenant', pain: 'Searching for a safe room near work or college eats up days.' },
  { role: 'Tenant', pain: 'Rent, deposit and dues get tracked on paper — or not at all.' },
  { role: 'Landlord', pain: 'Vacant rooms sit empty for months with no visibility.' },
  { role: 'Landlord', pain: 'A tenant leaves overnight, and the unpaid rent goes with them.' },
]

const FEATURES = [
  { title: 'Digital tenant registration', copy: 'Identity, contact and lease details captured once, stored securely.' },
  { title: 'Automated rent tracking', copy: 'Every payment logged with method, date and status — no ledger book required.' },
  { title: 'Maintenance requests', copy: 'Tenants report issues with photos; landlords see a single resolution queue.' },
  { title: 'Document vault', copy: 'ID proofs and agreements stored per tenant, retrievable in seconds.' },
  { title: 'Automated notifications', copy: 'Rent reminders and status updates sent by SMS or email, on schedule.' },
  { title: 'Reporting', copy: 'Occupancy, dues and issue reports generated for oversight and security.' },
]

export default function Home() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ location: '', maxRent: '', type: 'Any' })

  useEffect(() => {
    let active = true
    setLoading(true)
    listRooms(filters).then((data) => {
      if (active) {
        setRooms(data)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [filters])

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Room rental, minus the paperwork</p>
            <h1>One ledger for every room, tenant and rupee.</h1>
            <p className="hero__lede">
              Basera brings landlords and tenants onto a single platform — search rooms,
              collect rent, track maintenance, and store documents, without a single
              register or missed WhatsApp message.
            </p>
            <div className="hero__actions">
              <Button as={Link} to="/register" variant="accent" size="lg">
                List a property
              </Button>
              <Button as={Link} to="/register" variant="outline" size="lg">
                Find a room
              </Button>
            </div>
            <div className="hero__stats">
              <div><strong>{rooms.length || '—'}</strong><span>rooms listed</span></div>
              <div><strong>24×7</strong><span>rent tracking</span></div>
              <div><strong>0</strong><span>paper registers</span></div>
            </div>
          </div>
          <div className="hero__panel" aria-hidden="true">
            <div className="hero__tag">
              <div className="hero__tag-hole" />
              <p className="mono hero__tag-id">RM-102</p>
              <p className="hero__tag-title">Shared Double, Palasia</p>
              <p className="hero__tag-rent mono">₹4,200<span>/mo</span></p>
              <div className="hero__tag-status">Rent due in 3 days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem framing */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Why this exists</p>
          <h2>The traditional rental process breaks down on both sides.</h2>
          <div className="problem-grid">
            {PROBLEM_ROWS.map((row, i) => (
              <div className="problem-row" key={i}>
                <span className="problem-row__role">{row.role}</span>
                <p>{row.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room search */}
      <section className="section section--rooms">
        <div className="container">
          <p className="eyebrow">Live listings</p>
          <h2>Search rooms by location, type and budget.</h2>

          <div className="search-bar">
            <Input
              placeholder="Location, e.g. Vijay Nagar"
              value={filters.location}
              onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            />
            <Select
              value={filters.type}
              onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
            >
              <option value="Any">Any room type</option>
              <option value="Single">Single</option>
              <option value="Double sharing">Double sharing</option>
              <option value="1BHK">1BHK</option>
            </Select>
            <Input
              type="number"
              placeholder="Max rent (₹)"
              value={filters.maxRent}
              onChange={(e) => setFilters((f) => ({ ...f, maxRent: e.target.value }))}
            />
          </div>

          {loading ? (
            <p className="ink-soft">Loading rooms…</p>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} actionLabel="Enquire" onAction={() => {}} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">What's inside</p>
          <h2>Everything a rental needs, in one place.</h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Ready to move off paper registers?</h2>
            <p>Create a free account as a tenant or landlord — takes under two minutes.</p>
          </div>
          <Button as={Link} to="/register" variant="accent" size="lg">
            Create your account
          </Button>
        </div>
      </section>
    </div>
  )
}
