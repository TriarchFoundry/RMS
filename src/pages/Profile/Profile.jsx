import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Badge from '../../components/Common/Badge'
import Button from '../../components/Buttons/Button'
import FormField from '../../components/Forms/FormField'
import { Input, Select } from '../../components/Forms/Input'
import { EmptyState, Loader } from '../../components/Common/Loader'
import { useAuth } from '../../context/AuthContext'
import { listDocumentsByTenant, uploadDocument } from '../../services/api'
import { formatDate, initials } from '../../utils/helpers'
import './Profile.css'

export default function Profile() {
  const { user } = useAuth()
  const isLandlord = user?.role === 'landlord'
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [docType, setDocType] = useState('Aadhaar Card')
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)

  async function refresh() {
    setLoading(true)
    const data = await listDocumentsByTenant(user.id)
    setDocs(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user && !isLandlord) refresh()
    else setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : '')
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!fileName) return
    setUploading(true)
    await uploadDocument({ tenantId: user.id, type: docType, fileName })
    setFileName('')
    setUploading(false)
    refresh()
  }

  return (
    <div className="container dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__content">
        <p className="eyebrow">Account</p>
        <h1>Your profile</h1>

        <div className="profile-card">
          <div className="profile-card__avatar">{initials(user?.name)}</div>
          <div>
            <p className="profile-card__name">{user?.name}</p>
            <p className="profile-card__email">{user?.email}</p>
            <Badge tone="neutral">{isLandlord ? 'Landlord' : 'Tenant'}</Badge>
          </div>
        </div>

        {!isLandlord && (
          <>
            <h2 className="profile-section-title">Identification documents</h2>
            <form className="form-card doc-form" onSubmit={handleUpload}>
              <div className="form-row">
                <FormField label="Document type" htmlFor="docType">
                  <Select id="docType" value={docType} onChange={(e) => setDocType(e.target.value)}>
                    <option>Aadhaar Card</option>
                    <option>PAN Card</option>
                    <option>Passport</option>
                    <option>Driving Licence</option>
                  </Select>
                </FormField>
                <FormField label="Upload file" htmlFor="file">
                  <Input id="file" type="file" onChange={handleFileChange} />
                </FormField>
              </div>
              <Button type="submit" variant="primary" disabled={!fileName || uploading}>
                {uploading ? 'Uploading…' : 'Upload document'}
              </Button>
            </form>

            {loading ? (
              <Loader label="Loading documents…" />
            ) : docs.length === 0 ? (
              <EmptyState title="No documents uploaded" description="Upload your ID proof so landlords can verify your application faster." />
            ) : (
              <ul className="doc-list">
                {docs.map((d) => (
                  <li key={d.id} className="doc-item">
                    <div>
                      <p className="doc-item__type">{d.type}</p>
                      <p className="doc-item__meta mono">{d.fileName} · uploaded {formatDate(d.uploadDate)}</p>
                    </div>
                    <Badge tone="success">Stored</Badge>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
