import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "Person", "position": 1, "name": "Dra. Camila Ferreira", "jobTitle": "Clínica Geral e Dentística", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Person", "position": 2, "name": "Dr. Rafael Mendes", "jobTitle": "Implantodontia", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Person", "position": 3, "name": "Dra. Letícia Costa", "jobTitle": "Ortodontia", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Person", "position": 4, "name": "Dr. Bruno Almeida", "jobTitle": "Endodontia", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Person", "position": 5, "name": "Dra. Natália Souza", "jobTitle": "Odontopediatria", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Person", "position": 6, "name": "Dr. Henrique Lima", "jobTitle": "Periodontia e Implantes", "worksFor": { "@type": "Dentist", "name": "Clínica Oral Vida" } }
  ]
}

const equipe = [
  {
    nome: 'Dra. Camila Ferreira',
    especialidade: 'Clínica Geral e Dentística',
    cro: 'CRO-SP 45.231',
    bio: 'Fundadora da Oral Vida. Formada pela USP com especialização em dentística restauradora pela APCD. 16 anos de experiência transformando sorrisos.',
    cor: 'from-[#1B4F72] to-[#2E6B99]',
    inicial: 'C',
  },
  {
    nome: 'Dr. Rafael Mendes',
    especialidade: 'Implantodontia',
    cro: 'CRO-SP 58.774',
    bio: 'Especialista em implantes com mais de 2.000 procedimentos realizados. Formação complementar no Bredent Institute, Alemanha.',
    cor: 'from-[#C9A84C] to-[#D9B96A]',
    inicial: 'R',
  },
  {
    nome: 'Dra. Letícia Costa',
    especialidade: 'Ortodontia',
    cro: 'CRO-SP 62.109',
    bio: 'Especialista em ortodontia e ortopedia facial. Provider certificada Invisalign Platinum. Pós-graduação pela UNICAMP.',
    cor: 'from-[#153D5A] to-[#1B4F72]',
    inicial: 'L',
  },
  {
    nome: 'Dr. Bruno Almeida',
    especialidade: 'Endodontia',
    cro: 'CRO-SP 71.445',
    bio: 'Mestre em endodontia pela FOUSP. Especialista em casos complexos de retratamento e cirurgia endodôntica com microscopia.',
    cor: 'from-[#2E6B99] to-[#1B4F72]',
    inicial: 'B',
  },
  {
    nome: 'Dra. Natália Souza',
    especialidade: 'Odontopediatria',
    cro: 'CRO-SP 66.890',
    bio: 'Especialista em odontopediatria pelo Hospital das Clínicas. Referência em atendimento humanizado de crianças com necessidades especiais.',
    cor: 'from-[#1B4F72] to-[#C9A84C]',
    inicial: 'N',
  },
  {
    nome: 'Dr. Henrique Lima',
    especialidade: 'Periodontia e Implantes',
    cro: 'CRO-SP 53.218',
    bio: 'Especialista em periodontia com foco em regeneração óssea e cirurgias plásticas periodontais. Membro da SBPqO.',
    cor: 'from-[#C9A84C] to-[#153D5A]',
    inicial: 'H',
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

function ProfissionalCard({ p, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 + index * 0.08 }}
    >
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(27,79,114,0.15)' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="rounded-2xl overflow-hidden bg-white border h-full"
        style={{ borderColor: 'rgba(27,79,114,0.08)' }}
      >
        {/* Foto placeholder */}
        <div
          className={`relative h-52 flex items-center justify-center bg-gradient-to-br ${p.cor}`}
        >
          <span className="font-playfair text-6xl font-bold text-white/30">{p.inicial}</span>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[2px] rounded-full flex-1" style={{ background: 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-playfair text-xl font-bold mb-0.5" style={{ color: 'var(--text-main)' }}>
            {p.nome}
          </h3>
          <p className="font-dm text-sm font-semibold mb-1" style={{ color: 'var(--ocean)' }}>
            {p.especialidade}
          </p>
          <p className="font-dm text-xs mb-3" style={{ color: 'var(--gold)' }}>
            {p.cro}
          </p>
          <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {p.bio}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Equipe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--ocean)' }}>
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circles" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Nossos profissionais
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Especialistas<br />apaixonados pela sua saúde
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 30C360 60 720 0 1080 30C1260 45 1380 42 1440 40V60H0V30Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Grid equipe */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              Nossa Equipe
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipe.map((p, i) => (
              <ProfissionalCard key={i} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Faça parte */}
      <section className="py-24" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div
              className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{ background: 'var(--ocean)' }}
            >
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="stars" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="var(--gold)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#stars)" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--gold)' }}>
                  Carreiras
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                  Faça parte da nossa equipe
                </h2>
                <p className="font-dm text-base text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
                  Buscamos profissionais comprometidos com a excelência, o cuidado humano e a atualização constante. Se você compartilha nossos valores, queremos te conhecer.
                </p>
                <a
                  href="mailto:rh@oralvida.com.br"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-dm font-semibold tracking-wide text-ocean transition-all hover:scale-105 hover:shadow-xl"
                  style={{ background: 'var(--gold)' }}
                >
                  Enviar Currículo
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
