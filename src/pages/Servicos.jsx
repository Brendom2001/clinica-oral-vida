import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Serviços Odontológicos — Clínica Oral Vida",
  "itemListElement": [
    { "@type": "Service", "position": 1, "name": "Dentística", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 2, "name": "Implantes Dentários", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 3, "name": "Ortodontia", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 4, "name": "Endodontia", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 5, "name": "Periodontia", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 6, "name": "Odontopediatria", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 7, "name": "Clareamento Dental", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } },
    { "@type": "Service", "position": 8, "name": "Próteses Dentárias", "provider": { "@type": "Dentist", "name": "Clínica Oral Vida" } }
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Quanto tempo dura um implante?", "acceptedAnswer": { "@type": "Answer", "text": "Com cuidados adequados, implantes dentários podem durar a vida toda. A taxa de sucesso a longo prazo é superior a 95%." } },
    { "@type": "Question", "name": "O clareamento dental danifica o esmalte?", "acceptedAnswer": { "@type": "Answer", "text": "Não. Os produtos de clareamento aprovados são seguros e não danificam o esmalte quando utilizados corretamente sob supervisão profissional." } },
    { "@type": "Question", "name": "A partir de que idade meu filho deve visitar o dentista?", "acceptedAnswer": { "@type": "Answer", "text": "Recomendamos a primeira consulta ao surgir o primeiro dentinho, geralmente entre 6 e 12 meses de vida." } }
  ]
}

const servicos = [
  {
    nome: 'Dentística',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.5 2 6 5 6 8c0 5 3 8 6 14 3-6 6-9 6-14 0-3-2.5-6-6-6z" />
      </svg>
    ),
    curta: 'Restaurações, facetas e lentes de contato dental para um sorriso natural e duradouro.',
    longa: 'A dentística restauradora abrange desde simples restaurações de resina composta até facetas laminadas e lentes de contato dental. Utilizamos materiais de última geração com correspondência perfeita de cor para resultados imperceptíveis. Ideais para tratar cáries, fraturas, desgastes e insatisfação estética com o sorriso.'
  },
  {
    nome: 'Implantes Dentários',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="12" />
        <path d="M8 12h8l-1 8H9l-1-8z" />
        <path d="M9 20h6" />
      </svg>
    ),
    curta: 'Solução definitiva para dentes perdidos — função e estética de dente natural.',
    longa: 'Os implantes de titânio são a solução mais moderna para substituir dentes perdidos. Com planejamento digital em 3D e guias cirúrgicos, garantimos precisão milimétrica no procedimento. O resultado é uma raiz artificial que se integra ao osso, suportando coroas que parecem e funcionam como dentes naturais. Taxa de sucesso superior a 97%.'
  },
  {
    nome: 'Ortodontia',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="8" width="18" height="8" rx="3" />
        <path d="M7 12h10" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    curta: 'Aparelhos tradicionais e alinhadores transparentes para seu sorriso perfeito.',
    longa: 'Oferecemos aparelhos metálicos tradicionais, cerâmicos estéticos e alinhadores removíveis transparentes (Invisalign e similares). O tratamento ortodôntico corrige o alinhamento dentário e a mordida, melhorando a saúde bucal e a estética do sorriso. Consulta de avaliação gratuita com simulação digital do resultado final.'
  },
  {
    nome: 'Endodontia',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V12M12 12C12 7 8 4 8 4s2 4 4 8zM12 12C12 7 16 4 16 4s-2 4-4 8z" />
        <ellipse cx="12" cy="8" rx="4" ry="6" />
      </svg>
    ),
    curta: 'Tratamento de canal moderno e indolor — salve seu dente natural.',
    longa: 'O tratamento endodôntico (canal) elimina a infecção da polpa dental, preservando o dente natural. Com anestesia eficaz e instrumentação rotatória mecanizada, o procedimento é rápido, preciso e praticamente indolor. Também realizamos retratamentos e cirurgias parendodônticas para casos mais complexos.'
  },
  {
    nome: 'Periodontia',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21s3-3 9-3 9 3 9 3" />
        <path d="M12 18V6" />
        <path d="M8 10s2-3 4-3 4 3 4 3" />
      </svg>
    ),
    curta: 'Tratamento das gengivas e do osso de suporte para uma base saudável.',
    longa: 'A periodontia trata as doenças que afetam as estruturas de suporte dos dentes: gengiva, ligamento periodontal e osso alveolar. Desde gengivite simples até periodontite avançada com comprometimento ósseo. Realizamos raspagem, polimento, cirurgias de retalho e regeneração óssea guiada para devolver saúde à sua gengiva.'
  },
  {
    nome: 'Odontopediatria',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6" />
        <path d="M9 19l1 2h4l1-2" />
      </svg>
    ),
    curta: 'Cuidado odontológico especializado para bebês, crianças e adolescentes.',
    longa: 'Nossa equipe de odontopediatria cria um ambiente lúdico e acolhedor para que crianças tenham experiências positivas no consultório desde cedo. Tratamos desde bebês (odontologia do bebê) até adolescentes, com foco em prevenção, educação e quando necessário, restaurações com anestesia segura e técnicas de manejo comportamental comprovadas.'
  },
  {
    nome: 'Clareamento Dental',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    curta: 'Até 8 tons mais claro com segurança e resultado duradouro.',
    longa: 'Oferecemos clareamento dental de consultório (resultado imediato em 1h com LED/laser), clareamento caseiro com moldeiras personalizadas, e o protocolo combinado (consultório + casa) para resultados mais intensos e duradouros. Todos os produtos utilizados são aprovados e seguros para o esmalte quando aplicados sob supervisão profissional.'
  },
  {
    nome: 'Próteses Dentárias',
    icone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h16M4 18h7" />
        <path d="M15 15l2 2 4-4" />
      </svg>
    ),
    curta: 'Coroas, pontes e próteses totais com estética e funcionalidade superiores.',
    longa: 'Nossa equipe de prótese dental oferece coroas unitárias em cerâmica pura ou zircônia, pontes fixas, próteses parciais removíveis e próteses totais (dentaduras). Trabalhamos com laboratórios de alta precisão para garantir que cada prótese seja perfeitamente adaptada, confortável e esteticamente impecável. Também realizamos próteses sobre implantes.'
  }
]

const faqs = [
  { pergunta: 'Quanto tempo dura um implante dentário?', resposta: 'Com higiene adequada e consultas regulares de manutenção, os implantes podem durar toda a vida. A taxa de sucesso a longo prazo é superior a 97%. A chave é o acompanhamento profissional regular e cuidados domiciliares corretos.' },
  { pergunta: 'O clareamento dental danifica o esmalte?', resposta: 'Não, quando realizado com produtos aprovados e sob supervisão profissional. Pode haver sensibilidade temporária durante o tratamento, que desaparece em poucos dias. Evitamos produtos com concentração inadequada para sua situação específica.' },
  { pergunta: 'A partir de que idade meu filho deve ir ao dentista?', resposta: 'Recomendamos a primeira consulta quando o primeiro dentinho de leite surgir, geralmente entre 6 e 12 meses. A visita precoce estabelece hábitos saudáveis e permite acompanhar o desenvolvimento da dentição.' },
  { pergunta: 'Quanto tempo leva um tratamento ortodôntico?', resposta: 'A duração varia com a complexidade do caso. Em média, aparelhos fixos ficam entre 18 e 30 meses. Alinhadores podem ser mais rápidos em casos leves. Fazemos uma simulação digital gratuita na primeira consulta.' },
  { pergunta: 'O tratamento de canal (endodontia) dói?', resposta: 'Com anestesia adequada, o procedimento é indolor. A maioria dos pacientes relata que o tratamento é muito menos desconfortável do que imaginavam. A dor pré-tratamento (causada pela infecção) é geralmente muito maior que o procedimento em si.' }
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

function ServicoCard({ servico, index }) {
  const [expanded, setExpanded] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 + index * 0.07 }}
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: expanded ? 'var(--ocean)' : 'rgba(27,79,114,0.1)', transition: 'border-color 0.3s' }}
    >
      <button
        className="w-full text-left p-6 flex items-start gap-4 group"
        style={{ background: expanded ? 'rgba(27,79,114,0.04)' : 'white' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{
            background: expanded ? 'var(--ocean)' : 'var(--bg-alt)',
            color: expanded ? 'white' : 'var(--ocean)'
          }}
        >
          {servico.icone}
        </div>
        <div className="flex-1">
          <h3 className="font-playfair text-xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>
            {servico.nome}
          </h3>
          <p className="font-dm text-sm" style={{ color: 'var(--text-muted)' }}>
            {servico.curta}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 shrink-0"
          style={{ color: 'var(--ocean)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: 'rgba(27,79,114,0.1)' }}>
              <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {servico.longa}
              </p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-white text-sm font-dm font-semibold transition-all hover:scale-105"
                style={{ background: 'var(--ocean)' }}
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FaqItem({ pergunta, resposta, index }) {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 + index * 0.06 }}
      className="border-b"
      style={{ borderColor: 'rgba(27,79,114,0.1)' }}
    >
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-dm text-base font-medium" style={{ color: 'var(--text-main)' }}>
          {pergunta}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
          style={{ color: 'var(--ocean)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p className="font-dm text-sm leading-relaxed pb-5" style={{ color: 'var(--text-muted)' }}>
              {resposta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Servicos() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'var(--ocean)' }}>
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse">
                <polygon points="28,0 56,14 56,42 28,56 0,42 0,14" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Especialidades
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Soluções completas<br />para sua saúde bucal
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 30C360 60 720 0 1080 30C1260 45 1380 42 1440 40V60H0V30Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Grid de serviços */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>
              Nossos Serviços
            </h2>
            <p className="font-dm text-base" style={{ color: 'var(--text-muted)' }}>
              Clique em qualquer serviço para saber mais.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {servicos.map((s, i) => (
              <ServicoCard key={i} servico={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <p className="font-dm text-sm tracking-[0.2em] uppercase font-medium mb-3" style={{ color: 'var(--gold)' }}>
              Dúvidas frequentes
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              FAQ
            </h2>
          </ScrollReveal>
          <div>
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
