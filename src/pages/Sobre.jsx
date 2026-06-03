import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Clínica Oral Vida",
  "foundingDate": "2009",
  "description": "Clínica odontológica fundada em 2009, referência em São Paulo em odontologia completa.",
  "url": "https://oralvida.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1234",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "addressCountry": "BR"
  }
}

const timeline = [
  { ano: '2009', titulo: 'Fundação', desc: 'A Oral Vida abre suas portas na Av. Paulista com 3 consultórios e uma visão clara: democratizar a odontologia de qualidade.' },
  { ano: '2012', titulo: 'Expansão', desc: 'Ampliação para 8 consultórios e introdução da radiografia digital panorâmica.' },
  { ano: '2015', titulo: 'Reconhecimento', desc: 'Certificação ISO e reconhecimento como uma das 10 melhores clínicas odontológicas de SP.' },
  { ano: '2018', titulo: 'Inovação', desc: 'Implantação do scanner intraoral 3D e planejamento digital de implantes com guia cirúrgico.' },
  { ano: '2021', titulo: 'Digitalização', desc: 'Lançamento do app de agendamento e prontuário digital integrado para todos os pacientes.' },
  { ano: '2025', titulo: 'Referência', desc: 'Mais de 8.000 pacientes atendidos, 12 especialistas e 98% de satisfação — seguimos crescendo.' },
]

const valores = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titulo: 'Missão',
    texto: 'Proporcionar tratamentos odontológicos de excelência com humanização, ética e tecnologia avançada, melhorando a qualidade de vida dos nossos pacientes.'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    titulo: 'Visão',
    texto: 'Ser reconhecida como a clínica odontológica mais confiável e inovadora de São Paulo, referência em qualidade e satisfação do paciente.'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    titulo: 'Valores',
    texto: 'Excelência técnica, humanização no atendimento, ética profissional, inovação constante e compromisso com o bem-estar do paciente.'
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

function TimelineItem({ ano, titulo, desc, index }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (isLeft ? -40 : 40) }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      className={`flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-playfair font-bold text-xs shrink-0 z-10"
          style={{ background: 'var(--ocean)' }}
        >
          {ano}
        </div>
        {index < timeline.length - 1 && (
          <div className="w-[2px] flex-1 min-h-[60px] mt-2" style={{ background: 'rgba(27,79,114,0.15)' }} />
        )}
      </div>
      <div className={`pb-8 pt-2 ${isLeft ? '' : ''}`}>
        <h3 className="font-playfair text-xl font-bold mb-2" style={{ color: 'var(--ocean)' }}>
          {titulo}
        </h3>
        <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Sobre() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero da página */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: 'var(--ocean)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Nossa história
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Cuidado que vai<br />além do sorriso
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 30C360 60 720 0 1080 30C1260 45 1380 42 1440 40V60H0V30Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* História */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--gold)' }}>
                Desde 2009
              </p>
              <h2 className="font-playfair text-4xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
                Uma história de dedicação e excelência
              </h2>
              <div className="space-y-4 font-dm text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  A Clínica Oral Vida nasceu em 2009 do sonho da Dra. Camila Ferreira — a convicção de que atendimento odontológico de alta qualidade deveria ser acessível e, sobretudo, humano.
                </p>
                <p>
                  Com 3 consultórios no coração da Av. Paulista, iniciamos nossa jornada com um compromisso inabalável: cada paciente é único, cada sorriso tem sua história.
                </p>
                <p>
                  Hoje, somos uma equipe de 12 especialistas com expertise em todas as áreas da odontologia moderna, utilizando tecnologia de ponta para resultados que transformam vidas.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--ocean) 0%, var(--ocean-light) 100%)' }}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-playfair text-2xl font-bold text-white mb-1">Av. Paulista, 1234</p>
                  <p className="font-dm text-sm text-white/60">São Paulo — SP</p>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)', opacity: 0.6 + i * 0.2 }} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-24" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              Nossos Princípios
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((v, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(27,79,114,0.15)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="bg-white p-8 rounded-2xl h-full"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(27,79,114,0.08)', color: 'var(--ocean)' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: 'var(--ocean)' }}>
                    {v.titulo}
                  </h3>
                  <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {v.texto}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
              Nossa trajetória
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              Linha do Tempo
            </h2>
          </ScrollReveal>
          <div>
            {timeline.map((item, i) => (
              <TimelineItem key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              Conheça nossa equipe
            </h2>
            <p className="font-dm text-base mb-8" style={{ color: 'var(--text-muted)' }}>
              Profissionais apaixonados por odontologia e pelo bem-estar dos seus pacientes.
            </p>
            <Link
              to="/equipe"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-dm font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'var(--ocean)' }}
            >
              Ver a Equipe
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
