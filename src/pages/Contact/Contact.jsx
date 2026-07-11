import { useState } from 'react'
import FormField from '../../components/Forms/FormField'
import { Input, Textarea } from '../../components/Forms/Input'
import Button from '../../components/Buttons/Button'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // No backend wired up yet — this simply confirms receipt in the UI.
    setSent(true)
  }

  return (
    <div className="container section contact-page">
      <div className="contact-page__intro">
        <p className="eyebrow">Get in touch</p>
        <h1>Questions about listing a room or renting one?</h1>
        <p>Reach the Basera team directly, or send a message and we'll follow up by email.</p>
        <ul className="contact-details">
          <li><strong>Email</strong><span>support@basera.app</span></li>
          <li><strong>Phone</strong><span>+91 98765 43210</span></li>
          <li><strong>Office</strong><span>Aditya College of Technology & Science, Satna, MP</span></li>
        </ul>
      </div>

      <form className="form-card contact-form" onSubmit={handleSubmit}>
        {sent ? (
          <div className="contact-form__success">
            <h3>Message received</h3>
            <p>Thanks, {form.name || 'there'} — we'll get back to you at {form.email} shortly.</p>
            <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
          </div>
        ) : (
          <>
            <FormField label="Full name" htmlFor="name" required>
              <Input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
            </FormField>
            <FormField label="Email address" htmlFor="email" required>
              <Input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
            </FormField>
            <FormField label="Message" htmlFor="message" required>
              <Textarea id="message" required value={form.message} onChange={(e) => update('message', e.target.value)} />
            </FormField>
            <Button type="submit" variant="primary" className="btn--full">Send message</Button>
          </>
        )}
      </form>
    </div>
  )
}
