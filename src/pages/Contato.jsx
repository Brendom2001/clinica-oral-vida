import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Dentist"],
  "name": "Clínica Oral Vida",
  "telephone": "+55-11-99999-9999",
  "email": "contato@oralvida.com.br",
  "url": "https://oralvida.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1234 — Sala 56",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01310-100",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "14:00" }
  ]
}

const servicos = [
  'Dentística', 'Implantes Dentários', 'Ortodontia', 'Endodontia',
  'Periodontia', 'Odontopediatria', 'Clareamento Dental', 'Próteses Dentárias', 'Outro'
]

const infos = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Endereço',
    value: 'Av. Paulista, 1234 — Sala 56\nBela Vista, São Paulo — SP\nCEP: 01310-100'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.54 3.38 2 2 0 0 1 3.54 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Telefone',
    value: '(11) 99999-9999\n(11) 3456-7890'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'E-mail',
    value: 'contato@oralvida.com.br'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Horários',
    value: 'Segunda a Sexta: 8h às 20h\nSábado: 8h às 14h\nDomingo: Fechado'
  }
]

function ScrollReveal({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Contato() {
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', servico: '', mensagem: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border font-dm text-sm outline-none transition-all focus:border-ocean focus:ring-2 focus:ring-ocean/10 bg-white"
  const inputStyle = { borderColor: 'rgba(27,79,114,0.2)', color: 'var(--text-main)' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--ocean)' }}>
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave2" width="80" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 20 Q 20 0 40 20 Q 60 40 80 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave2)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Fale conosco
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Agende sua consulta
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 30C360 60 720 0 1080 30C1260 45 1380 42 1440 40V60H0V30Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Formulário */}
            <ScrollReveal>
              <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
                Envie uma mensagem
              </p>
              <h2 className="font-playfair text-3xl font-bold mb-8" style={{ color: 'var(--text-main)' }}>
                Entre em Contato
              </h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl text-center"
                  style={{ background: 'rgba(27,79,114,0.06)', border: '1px solid rgba(27,79,114,0.15)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--ocean)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: 'var(--ocean)' }}>
                    Mensagem enviada!
                  </h3>
                  <p className="font-dm text-sm" style={{ color: 'var(--text-muted)' }}>
                    Entraremos em contato em até 24h. Para retorno imediato, nos chame no WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full text-white text-sm font-dm font-semibold"
                    style={{ background: '#25D366' }}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Abrir WhatsApp
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-dm text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="font-dm text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        required
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-dm text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="font-dm text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      Serviço de interesse
                    </label>
                    <select
                      name="servico"
                      value={form.servico}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, appearance: 'none' }}
                    >
                      <option value="">Selecione um serviço</option>
                      {servicos.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-dm text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      Mensagem
                    </label>
                    <textarea
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Como podemos te ajudar?"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl text-white font-dm font-semibold tracking-wide transition-all hover:shadow-xl"
                    style={{ background: 'var(--ocean)' }}
                  >
                    Enviar Mensagem
                  </motion.button>
                </form>
              )}
            </ScrollReveal>

            {/* Informações */}
            <ScrollReveal delay={0.15}>
              <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
                Localização e contato
              </p>
              <h2 className="font-playfair text-3xl font-bold mb-8" style={{ color: 'var(--text-main)' }}>
                Informações
              </h2>

              <div className="space-y-5 mb-8">
                {infos.map((info, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(27,79,114,0.08)', color: 'var(--ocean)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-dm text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                        {info.label}
                      </p>
                      <p className="font-dm text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-main)' }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mapa placeholder */}
              <div
                className="rounded-2xl overflow-hidden relative flex items-center justify-center mb-6"
                style={{ height: 200, background: 'linear-gradient(135deg, var(--bg-alt), #e8ecf0)' }}
              >
                <div className="text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2" style={{ color: 'var(--ocean)' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="rgba(27,79,114,0.15)" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" fill="currentColor" />
                  </svg>
                  <p className="font-dm text-sm font-medium" style={{ color: 'var(--ocean)' }}>
                    Av. Paulista, 1234
                  </p>
                  <p className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>
                    São Paulo — SP
                  </p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="font-dm text-xs px-2 py-1 rounded-full" style={{ background: 'white', color: 'var(--text-muted)', border: '1px solid rgba(27,79,114,0.1)' }}>
                    Visualização de mapa
                  </span>
                </div>
              </div>

              {/* Redes sociais */}
              <div className="flex gap-3">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-dm font-semibold flex-1 justify-center transition-all hover:scale-105"
                  style={{ background: '#25D366' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-dm font-semibold flex-1 justify-center transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
