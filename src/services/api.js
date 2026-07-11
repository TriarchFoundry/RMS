/**
 * Mock service layer.
 *
 * This project is the FRONTEND only. Every function below is written the
 * shape of a real API call (async, returns a Promise) so it is a drop-in
 * swap for real endpoints once a Node/Express + MySQL backend exists, e.g.:
 *
 *   export async function listRooms(filters) {
 *     const res = await fetch(`/api/rooms?${new URLSearchParams(filters)}`)
 *     return res.json()
 *   }
 *
 * Data currently lives in browser localStorage so the demo persists
 * across reloads without a server.
 */

const DB_KEY = 'basera_db_v1'

const seedData = {
  rooms: [
    {
      id: 'RM-101',
      landlordId: 'LL-1',
      title: 'Sunlit Single Near Vijay Nagar',
      type: 'Single',
      location: 'Vijay Nagar, Indore',
      rent: 6500,
      status: 'Available',
      description: 'Quiet single-occupancy room, attached bath, 24x7 water supply, 5 min from tech park.',
    },
    {
      id: 'RM-102',
      landlordId: 'LL-1',
      title: 'Shared Double, Palasia',
      type: 'Double sharing',
      location: 'Palasia, Indore',
      rent: 4200,
      status: 'Occupied',
      description: 'Furnished double-sharing room with balcony, close to bus stand.',
    },
    {
      id: 'RM-103',
      landlordId: 'LL-2',
      title: '1BHK Independent Floor',
      type: '1BHK',
      location: 'Sudama Nagar, Indore',
      rent: 9800,
      status: 'Available',
      description: 'Independent 1BHK with kitchen, ideal for a small family or working couple.',
    },
    {
      id: 'RM-104',
      landlordId: 'LL-2',
      title: 'Budget Single, Student Friendly',
      type: 'Single',
      location: 'Bhanwarkuan, Indore',
      rent: 3800,
      status: 'Available',
      description: 'Compact single room near college campus, common kitchen, Wi-Fi included.',
    },
  ],
  payments: [
    { id: 'PAY-1001', tenantId: 'T-1', roomId: 'RM-102', amount: 4200, date: '2026-06-05', method: 'UPI', status: 'Paid' },
    { id: 'PAY-1002', tenantId: 'T-1', roomId: 'RM-102', amount: 4200, date: '2026-07-05', method: 'UPI', status: 'Pending' },
  ],
  maintenanceRequests: [
    { id: 'MR-501', tenantId: 'T-1', roomId: 'RM-102', issue: 'Kitchen tap leaking', status: 'Pending', date: '2026-07-02' },
    { id: 'MR-502', tenantId: 'T-1', roomId: 'RM-102', issue: 'Wi-Fi router not working', status: 'Resolved', date: '2026-06-20' },
  ],
  documents: [
    { id: 'DOC-1', tenantId: 'T-1', type: 'Aadhaar Card', fileName: 'aadhaar_copy.pdf', uploadDate: '2026-05-10' },
  ],
}

function readDb() {
  const raw = window.localStorage.getItem(DB_KEY)
  if (!raw) {
    window.localStorage.setItem(DB_KEY, JSON.stringify(seedData))
    return structuredClone(seedData)
  }
  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.setItem(DB_KEY, JSON.stringify(seedData))
    return structuredClone(seedData)
  }
}

function writeDb(db) {
  window.localStorage.setItem(DB_KEY, JSON.stringify(db))
}

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* ---------------- Rooms ---------------- */

export async function listRooms(filters = {}) {
  await delay()
  const db = readDb()
  return db.rooms.filter((room) => {
    const matchesLocation = filters.location
      ? room.location.toLowerCase().includes(filters.location.toLowerCase())
      : true
    const matchesBudget = filters.maxRent ? room.rent <= Number(filters.maxRent) : true
    const matchesType = filters.type && filters.type !== 'Any' ? room.type === filters.type : true
    return matchesLocation && matchesBudget && matchesType
  })
}

export async function listRoomsByLandlord(landlordId) {
  await delay()
  const db = readDb()
  return db.rooms.filter((r) => r.landlordId === landlordId)
}

export async function addRoom(room) {
  await delay()
  const db = readDb()
  const newRoom = { ...room, id: `RM-${Math.floor(100 + Math.random() * 900)}`, status: 'Available' }
  db.rooms.unshift(newRoom)
  writeDb(db)
  return newRoom
}

export async function updateRoomStatus(roomId, status) {
  await delay()
  const db = readDb()
  db.rooms = db.rooms.map((r) => (r.id === roomId ? { ...r, status } : r))
  writeDb(db)
  return db.rooms.find((r) => r.id === roomId)
}

/* ---------------- Payments ---------------- */

export async function listPaymentsByTenant(tenantId) {
  await delay()
  const db = readDb()
  return db.payments.filter((p) => p.tenantId === tenantId)
}

export async function recordPayment(payment) {
  await delay()
  const db = readDb()
  const newPayment = {
    ...payment,
    id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().slice(0, 10),
    status: 'Paid',
  }
  db.payments.unshift(newPayment)
  writeDb(db)
  return newPayment
}

/* ---------------- Maintenance ---------------- */

export async function listMaintenanceByTenant(tenantId) {
  await delay()
  const db = readDb()
  return db.maintenanceRequests.filter((m) => m.tenantId === tenantId)
}

export async function submitMaintenanceRequest(request) {
  await delay()
  const db = readDb()
  const newRequest = {
    ...request,
    id: `MR-${Math.floor(500 + Math.random() * 500)}`,
    status: 'Pending',
    date: new Date().toISOString().slice(0, 10),
  }
  db.maintenanceRequests.unshift(newRequest)
  writeDb(db)
  return newRequest
}

export async function updateMaintenanceStatus(requestId, status) {
  await delay()
  const db = readDb()
  db.maintenanceRequests = db.maintenanceRequests.map((m) =>
    m.id === requestId ? { ...m, status } : m
  )
  writeDb(db)
  return db.maintenanceRequests.find((m) => m.id === requestId)
}

/* ---------------- Documents ---------------- */

export async function listDocumentsByTenant(tenantId) {
  await delay()
  const db = readDb()
  return db.documents.filter((d) => d.tenantId === tenantId)
}

export async function uploadDocument(doc) {
  await delay()
  const db = readDb()
  const newDoc = {
    ...doc,
    id: `DOC-${Math.floor(1 + Math.random() * 900)}`,
    uploadDate: new Date().toISOString().slice(0, 10),
  }
  db.documents.unshift(newDoc)
  writeDb(db)
  return newDoc
}
