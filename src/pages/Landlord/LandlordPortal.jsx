import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import RoomCard from '../../components/Cards/RoomCard'
import FormField from '../../components/Forms/FormField'
import { Input, Select, Textarea } from '../../components/Forms/Input'
import Button from '../../components/Buttons/Button'
import { EmptyState, Loader } from '../../components/Common/Loader'
import { useAuth } from '../../context/AuthContext'
import { addRoom, listRoomsByLandlord, updateRoomStatus } from '../../services/api'
import './Landlord.css'

const EMPTY_FORM = { title: '', type: 'Single', location: '', rent: '', description: '' }

export default function LandlordPortal() {
  const { user } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  async function refresh() {
    setLoading(true)
    const data = await listRoomsByLandlord(user.id)
    setRooms(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await addRoom({ ...form, rent: Number(form.rent), landlordId: user.id })
    setForm(EMPTY_FORM)
    setShowForm(false)
    refresh()
  }

  async function toggleStatus(room) {
    const next = room.status === 'Available' ? 'Occupied' : 'Available'
    await updateRoomStatus(room.id, next)
    refresh()
  }

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <div className="landlord-header">
          <div>
            <p className="eyebrow">My properties</p>
            <h1>Manage your listed rooms</h1>
          </div>
          <Button variant="accent" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Cancel' : '+ Add a room'}
          </Button>
        </div>

        {showForm && (
          <form className="form-card landlord-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <FormField label="Room title" htmlFor="title" required>
                <Input id="title" required value={form.title} onChange={(e) => update('title', e.target.value)} />
              </FormField>
              <FormField label="Room type" htmlFor="type">
                <Select id="type" value={form.type} onChange={(e) => update('type', e.target.value)}>
                  <option>Single</option>
                  <option>Double sharing</option>
                  <option>1BHK</option>
                </Select>
              </FormField>
            </div>
            <div className="form-row">
              <FormField label="Location" htmlFor="location" required>
                <Input id="location" required value={form.location} onChange={(e) => update('location', e.target.value)} />
              </FormField>
              <FormField label="Monthly rent (₹)" htmlFor="rent" required>
                <Input id="rent" type="number" required value={form.rent} onChange={(e) => update('rent', e.target.value)} />
              </FormField>
            </div>
            <FormField label="Description" htmlFor="description">
              <Textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} />
            </FormField>
            <Button type="submit" variant="primary">Publish listing</Button>
          </form>
        )}

        {loading ? (
          <Loader label="Loading your properties…" />
        ) : rooms.length === 0 ? (
          <EmptyState
            title="No rooms listed yet"
            description="Add your first room so tenants can find and apply for it."
          />
        ) : (
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                actionLabel={room.status === 'Available' ? 'Mark occupied' : 'Mark available'}
                onAction={toggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
