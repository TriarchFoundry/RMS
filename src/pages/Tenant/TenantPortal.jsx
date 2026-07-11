import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import RoomCard from '../../components/Cards/RoomCard'
import { Input, Select } from '../../components/Forms/Input'
import { EmptyState } from '../../components/Common/Loader'
import { Loader } from '../../components/Common/Loader'
import { listRooms } from '../../services/api'
import './Tenant.css'

export default function TenantPortal() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ location: '', maxRent: '', type: 'Any' })
  const [applied, setApplied] = useState([])

  useEffect(() => {
    let active = true
    setLoading(true)
    listRooms(filters).then((data) => {
      if (active) {
        setRooms(data)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [filters])

  function handleApply(room) {
    setApplied((prev) => (prev.includes(room.id) ? prev : [...prev, room.id]))
  }

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <p className="eyebrow">Find a room</p>
        <h1>Search available rooms</h1>
        <p>Filter by location, room type and monthly budget.</p>

        <div className="search-bar">
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          />
          <Select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
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
          <Loader label="Fetching rooms…" />
        ) : rooms.length === 0 ? (
          <EmptyState title="No rooms match those filters" description="Try widening your budget or clearing the location filter." />
        ) : (
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                actionLabel={applied.includes(room.id) ? 'Applied ✓' : 'Apply now'}
                onAction={room.status === 'Available' ? handleApply : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
