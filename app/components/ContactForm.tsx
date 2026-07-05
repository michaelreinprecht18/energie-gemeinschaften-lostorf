'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', adresse: '', telefon: '', nachricht: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mojorpvo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          adresse: form.adresse || '–',
          telefon: form.telefon || '–',
          nachricht: form.nachricht,
        }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const label: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-nunito), system-ui, sans-serif',
    fontSize: 14,
    fontWeight: 600,
    color: '#1A1510',
    marginBottom: 6,
  }

  if (status === 'success') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '64px 24px',
        animation: 'fadeSlideUp 0.5s ease both',
      }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          background: '#E7F9E4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <CheckCircle size={40} color="#9DD295" />
        </div>
        <div style={{
          fontFamily: 'var(--font-baskerville), system-ui, sans-serif',
          fontWeight: 500, fontSize: 26, color: '#1A1510', marginBottom: 12,
        }}>
          Danke für deine Nachricht!
        </div>
        <div style={{
          fontFamily: 'var(--font-nunito), system-ui, sans-serif',
          fontSize: 16, color: '#5C5248', lineHeight: 1.7,
        }}>
          Deine Nachricht ist bei uns angekommen.<br />
          Wir melden uns so bald wie möglich bei dir.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
      <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Name *</label>
          <input
            required type="text" className="form-input"
            placeholder="Dein Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={label}>E-Mail *</label>
          <input
            required type="email" className="form-input"
            placeholder="deine@email.ch"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={label}>Adresse *</label>
        <input
          required type="text" className="form-input"
          placeholder="Strasse, PLZ Ort"
          value={form.adresse}
          onChange={e => setForm(f => ({ ...f, adresse: e.target.value }))}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={label}>Telefon <span style={{ fontWeight: 400, color: '#9A9089' }}>(optional)</span></label>
        <input
          type="tel" className="form-input"
          placeholder="+41 79 000 00 00"
          value={form.telefon}
          onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={label}>Deine Frage oder Nachricht *</label>
        <textarea
          required className="form-input"
          placeholder="Hast du eine Solaranlage? Möchtest du günstigeren lokalen Strom beziehen? Erzähl uns davon…"
          rows={5}
          value={form.nachricht}
          onChange={e => setForm(f => ({ ...f, nachricht: e.target.value }))}
          style={{ resize: 'vertical', minHeight: 120 }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary"
        style={{
          width: '100%',
          background: status === 'loading' ? '#B8D9B4' : '#9DD295',
          color: '#1A1510',
          border: 'none',
          borderRadius: 10,
          padding: '16px 32px',
          fontFamily: 'var(--font-nunito), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Send size={18} />
        {status === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>

      {status === 'error' && (
        <p style={{ marginTop: 12, fontSize: 14, color: '#C0392B', fontFamily: 'var(--font-nunito), system-ui, sans-serif', textAlign: 'center' }}>
          Etwas ist schiefgelaufen. Bitte versuche es nochmals oder schreib uns direkt an ai@reinprecht.ch.
        </p>
      )}

      <p style={{
        marginTop: 12, fontSize: 12,
        color: '#B8AFA8',
        fontFamily: 'var(--font-nunito), system-ui, sans-serif',
        textAlign: 'center',
      }}>
        * Pflichtfelder · Deine Daten werden ausschliesslich zur Beantwortung deiner Anfrage verwendet.
      </p>
    </form>
  )
}
