import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Boxes, Check, CircuitBoard, Factory, FileCheck2, HardHat, LocateFixed, Mail, MapPin, Menu, Network, Phone, Send, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const divisions = [
  {
    index: 'DIGITAL',
    title: 'IT, Cyber & Network Systems',
    description: 'The digital backbone for resilient, connected operations — from systems integration and cybersecurity to recovery and proactive support.',
    icon: Network,
    href: '/services#technology',
  },
  {
    index: 'INDUSTRIAL',
    title: 'Engineering & Operational Technology',
    description: 'Bridging the physical and digital with Industrial Control Systems, SCADA, infrastructure optimisation and technical consulting.',
    icon: Factory,
    href: '/services#engineering',
  },
  {
    index: 'DELIVERY',
    title: 'Project Management & Supply Chain',
    description: 'Clear accountability from concept to commissioning, with strategic procurement, logistics and lifecycle management built in.',
    icon: Boxes,
    href: '/services#delivery',
  },
];

const serviceGroups = [
  {
    id: 'technology',
    title: 'Technology & Digital Infrastructure',
    description: 'Make every system speak the same language. We design the connective tissue that keeps your people, platforms and critical assets moving.',
    icon: Network,
    services: [
      ['Systems Integration', 'ERP, CRM and SCADA integration that removes silos.'],
      ['Cybersecurity & Data Recovery', 'Assessments, threat protection, compliance and backup.'],
      ['Networking & Telecommunications', 'Robust network design and unified voice/data infrastructure.'],
      ['IT Support & Repair', 'Rapid diagnostics and infrastructure support for continuity.'],
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering & Operational Technology',
    description: 'Operational excellence begins where engineering judgement meets live data. We help industrial environments become more visible, maintainable and ready for what is next.',
    icon: CircuitBoard,
    services: [
      ['Operational Technology (OT)', 'Industrial Control Systems and advanced SCADA solutions.'],
      ['Technical & Engineering Services', 'Infrastructure optimisation, maintenance planning and technical consulting.'],
    ],
  },
  {
    id: 'delivery',
    title: 'Project Management & Logistics',
    description: 'Complex programmes need one accountable line through the middle. We bring structure, visibility and momentum from first brief to handover.',
    icon: FileCheck2,
    services: [
      ['Project Management & Consulting', 'Reliable delivery using PMBOK and PRINCE2 methodologies.'],
      ['Supply Chain & Procurement', 'Vendor management, strategic procurement and logistics optimisation.'],
    ],
  },
  {
    id: 'capacity',
    title: 'Capacity Building',
    description: 'The most durable infrastructure is carried by capable people. We invest in knowledge transfer that keeps value in the teams and communities we serve.',
    icon: HardHat,
    services: [
      ['Training & Skills Development', 'Technical training and capacity-building initiatives for your workforce.'],
    ],
  },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

function Brand() {
  return (
    <span className="brand" data-testid="brand-okla">
      <img src="/oklalogo%20(2).jfif" alt="OKLA 1ST GEN K Systems & Projects" className="brand-image" />
    </span>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isActive = (path: string) => path === '/' ? location === '/' : location.startsWith(path);
  const isDarkPage = location !== '/' && !scrolled;
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${isDarkPage ? 'on-dark' : ''}`}>
      <div className="site-container header-row">
        <Link href="/" onClick={() => setOpen(false)} data-testid="link-brand-home"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} data-testid="link-nav-home">Home</Link>
          <Link href="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} data-testid="link-nav-services">Capabilities</Link>
          <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} data-testid="link-nav-about">Our story</Link>
          <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} data-testid="link-nav-contact">Contact</Link>
        </nav>
        <a className="header-contact" href="tel:+27812897112" data-testid="link-header-phone"><Phone size={14} /> 081 289 7112</a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        <Link href="/" className="nav-link" onClick={() => setOpen(false)} data-testid="link-mobile-home">Home</Link>
        <Link href="/services" className="nav-link" onClick={() => setOpen(false)} data-testid="link-mobile-services">Capabilities</Link>
        <Link href="/about" className="nav-link" onClick={() => setOpen(false)} data-testid="link-mobile-about">Our story</Link>
        <Link href="/contact" className="btn btn-dark" onClick={() => setOpen(false)} data-testid="link-mobile-contact">Start a conversation <ArrowUpRight size={15} /></Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" data-testid="link-footer-brand"><Brand /></Link>
            <p>Engineering clarity into the systems that keep South Africa moving.</p>
          </div>
          <div className="footer-col">
            <h3>Explore</h3>
            <Link href="/services" data-testid="link-footer-services">Capabilities</Link>
            <Link href="/about" data-testid="link-footer-about">Our story</Link>
            <Link href="/contact" data-testid="link-footer-contact">Contact team</Link>
          </div>
          <div className="footer-col">
            <h3>Connect</h3>
            <a href="tel:+27812897112" data-testid="link-footer-phone">081 289 7112</a>
            <a href="mailto:info@oklasystems.co.za" data-testid="link-footer-email">info@oklasystems.co.za</a>
          </div>
          <div className="footer-col">
            <h3>On the ground</h3>
            <a href="/contact#locations" data-testid="link-footer-locations">Gauteng / KwaZulu-Natal</a>
            <a href="/contact#locations" data-testid="link-footer-address">South Africa</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OKLA 1ST GEN K Systems & Projects (Pty) Ltd.</span>
          <span>Built for meaningful transformation.</span>
        </div>
      </div>
    </footer>
  );
}

function SignalCard() {
  return (
    <div className="signal-card" data-testid="card-systems-signal">
      <div className="signal-head"><span>OKLA / SYSTEMS VIEW</span><span className="signal-status">LIVE FRAME</span></div>
      <div className="signal-map" aria-hidden="true"><span className="signal-line" /></div>
      <div className="signal-stats">
        <div className="signal-stat"><strong>04</strong><span>capability areas</span></div>
        <div className="signal-stat"><strong>01</strong><span>accountable partner</span></div>
      </div>
      <div className="signal-cta">
        <p>End-to-end systems integration</p>
        <Link href="/services" className="btn btn-orange btn-sm">Explore <ArrowUpRight size={12} /></Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-tech-bg" />
          <div className="site-container hero-layout">
            <div>
              <Reveal><div className="eyebrow">South Africa / Systems & projects</div></Reveal>
              <Reveal delay="delay-1"><h1 className="display">Integrated systems for a <em>smarter future.</em></h1></Reveal>
              <Reveal delay="delay-2"><p className="hero-copy">Delivering scalable, reliable and innovative systems across South Africa. From industrial operational technology to enterprise IT and project management, we build the infrastructure that drives your business forward.</p></Reveal>
              <Reveal delay="delay-3"><div className="hero-actions"><Link href="/services" className="btn btn-orange" data-testid="button-explore-capabilities">Explore our capabilities <ArrowRight size={16} /></Link><Link href="/contact" className="btn btn-ghost" data-testid="button-contact-team">Contact our team <ArrowUpRight size={15} /></Link></div></Reveal>
              <div className="hero-note"><i /> <span>Engineering the link between ambition and action</span></div>
            </div>
            <Reveal className="delay-2"><SignalCard /></Reveal>
          </div>
        </section>

        <div className="marquee"><div className="marquee-track"><span>ENGINEERING CLARITY</span><b>/</b><span>INDUSTRIAL INTELLIGENCE</span><b>/</b><span>MEANINGFUL TRANSFORMATION</span><b>/</b><span>ENGINEERING CLARITY</span><b>/</b><span>INDUSTRIAL INTELLIGENCE</span><b>/</b><span>MEANINGFUL TRANSFORMATION</span><b>/</b></div></div>

        <section className="section">
          <div className="site-container">
            <Reveal><div className="section-heading"><div><div className="eyebrow">Our core divisions</div><h2 className="display">One partner.<br /><em>Every layer.</em></h2></div><p>Complex infrastructure is easier to trust when the people, platforms and projects are designed to work as one.</p></div></Reveal>
            <div className="division-grid">
              {divisions.map((division, index) => {
                const Icon = division.icon;
                return <Reveal key={division.index} className={`delay-${index + 1}`}><Link href={division.href} className="division-card" data-testid={`card-division-${index + 1}`}><span className="division-index">{division.index}</span><Icon className="division-icon" size={29} strokeWidth={1.4} /><h3>{division.title}</h3><p>{division.description}</p><span className="division-link">View capability <ArrowUpRight size={13} /></span></Link></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="site-container trust-grid">
            <Reveal><div className="trust-intro"><div className="eyebrow">The OKLA difference</div><h2 className="display">Built to hold<br /><em>the whole picture.</em></h2><p>We bring the rigour of engineering, the precision of technology and the discipline of delivery to one table — then keep the conversation clear.</p></div></Reveal>
            <div className="trust-list">
              {[
                ['End-to-end delivery', 'From concept and procurement to commissioning and maintenance, we handle the entire project lifecycle.'],
                ['Deep industry expertise', 'Seasoned engineers, consultants and project managers bring proven methodologies to every challenge.'],
                ['Empowerment focused', 'We build more than systems. Skills development and South African transformation are part of the brief.'],
              ].map(([title, text], index) => <Reveal key={title} delay={`delay-${index + 1}`}><div className="trust-item" data-testid={`item-trust-${index + 1}`}><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <Reveal><div className="section-heading"><div><div className="eyebrow">Trusted across industries</div><h2 className="display">Proven results.<br /><em>Real impact.</em></h2></div><p>Our track record speaks for itself. We deliver measurable outcomes that transform operations and drive sustainable growth.</p></div></Reveal>
            <div className="metrics-grid">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '15+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '24/7', label: 'Support Available' },
              ].map((metric, index) => <Reveal key={index} delay={`delay-${index + 1}`}><div className="metric-card" data-testid={`metric-${index}`}><strong className="metric-value">{metric.value}</strong><span className="metric-label">{metric.label}</span></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="site-container">
            <Reveal><div className="section-heading"><div><div className="eyebrow">Meet The Team</div><h2 className="display">The people behind<br /><em>the systems.</em></h2></div><p>Our team brings together decades of experience in engineering, technology and project management — all focused on delivering results that matter.</p></div></Reveal>
            <div className="team-grid">
              {[
                { name: 'Thomas Dlamini', role: 'The Director', image: '/Thomas%20Dlamini%20_The%20Director.jfif' },
                { name: 'Musa Dlamini', role: 'Project Manager', image: '/Musa%20Dlamini%20Project%20Manager%20(2).jfif' },
                { name: 'Anathi Cetyana', role: 'Accounts Manager', image: '/Anathi%20Cetyana%20Accounts%20Manager.jfif' },
                { name: 'Lwazi Mdhlala', role: 'Training and Development', image: '/Lwazi%20Mdhlala%20%20Training%20and%20development.jfif' },
              ].map((member, index) => <Reveal key={index} delay={`delay-${index + 1}`}><div className="team-card" data-testid={`card-team-${index}`}><div className="team-image-wrapper"><img src={member.image} alt={member.name} className="team-image" /></div><h3>{member.name}</h3><p>{member.role}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section section-sand">
          <div className="site-container">
            <Reveal><div className="section-heading"><div><div className="eyebrow">A clearer route forward</div><h2 className="display">Make complexity<br /><em>move.</em></h2></div><p>Whether you are securing critical assets, modernising a plant or launching a major programme, the first step is a useful conversation.</p></div></Reveal>
            <Reveal delay="delay-1"><Link href="/contact" className="btn btn-dark" data-testid="button-home-enquire">Start an enquiry <ArrowUpRight size={15} /></Link></Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return <section className="page-hero"><div className="site-container"><Reveal><div className="eyebrow">{eyebrow}</div><h1 className="display">{title}</h1><p>{children}</p></Reveal></div></section>;
}

function Services() {
  return (
    <main className="services-hero">
      <PageHero eyebrow="Capabilities / 04 areas" title={<>Comprehensive solutions<br /><em>across industries.</em></>}>Whether you need to secure your digital assets, integrate complex industrial controls or manage a large-scale engineering project, OKLA has the expertise to deliver.</PageHero>
      <section className="section">
        <div className="site-container">
          {serviceGroups.map((group, index) => {
            return <Reveal key={group.id} delay={index ? `delay-${Math.min(index, 3)}` : ''}><article id={group.id} className="capability" data-testid={`section-service-${group.id}`}><h2>{group.title}</h2><div className="cap-detail"><p>{group.description}</p><div className="detail-list">{group.services.map(([name, detail]) => <div key={name}><Check size={14} /> <span><strong>{name}</strong> — {detail}</span></div>)}</div></div></article></Reveal>;
          })}
        </div>
      </section>
      <section className="section section-dark">
        <div className="site-container method">
          <Reveal><div className="method-intro"><div className="eyebrow">How we deliver</div><h2 className="display">Method is<br /><em>momentum.</em></h2><p>Good work is not a hand-off. It is a disciplined line from the first question to the outcome that lasts.</p></div></Reveal>
          <div className="method-list">
            {[['Understand the system', 'We start with context: your operating environment, constraints, people and the outcome that matters.'], ['Design the connection', 'Our teams map the technical, commercial and delivery path before the work begins.'], ['Deliver with visibility', 'Clear milestones, accountable ownership and communication that keeps decisions moving.'], ['Leave capability behind', 'The result is yours to operate — with knowledge transfer, training and support built in.']].map(([title, text], index) => <Reveal key={title} delay={`delay-${Math.min(index + 1, 3)}`}><div className="method-row" data-testid={`row-method-${index}`}><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}
          </div>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="about-hero">
      <PageHero eyebrow="About OKLA / Our authority" title={<>Building the future<br /><em>of South African industry.</em></>}>We operate at the intersection of a rapidly evolving technological and industrial landscape — delivering the systems that help South African businesses move with confidence.</PageHero>
      <section className="section">
        <div className="site-container about-layout">
          <Reveal><div><div className="eyebrow">Our story</div><h2 className="display">Practical ambition.<br /><em>Lasting impact.</em></h2><p>OKLA 1ST GEN K Systems and Projects is dedicated to delivering innovative, reliable and scalable solutions that empower South African businesses. Our work goes beyond infrastructure — we are deeply committed to fostering skills development, community impact and economic transformation.</p><div className="vision-block"><h3>Our vision</h3><p>To be the leading provider of integrated systems and project solutions in Southern Africa, recognised for excellence in engineering, innovation and sustainable development.</p></div></div></Reveal>
          <Reveal delay="delay-2"><div><div className="quote">“We make complex infrastructure feel clear, dependable and forward-looking.”</div><div className="vision-block"><h3>Our mission</h3><p>To deliver high-quality, cost-effective and innovative solutions with professionalism and integrity — empowering communities and driving transformation across South Africa.</p></div></div></Reveal>
        </div>
      </section>
      <section className="section values-section">
        <div className="site-container">
          <Reveal><div className="section-heading"><div><div className="eyebrow">The OKLA commitment</div><h2 className="display">Progress is<br /><em>people-shaped.</em></h2></div><p>Transformation is not an appendix to the work. It is part of how we measure whether the work was worth doing.</p></div></Reveal>
          <div className="values-grid">
            {[
              { title: 'Employment equity & SA transformation', text: 'Driving meaningful change in South Africa’s economic landscape.' },
              { title: 'Diversity & inclusion', text: 'Fostering a workplace that reflects the diverse communities we serve.' },
              { title: 'Skills development', text: 'Continually investing in learning to build a highly skilled, empowered workforce.' },
              { title: 'Equal opportunity', text: 'Ensuring fair access to opportunity and merit-based growth for all.' },
            ].map((item, index) => <Reveal key={index} delay={`delay-${Math.min(index + 1, 3)}`}><div className="value" data-testid={`card-value-${index}`}><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="site-container timeline">
          <Reveal><div><div className="eyebrow">A standard we keep</div><h2 className="display">Dependable<br /><em>by design.</em></h2><p>Our approach holds the technical detail and the human outcome in the same frame. That is how infrastructure becomes progress you can feel.</p></div></Reveal>
          <div className="timeline-lines">{[['ENGINEERING', 'Rigour that respects the realities of the field.'], ['INNOVATION', 'Better ways of working, grounded in what is possible now.'], ['INTEGRITY', 'Professionalism and transparency at every decision point.'], ['IMPACT', 'A stronger business, a stronger workforce, a stronger South Africa.']].map(([name, text], index) => <Reveal key={name} delay={`delay-${Math.min(index + 1, 3)}`}><div className="timeline-line" data-testid={`row-principle-${index + 1}`}><p><strong>{name}</strong><br />{text}</p></div></Reveal>)}</div>
        </div>
      </section>
    </main>
  );
}

type FormValues = { name: string; email: string; phone: string; subject: string; message: string };
function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues({ ...values, [field]: event.target.value });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<FormValues> = {};
    if (!values.name.trim()) next.name = 'Please add your full name.';
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Please add a contact number.';
    if (!values.message.trim() || values.message.trim().length < 12) next.message = 'Tell us a little more about the work.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };
  return (
    <main>
      <PageHero eyebrow="Contact / Let’s get to work" title={<>Let’s build something<br /><em>great together.</em></>}>Ready to optimise your infrastructure or launch your next big project? Reach out to our team today. A useful first conversation is closer than you think.</PageHero>
      <section className="section">
        <div className="site-container contact-layout">
          <Reveal><div className="contact-intro"><div className="eyebrow">Make contact</div><h2 className="display">Put the right<br /><em>people in the room.</em></h2><p>Tell us what you are working towards. We will come back with the right questions, the right expertise and a clear next step.</p><div className="contact-details"><div className="contact-detail"><Phone size={19} /><div><small>Call the team</small><a href="tel:+27812897112" data-testid="link-contact-phone">081 289 7112</a></div></div><div className="contact-detail"><Mail size={19} /><div><small>Write to us</small><a href="mailto:info@oklasystems.co.za" data-testid="link-contact-email">info@oklasystems.co.za</a></div></div></div></div></Reveal>
          <Reveal delay="delay-2"><div className="contact-form-wrap">{submitted ? <div className="success-state" data-testid="status-form-success"><div><div className="success-icon"><Check size={25} /></div><h2>Enquiry received.</h2><p>Thank you, {values.name.split(' ')[0] || 'there'}. Our team will review the brief and be in touch soon.</p><a className="btn btn-orange" href="mailto:info@oklasystems.co.za" data-testid="link-success-email">Open your email client <Send size={14} /></a></div></div> : <><div className="form-header"><h2>Start with the brief.</h2></div><form onSubmit={submit} noValidate data-testid="form-contact"><div className="form-grid"><div className="field"><label htmlFor="contact-name">Full name</label><input id="contact-name" value={values.name} onChange={update('name')} placeholder="Your name" data-testid="input-contact-name" />{errors.name && <span className="error-text">{errors.name}</span>}</div><div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" type="email" value={values.email} onChange={update('email')} placeholder="you@company.co.za" data-testid="input-contact-email" />{errors.email && <span className="error-text">{errors.email}</span>}</div><div className="field"><label htmlFor="contact-phone">Phone</label><input id="contact-phone" type="tel" value={values.phone} onChange={update('phone')} placeholder="081 289 7112" data-testid="input-contact-phone" />{errors.phone && <span className="error-text">{errors.phone}</span>}</div><div className="field"><label htmlFor="contact-subject">What can we help with?</label><input id="contact-subject" value={values.subject} onChange={update('subject')} placeholder="A project, a system, a challenge" data-testid="input-contact-subject" /></div><div className="field full"><label htmlFor="contact-message-long">Message</label><textarea id="contact-message-long" value={values.message} onChange={update('message')} placeholder="Give us the useful context..." data-testid="textarea-contact-message" />{errors.message && <span className="error-text">{errors.message}</span>}</div></div><div className="form-actions"><span className="form-note">We keep your details private and only use them to respond to your enquiry.</span><button className="btn btn-orange" type="submit" data-testid="button-submit-contact">Send enquiry <ArrowRight size={15} /></button></div></form></>}</div></Reveal>
        </div>
        <div className="site-container locations" id="locations">
          <Reveal><div className="eyebrow">Our locations</div><div className="location-grid"><div className="location" data-testid="location-gauteng"><MapPin size={18} color="hsl(18 92% 53%)" /><h3>Head Office / Gauteng</h3><p>524 Seemi Street, Mabuya Park<br />1475, South Africa</p></div><div className="location" data-testid="location-kwazulu-natal"><LocateFixed size={18} color="hsl(18 92% 53%)" /><h3>Branch Office / KwaZulu-Natal</h3><p>Tally HD Building, Unit 7<br />38 Union Street, Empangeni, 3880</p></div></div></Reveal>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return <main className="page-hero" style={{ minHeight: '70vh' }}><div className="site-container"><div className="eyebrow">404 / Signal lost</div><h1 className="display">This route<br /><em>doesn’t exist.</em></h1><p>The page you’re looking for may have moved. Let’s get you back to solid ground.</p><Link href="/" className="btn btn-orange" data-testid="button-back-home">Back to home <ArrowRight size={15} /></Link></div></main>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route component={NotFoundPage} /></Switch>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Header /><Router /><Footer /></WouterRouter>;
}

export default App;