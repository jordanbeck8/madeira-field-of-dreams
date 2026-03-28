import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Mail, ChevronDown, ExternalLink, X, Trophy, Shield, Star, Award, Heart, ArrowRight, Menu, XIcon } from "lucide-react";

const IMG1 = "/images/slide1.jpg";
const IMG2 = "/images/slide2.jpg";
const IMG3 = "/images/slide3.jpg";
const IMG4 = "/images/slide4.jpg";
const IMG5 = "/images/slide5.jpg";
const IMG6 = "/images/slide6.jpg";
const IMG7 = "/images/slide7.jpg";
const IMG8 = "/images/slide8.jpg";

const GALLERY = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7, IMG8];
const GALLERY_ALT = [
  "Madeira batter at the plate",
  "Turfed infield at Sellman Park",
  "Rendering of new dugouts and backstop",
  "Why this matters - team on field",
  "Superintendent Matsudo and community",
  "Giving ladder and how to help",
  "Fundraising target $500,000",
  "Together - the Madeira Baseball team"
];

const TIERS = [
  { name: "Madeira Champion", amount: "$100,000+", desc: "Your generous support will significantly enhance the player experience, providing a top-tier playing environment for every athlete.", icon: Trophy },
  { name: "Golden Glove", amount: "$50,000 – $99,999", desc: "Your donation will help create an updated functional dugout, ensuring the field remains safe and accessible for year-round use.", icon: Shield },
  { name: "Grand Slam", amount: "$10,000 – $49,999", desc: "Every dollar you donate helps foster teamwork and builds pride within our Madeira baseball community.", icon: Star },
  { name: "Stang Supporter", amount: "$1,000 – $9,999", desc: "Every dollar you donate helps foster teamwork and builds pride within our Madeira baseball community.", icon: Award },
  { name: "Friends of Madeira Baseball", amount: "Up to $999", desc: "Every dollar you donate helps foster teamwork and builds pride within our Madeira baseball community.", icon: Heart },
];

const NAV_ITEMS = [
  { label: "About", href: "about" },
  { label: "The Project", href: "phase" },
  { label: "Why It Matters", href: "why" },
  { label: "Giving Ladder", href: "giving" },
  { label: "Gallery", href: "gallery" },
  { label: "Contact", href: "contact" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, light }) {
  return (
    <div style={{
      fontFamily: "var(--fb)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      fontSize: "0.75rem",
      color: light ? "rgba(255,255,255,0.5)" : "#B8922E",
      marginBottom: "0.6rem",
    }}>{children}</div>
  );
}

function SectionHeading({ children, light }) {
  return (
    <h2 style={{
      fontFamily: "var(--fd)",
      fontWeight: 900,
      fontSize: "clamp(1.8rem, 4vw, 3rem)",
      lineHeight: 1.1,
      color: light ? "#fff" : "#1B2A4A",
      marginBottom: "1.2rem",
    }}>{children}</h2>
  );
}

function DonateButton({ style = {} }) {
  return (
    <a href="https://madeiraschoolsfoundation.org/index.php/ways-to-give/" target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      background: "#D4A843", color: "#111D33", padding: "0.9rem 2.2rem",
      fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase",
      letterSpacing: "0.1em", textDecoration: "none", borderRadius: 2,
      transition: "all 0.3s", fontFamily: "var(--fb)",
      ...style,
    }}>Support the Project <ExternalLink size={16} /></a>
  );
}

export default function MadeiraFieldOfDreams() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim() || !emailRe.test(email.trim()) || !message.trim()) {
      alert("Please fill in all required fields with valid information.");
      return;
    }
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "contact",
        name: name.trim(),
        email: email.trim(),
        subject: formState.subject,
        message: message.trim(),
      }).toString(),
    })
      .then(() => setFormSent(true))
      .catch(() => alert("Something went wrong. Please try again."));
  };

  return (
    <div style={{ fontFamily: "var(--fb)", color: "#1a1a1a", background: "#FAFAFA", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        :root { --fd: 'Playfair Display', Georgia, serif; --fb: 'DM Sans', -apple-system, sans-serif; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 76px; }
        body { overflow-x: hidden; }
        ::selection { background: #D4A843; color: #111D33; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(17,29,51,0.97)" : "rgba(27,42,74,0.92)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(212,168,67,0.3)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.25)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: 72 }}>
          <a onClick={() => scrollTo("about")} style={{ fontFamily: "var(--fd)", fontWeight: 900, color: "#D4A843", fontSize: "1.2rem", cursor: "pointer", textDecoration: "none" }}>
            Madeira <span style={{ color: "#fff", fontWeight: 400 }}>Field of Dreams</span>
          </a>
          <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }} className="desk-nav">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} onClick={() => scrollTo(item.href)} style={{
                color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.8rem",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                cursor: "pointer", transition: "color 0.2s",
              }} onMouseEnter={(e) => e.target.style.color = "#D4A843"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}>
                {item.label}
              </a>
            ))}
            <a href="https://madeiraschoolsfoundation.org/index.php/ways-to-give/" target="_blank" rel="noopener noreferrer" style={{
              background: "#D4A843", color: "#111D33", padding: "0.5rem 1.3rem",
              fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase",
              letterSpacing: "0.06em", textDecoration: "none", borderRadius: 2,
              transition: "all 0.2s",
            }}>Donate</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            display: "none", background: "none", border: "none", color: "#fff",
            cursor: "pointer", padding: 4,
          }} className="mob-btn">{mobileOpen ? <XIcon size={24}/> : <Menu size={24}/>}</button>
        </div>
        <style>{`
          @media(max-width:860px) {
            .desk-nav { display: none !important; }
            .mob-btn { display: block !important; }
          }
        `}</style>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(17,29,51,0.98)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} onClick={() => scrollTo(item.href)} style={{
              color: "#fff", textDecoration: "none", fontSize: "1.4rem",
              fontFamily: "var(--fd)", fontWeight: 700, cursor: "pointer",
            }}>{item.label}</a>
          ))}
          <a href="https://madeiraschoolsfoundation.org/index.php/ways-to-give/" target="_blank" rel="noopener noreferrer" style={{
            color: "#D4A843", fontSize: "1.4rem", fontFamily: "var(--fd)", fontWeight: 700, textDecoration: "none",
          }}>Donate</a>
        </div>
      )}

      {/* ABOUT / LANDING */}
      <section id="about" style={{ background: "#F2EDE4", padding: "calc(72px + 4rem) 1.5rem 5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>About the Project</SectionLabel>
            <SectionHeading>Building the <em style={{ color: "#B8922E", fontStyle: "italic" }}>Future</em></SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem" }}>
              The recent installation of the turfed infield at Sellman Park marks a significant milestone for Madeira Baseball. It enhances safety, provides consistent play, and ensures increased games and year-round access for our dedicated athletes.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.75, marginBottom: "2rem" }}>
              Now, we're ready for the next phase. This is a family-driven fundraising effort presented by Madeira Families — because when our baseball families come together, incredible things happen.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}><div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, color: "#1B2A4A", marginBottom: "0.5rem" }}>$500,000</div><div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#B8922E", marginBottom: "1.5rem" }}>Our Fundraising Target</div>
              <DonateButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHASE */}
      <section id="phase" style={{ background: "#FAFAFA", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>The Next Phase</SectionLabel>
            <SectionHeading>Dugouts & <em style={{ color: "#B8922E", fontStyle: "italic" }}>Backstop Fencing</em></SectionHeading>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "2rem", marginTop: "1rem" }}>
            {[
              { title: "New Dugouts", items: ["Safer, more functional space for players", "Improved protection from weather and foul balls", "Organized storage and professional game-day environment"], img: IMG3 },
              { title: "Backstop Fencing", items: ["Enhanced spectator safety and sightlines", "Better containment of foul balls and wild pitches", "Completes a cohesive, high-quality facility"], img: IMG5 },
            ].map((card, ci) => (
              <Reveal key={ci} delay={ci * 0.15}>
                <div style={{
                  background: "#fff", borderRadius: 8, overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid #eee",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.06)"; }}>
                  <div style={{ height: 4, background: "linear-gradient(90deg, #D4A843, #F0D078)" }} />
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontFamily: "var(--fd)", fontSize: "1.5rem", fontWeight: 700, color: "#1B2A4A", marginBottom: "1.2rem" }}>{card.title}</h3>
                    {card.items.map((item, ii) => (
                      <div key={ii} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                        <div style={{ width: 6, height: 6, background: "#D4A843", borderRadius: 1, transform: "rotate(45deg)", marginTop: 8, flexShrink: 0 }} />
                        <span style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <img src={card.img} alt={card.title} style={{ width: "100%", display: "block" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" style={{ background: "#D4A843", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "3rem", alignItems: "center" }}>
            <Reveal>
              <SectionLabel>Why This Matters</SectionLabel>
              <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1, color: "#111D33", marginBottom: "1.2rem" }}>
                More Than <em style={{ fontStyle: "italic" }}>a Field</em>
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#1B2A4A", lineHeight: 1.75, marginBottom: "1rem" }}>
                High-quality facilities communicate something powerful to our student-athletes: You matter. Your work matters. Your program matters.
              </p>
              <p style={{ fontSize: "1.1rem", color: "#1B2A4A", lineHeight: 1.75 }}>
                Sellman Park is more than a field — it is a gathering place where memories are made, players learn the values of teamwork, perseverance, and pride… and dreams of being in the MLB come true.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <img src={IMG4} alt="Team on the field" style={{ width: "100%", borderRadius: 8, boxShadow: "-8px 8px 0 #111D33" }} />
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div style={{
              background: "#111D33", borderRadius: 8, padding: "2.5rem", marginTop: "3rem", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -8, left: 16, fontFamily: "var(--fd)", fontSize: "5rem", color: "#D4A843", opacity: 0.3, lineHeight: 1 }}>"</div>
              <blockquote style={{
                fontFamily: "var(--fd)", fontStyle: "italic", fontSize: "1.05rem",
                lineHeight: 1.75, color: "rgba(255,255,255,0.9)", position: "relative", zIndex: 1,
              }}>
                Sellman Park has always been more than a baseball field. It's a place where family memories are made and values are passed down. Long before turf and fencing, my dad lovingly cared for this field as 'The Grassman,' taking pride in every blade and every line. This project honors that same spirit of care and commitment, ensuring that today's players and families experience a field that reflects the pride, tradition, and future of Madeira Baseball.
              </blockquote>
              <cite style={{
                display: "block", marginTop: "1.2rem", fontStyle: "normal",
                fontFamily: "var(--fb)", fontWeight: 700, fontSize: "0.9rem", color: "#D4A843",
              }}>Kenji Matsudo, Superintendent — Madeira City Schools</cite>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GIVING */}
      <section id="giving" style={{ background: "#111D33", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel light>How You Can Help</SectionLabel>
            <SectionHeading light>Family-Friendly <em style={{ color: "#D4A843", fontStyle: "italic" }}>Giving Ladder</em></SectionHeading>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              Giving levels are suggested, not required. Every gift matters.
            </p>
          </Reveal>
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {TIERS.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,67,0.12)",
                    borderLeft: "3px solid #D4A843",
                    borderRadius: 6, padding: "1.4rem 1.8rem",
                    display: "flex", alignItems: "center", gap: "1.5rem",
                    transition: "all 0.3s", cursor: "default",
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(212,168,67,0.08)";
                    e.currentTarget.style.borderColor = "#D4A843";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.12)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}>
                    <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: "rgba(212,168,67,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} color="#D4A843" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                        <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "1.15rem", color: "#FFFFFF" }}>{tier.name}</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#D4A843", textTransform: "uppercase", letterSpacing: "0.04em" }}>{tier.amount}</span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.55, margin: 0 }}>{tier.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section id="gallery" style={{ background: "#F2EDE4", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Gallery</SectionLabel>
            <SectionHeading>The Vision & <em style={{ color: "#B8922E", fontStyle: "italic" }}>The Team</em></SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "0.6rem" }}>
              {GALLERY.map((src, i) => (
                <div key={i} onClick={() => setLightbox(i)} style={{
                  aspectRatio: "4/3", overflow: "hidden", cursor: "pointer",
                  borderRadius: 6, position: "relative",
                }}>
                  <img src={src} alt={GALLERY_ALT[i]} style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s",
                  }} onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                     onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.92)", display: "flex",
          alignItems: "center", justifyContent: "center", padding: "2rem",
        }}>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: "1.5rem", right: "2rem",
            background: "none", border: "none", color: "#fff",
            fontSize: "2rem", cursor: "pointer",
          }}><X size={32} /></button>
          <img src={GALLERY[lightbox]} alt={GALLERY_ALT[lightbox]} onClick={(e) => e.stopPropagation()} style={{
            maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 4,
          }} />
        </div>
      )}

      {/* STEERING COMMITTEE */}
      <section style={{ background: "#1B2A4A", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel light>Leadership</SectionLabel>
            <SectionHeading light>Field of Dreams <em style={{ color: "#D4A843", fontStyle: "italic" }}>Steering Committee</em></SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 500, margin: "1.5rem auto 0" }}>
              {[
                { name: "Travis Beck", email: "travisbeck8@gmail.com" },
                { name: "Dave Hyland", email: "dave_hyland@yahoo.com", phone: "(513) 600-1024" },
                { name: "Jennifer Cissell", email: "daxandjen@msn.com" },
              ].map((member, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,67,0.15)",
                  borderRadius: 6, padding: "1rem 1.4rem",
                }}>
                  <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>{member.name}</span>
                  <div style={{ textAlign: "right" }}>
                    <a href={"mailto:" + member.email} style={{ color: "#D4A843", fontSize: "0.85rem", textDecoration: "none", display: "block" }}>{member.email}</a>
                    {member.phone && <a href={"tel:" + member.phone.replace(/[^0-9+]/g, "")} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}>{member.phone}</a>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#FAFAFA", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "3rem" }}>
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionHeading>Contact <em style={{ color: "#B8922E", fontStyle: "italic" }}>Us</em></SectionHeading>
            <p style={{ color: "#555", marginBottom: "2rem", fontSize: "1rem", lineHeight: 1.7 }}>
              Have questions or inquiries about the project? Reach out to Dave Hyland and we'll get back to you.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <MapPin size={20} color="#B8922E" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#1B2A4A", fontSize: "0.9rem", display: "block" }}>Sellman Park</strong>
                <span style={{ color: "#666", fontSize: "0.9rem" }}>6700 Marin Avenue, Madeira, OH 45243</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <Mail size={20} color="#B8922E" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <strong style={{ color: "#1B2A4A", fontSize: "0.9rem", display: "block" }}>Email</strong>
                <span style={{ color: "#666", fontSize: "0.9rem" }}>dave_hyland@yahoo.com</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {formSent ? (
              <div style={{ background: "#1B6B3A", color: "#fff", padding: "2rem", borderRadius: 8, textAlign: "center", fontWeight: 600, fontSize: "1.1rem" }}>
                Thank you! Your message has been received.
              </div>
            ) : (
              <div>
                {[
                  { label: "Full Name *", type: "text", key: "name", max: 100 },
                  { label: "Email Address *", type: "email", key: "email", max: 200 },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1B2A4A", marginBottom: "0.35rem" }}>{f.label}</label>
                    <input type={f.type} value={formState[f.key]} onChange={(e) => setFormState({ ...formState, [f.key]: e.target.value })} maxLength={f.max}
                      style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid #E8E2D8", fontFamily: "var(--fb)", fontSize: "0.95rem", background: "#F2EDE4", outline: "none", borderRadius: 4, transition: "border-color 0.2s" }}
                      onFocus={(e) => e.target.style.borderColor = "#B8922E"} onBlur={(e) => e.target.style.borderColor = "#E8E2D8"} />
                  </div>
                ))}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1B2A4A", marginBottom: "0.35rem" }}>Subject</label>
                  <select value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid #E8E2D8", fontFamily: "var(--fb)", fontSize: "0.95rem", background: "#F2EDE4", outline: "none", borderRadius: 4 }}>
                    <option value="">Select a topic…</option>
                    <option value="donation">Donation Inquiry</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1B2A4A", marginBottom: "0.35rem" }}>Message *</label>
                  <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} maxLength={2000}
                    style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid #E8E2D8", fontFamily: "var(--fb)", fontSize: "0.95rem", background: "#F2EDE4", outline: "none", borderRadius: 4, minHeight: 120, resize: "vertical" }}
                    onFocus={(e) => e.target.style.borderColor = "#B8922E"} onBlur={(e) => e.target.style.borderColor = "#E8E2D8"} />
                </div>
                <button onClick={handleSubmit} style={{
                  background: "#1B2A4A", color: "#fff", border: "none", padding: "0.9rem 2rem",
                  fontFamily: "var(--fb)", fontSize: "0.9rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer",
                  borderRadius: 4, transition: "all 0.25s",
                }} onMouseEnter={(e) => { e.target.style.background = "#B8922E"; e.target.style.color = "#111D33"; }}
                   onMouseLeave={(e) => { e.target.style.background = "#1B2A4A"; e.target.style.color = "#fff"; }}>
                  Send Message
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* TOGETHER */}
      <section style={{ background: "#111D33", padding: "5rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,168,67,0.06) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 750, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15, color: "#fff", marginBottom: "1.2rem" }}>
              Together, We Can <em style={{ color: "#D4A843", fontStyle: "italic" }}>Finish What We Started</em>
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Madeira Baseball has always been powered by families who show up — early mornings, late nights, practices, games, and playoff runs. Whether your player is just beginning their journey or nearing graduation, your support helps ensure that future Mustangs compete in a facility that reflects the pride and excellence of our community.
            </p>
            <a href="https://madeiraschoolsfoundation.org/index.php/ways-to-give/" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#D4A843", color: "#111D33", padding: "1rem 2.5rem",
              fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase",
              letterSpacing: "0.1em", textDecoration: "none", borderRadius: 2,
              transition: "all 0.3s", fontFamily: "var(--fb)",
            }}>Make a Gift Today <ExternalLink size={16} /></a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1B2A4A", padding: "2.5rem 1.5rem", textAlign: "center", borderTop: "2px solid #D4A843" }}>
        <div style={{ fontFamily: "var(--fd)", fontWeight: 900, color: "#D4A843", fontSize: "1.15rem", marginBottom: "0.5rem" }}>Madeira Field of Dreams</div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Sellman Park · 6700 Marin Avenue · Madeira, OH 45243</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginBottom: "1rem" }}>© 2026 Madeira Schools. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          {[{l:"About",h:"about"},{l:"Giving Ladder",h:"giving"},{l:"Contact",h:"contact"}].map((item) => (
            <a key={item.h} onClick={() => scrollTo(item.h)} style={{
              color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.8rem",
              cursor: "pointer", transition: "color 0.2s",
            }} onMouseEnter={(e) => e.target.style.color = "#D4A843"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}>
              {item.l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}