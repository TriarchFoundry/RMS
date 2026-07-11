import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../../components/Forms/FormField'
import { Input } from '../../components/Forms/Input'
import Button from '../../components/Buttons/Button'
import { useAuth } from '../../context/AuthContext'
import '../Login/Auth.css'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('tenant')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in your name, email and password.')
      return
    }
    login({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role,
      id: role === 'tenant' ? 'T-1' : 'LL-1',
    })
    navigate('/dashboard')
  }

  return (
    <div className="container auth-page">
      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Create your account</p>
        <h1>Join Basera</h1>
        <p className="auth-card__sub">Tell us who you are so we can set up the right dashboard.</p>

        {error && <p className="field__error">{error}</p>}

        <div className="role-toggle">
          <button type="button" className={role === 'tenant' ? 'is-active' : ''} onClick={() => setRole('tenant')}>
            I'm a tenant
          </button>
          <button type="button" className={role === 'landlord' ? 'is-active' : ''} onClick={() => setRole('landlord')}>
            I'm a landlord
          </button>
        </div>

        <FormField label="Full name" htmlFor="name" required>
          <Input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
        </FormField>

        <FormField label="Email address" htmlFor="email" required>
          <Input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
        </FormField>

        <FormField label="Phone number" htmlFor="phone">
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91" />
        </FormField>

        <FormField label="Password" htmlFor="password" required>
          <Input id="password" type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" />
        </FormField>

        <Button type="submit" variant="primary" className="btn--full" size="lg">
          Create account
        </Button>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}
