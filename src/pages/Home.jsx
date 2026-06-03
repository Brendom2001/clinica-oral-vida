import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Dentist"],
  "name": "Clínica Oral Vida",
  "description": "Odontologia completa em São Paulo — implantes, ortodontia, clareamento e muito mais.",
  "url": "https://oralvida.com.br",
  "telephone": "+55-11-99999-9999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1234 — Sala 56",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01310-100",
    "addressCountry": "BR"
  },
  "openingHours": ["Mo-Fr 08:00-20:00", "Sa 08:00-14:00"],
  "priceRange": "$$"
}

const diferenciais = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Ambiente Seguro',
    desc: 'Protocolos rigorosos de esterilização e biossegurança para sua tranquilidade.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Atendimento Ágil',
    desc: 'Agendamento online e respeito ao seu tempo — sem filas, sem esperas desnecessárias.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Equipe Especializada',
    desc: '12 profissionais com pós-graduação e atualização constante nas melhores técnicas.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    title: 'Tecnologia Avançada',
    desc: 'Equipamentos de última geração: radiografia digital, scanner intraoral e laser.'
  }
]

const servicos = [
  { title: 'Implantes Dentários', desc: 'Recupere sua mastigação e sorriso com implantes de titânio de alta durabilidade.', color: 'from-[#1B4F72] to-[#2E6B99]' },
  { title: 'Ortodontia', desc: 'Aparelhos tradicionais e alinhadores transparentes para um sorriso alinhado.', color: 'from-[#C9A84C] to-[#D9B96A]' },
  { title: 'Clareamento', desc: 'Procedimento seguro e eficaz para dentes até 8 tons mais claros.', color: 'from-[#153D5A] to-[#1B4F72]' },
  { title: 'Dentística', desc: 'Restaurações, facetas e lentes de contato para um resultado natural e duradouro.', color: 'from-[#2E6B99] to-[#1B4F72]' }
]

const depoimentos = [
  {
    nome: 'Ana Carolina M.',
    texto: 'Fiz meus implantes na Oral Vida e a experiência foi incrível. Equipe super atenciosa, resultado perfeito. Recomendo sem hesitar!',
    estrelas: 5,
    servico: 'Implantes'
  },
  {
    nome: 'Ricardo S.',
    texto: 'Depois de anos com medo de dentista, encontrei na Oral Vida um ambiente acolhedor. Fiz meu clareamento e fiquei encantado com o resultado.',
    estrelas: 5,
    servico: 'Clareamento'
  },
  {
    nome: 'Juliana P.',
    texto: 'Trouxe minha filha para ortopedia e a doutora foi maravilhosa. Estrutura impecável, atendimento humanizado. Nossa família virou paciente fiel.',
    estrelas: 5,
    servico: 'Odontopediatria'
  }
]

const numeros = [
  { valor: 15, sufixo: ' anos', label: 'de experiência' },
  { valor: 8000, sufixo: '+', label: 'pacientes atendidos' },
  { valor: 12, sufixo: '', label: 'especialistas' },
  { valor: 98, sufixo: '%', label: 'de satisfação' }
]

function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])
  return count
}

function Counter({ valor, sufixo, label }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const count = useCounter(valor, inView)
  return (
    <div ref={ref} className="text-center">
      <div className="font-playfair text-5xl font-bold text-white leading-none mb-1">
        {count.toLocaleString('pt-BR')}{sufixo}
      </div>
      <p className="font-dm text-sm tracking-wide opacity-70 text-white">{label}</p>
    </div>
  )
}

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

export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%'])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden grain-overlay"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0d2d42 0%, #1B4F72 50%, #153D5A 100%)',
            }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'var(--gold)' }} />
          <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'white' }} />
          {/* Diagonal lines pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-dm text-sm tracking-[0.2em] uppercase mb-4 font-medium"
              style={{ color: 'var(--gold)' }}
            >
              Odontologia Completa em São Paulo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="font-playfair text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              Seu sorriso<br />
              <em className="not-italic" style={{ color: 'var(--gold)' }}>começa aqui.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-dm text-lg md:text-xl text-white/75 max-w-lg leading-relaxed mb-10"
            >
              Mais de 15 anos transformando vidas com odontologia de alto padrão,
              tecnologia moderna e cuidado verdadeiramente humano.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-dm font-semibold text-ocean tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: 'var(--gold)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Agendar pelo WhatsApp
              </a>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-dm font-semibold text-white tracking-wide border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Ver Serviços
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 55 1440 50V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
              Por que nos escolher
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              Por que a Oral Vida?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((d, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(27,79,114,0.15)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="p-8 rounded-2xl bg-white border group cursor-default"
                  style={{ borderColor: 'rgba(27,79,114,0.1)' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-ocean"
                    style={{ background: 'var(--bg-alt)', color: 'var(--ocean)' }}
                  >
                    <div className="group-hover:text-white transition-colors">{d.icon}</div>
                  </div>
                  <h3 className="font-playfair text-lg font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                    {d.title}
                  </h3>
                  <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {d.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW SERVIÇOS */}
      <section className="py-24" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
                O que oferecemos
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
                Nossos Serviços
              </h2>
            </div>
            <Link
              to="/servicos"
              className="font-dm text-sm font-semibold flex items-center gap-2 group"
              style={{ color: 'var(--ocean)' }}
            >
              Ver todos os serviços
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicos.map((s, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(27,79,114,0.15)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="relative p-8 rounded-2xl overflow-hidden cursor-default group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300`} />
                  <div className="absolute inset-0 rounded-2xl border" style={{ borderColor: 'rgba(27,79,114,0.12)' }} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center" style={{ background: 'var(--ocean)', opacity: 0.15 }} />
                    <h3 className="font-playfair text-xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                      {s.title}
                    </h3>
                    <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                      {s.desc}
                    </p>
                    <Link
                      to="/servicos"
                      className="font-dm text-xs font-semibold tracking-wide uppercase flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: 'var(--ocean)' }}
                    >
                      Saiba mais →
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
              O que dizem nossos pacientes
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              Depoimentos
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {depoimentos.map((d, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(27,79,114,0.12)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="p-8 rounded-2xl h-full flex flex-col"
                  style={{ background: 'var(--bg-alt)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(d.estrelas)].map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-dm text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-muted)' }}>
                    "{d.texto}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold font-playfair"
                      style={{ background: 'linear-gradient(135deg, var(--ocean), var(--ocean-light))' }}
                    >
                      {d.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-dm text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                        {d.nome}
                      </p>
                      <p className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>
                        Paciente — {d.servico}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--ocean)' }}>
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {numeros.map((n, i) => (
              <Counter key={i} {...n} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--gold)' }}>
              Dê o primeiro passo
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
              Pronto para transformar<br />seu sorriso?
            </h2>
            <p className="font-dm text-lg leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
              Agende sua avaliação gratuita e descubra como podemos cuidar do seu sorriso com dedicação e excelência.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-dm font-semibold tracking-wide text-lg transition-all hover:shadow-2xl hover:scale-105"
              style={{ background: 'var(--ocean)' }}
            >
              Agendar Avaliação Gratuita
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
