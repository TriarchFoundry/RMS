import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FormField from '../../components/Forms/FormField'
import { Input, Select } from '../../components/Forms/Input'
import Button from '../../components/Buttons/Button'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '', role: 'tenant' })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Enter your email and password to continue.')
      return
    }
    // Demo auth: any email/password combination signs the user in with
    // the selected role. Swap this for a real POST /api/login call later.
    login({
      name: form.email.split('@')[0].replace(/[._]/g, ' '),
      email: form.email,
      role: form.role,
      id: form.role === 'tenant' ? 'T-1' : 'LL-1',
    })
    navigate(location.state?.from || '/dashboard')
  }

  return (
    <div className="container auth-page">
      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Basera</h1>
        <p className="auth-card__sub">Access your rooms, rent history and maintenance requests.</p>

        {error && <p className="field__error">{error}</p>}

        <FormField label="I am a" htmlFor="role">
          <Select id="role" value={form.role} onChange={(e) => update('role', e.target.value)}>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </Select>
        </FormField>

        <FormField label="Email address" htmlFor="email" required>
          <Input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
        </FormField>

        <FormField label="Password" htmlFor="password" required>
          <Input id="password" type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" />
        </FormField>

        <Button type="submit" variant="primary" className="btn--full" size="lg">
          Log in
        </Button>

        <p className="auth-card__footer">
          New to Basera? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  )
}
