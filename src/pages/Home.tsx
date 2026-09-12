import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { motion } from "motion/react";

import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Menu,
  MoveRight,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const media = {
  arrivalDay: "/images/arrival-day.jpg",
  arrivalClose: "/images/arrival-close.jpg",
  arrivalGolden: "/images/arrival-golden.jpg",
  arrivalNight: "/images/arrival-night.jpg",
  arrival: "/images/arrival.jpg",
  lobby: "/images/lobby.jpg",
  suite: "/images/suite.jpg",
  pool: "/images/pool.jpg",
  dining: "/images/dining.jpg",
};

const navLinks = [
  { label: "Arrival", id: "arrival" },
  { label: "Residences", id: "stay" },
  { label: "Dining", id: "dining" },
  { label: "The Red Sea", id: "experiences" },
];

const atmosphereOptions = ["day", "golden", "night"] as const;
type Atmosphere = (typeof atmosphereOptions)[number];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atmosphere, setAtmosphere] = useState<Atmosphere>("golden");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>("#arrival");
      const heroImages = gsap.utils.toArray<HTMLImageElement>(
        ".hero__sequence-image"
      );

      if (hero && heroImages.length === 4) {
        const drift = [
          { x: 48.5, y: 49.2 },
          { x: 51.2, y: 50.8 },
          { x: 49.0, y: 50.6 },
          { x: 51.4, y: 49.3 },
        ];

        heroImages.forEach((image, index) => {
          gsap.to(image, {
            objectPosition: `${drift[index].x}% ${drift[index].y}%`,
            duration: 12 + index * 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            overwrite: false,
          });
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=2400",
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(heroImages[0], { scale: 1.018, yPercent: -1.2, duration: 1, ease: "none" })
          .fromTo(heroImages[1], { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "none" })
          .set(heroImages[0], { opacity: 0 })
          .to(heroImages[1], { scale: 1.018, xPercent: -0.6, duration: 0.8, ease: "none" })
          .fromTo(heroImages[2], { opacity: 0, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "none" })
          .set(heroImages[1], { opacity: 0 })
          .to(heroImages[2], { scale: 1.018, yPercent: -1.1, duration: 0.8, ease: "none" })
          .fromTo(heroImages[3], { opacity: 0, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "none" })
          .set(heroImages[2], { opacity: 0 })
          .to(heroImages[3], { scale: 1.02, yPercent: -0.8, duration: 1, ease: "none" });
      }

      const lobby = document.querySelector<HTMLElement>("#lobby");
      const lobbyImage = document.querySelector<HTMLElement>(".lobby-image");
      if (lobby && lobbyImage) {
        gsap.fromTo(lobby, { yPercent: 18, scale: 0.96, opacity: 0 }, {
          yPercent: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: lobby, start: "top 95%", end: "top 45%", scrub: 1 }
        });
        gsap.fromTo(lobbyImage, { scale: 1.08, clipPath: "inset(8% 8% 8% 8%)" }, {
          scale: 1, clipPath: "inset(0% 0% 0% 0%)", ease: "none",
          scrollTrigger: { trigger: lobby, start: "top 90%", end: "top 35%", scrub: 1.2 }
        });
      }

      const residences = document.querySelector<HTMLElement>("#stay");
      const residenceImage = document.querySelector<HTMLElement>(".residences__image");
      const residenceCopy = document.querySelector<HTMLElement>(".residences__copy");
      if (residences && residenceImage && residenceCopy) {
        gsap.fromTo(residenceImage, { xPercent: 24, scale: 1.06, opacity: 0 }, {
          xPercent: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: residences, start: "top 90%", end: "top 20%", scrub: 1.2 }
        });
        gsap.fromTo(residenceCopy, { xPercent: -14, opacity: 0 }, {
          xPercent: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: residences, start: "top 85%", end: "top 35%", scrub: 1 }
        });
      }

      const dining = document.querySelector<HTMLElement>("#dining");
      const diningArt = document.querySelector<HTMLElement>(".dining__art");
      const diningContent = document.querySelector<HTMLElement>(".dining__content");
      if (dining && diningArt && diningContent) {
        gsap.fromTo(diningArt, { xPercent: -22, scale: 1.08, opacity: 0 }, {
          xPercent: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: dining, start: "top 90%", end: "top 25%", scrub: 1.2 }
        });
        gsap.fromTo(diningContent, { xPercent: 16, opacity: 0 }, {
          xPercent: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: dining, start: "top 80%", end: "top 35%", scrub: 1 }
        });
      }

      const pool = document.querySelector<HTMLElement>("#pool");
      const poolImage = document.querySelector<HTMLElement>(".pool-section img");
      const poolContent = document.querySelector<HTMLElement>(".pool-section__content");
      if (pool && poolImage && poolContent) {
        gsap.fromTo(poolImage, { scale: 1.1, yPercent: 4 }, {
          scale: 1, yPercent: 0, ease: "none",
          scrollTrigger: { trigger: pool, start: "top bottom", end: "top top", scrub: 1.4 }
        });
        gsap.fromTo(poolContent, { yPercent: 24, opacity: 0, scale: 0.96 }, {
          yPercent: 0, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: { trigger: pool, start: "top 85%", end: "top 30%", scrub: 1.1 }
        });
      }

      const experiences = document.querySelector<HTMLElement>("#experiences");
      const experienceList = document.querySelector<HTMLElement>(".experiences__list");
      if (experiences && experienceList) {
        gsap.fromTo(experienceList, { xPercent: 20, opacity: 0 }, {
          xPercent: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: experiences, start: "top 85%", end: "top 25%", scrub: 1.1 }
        });
      }

      const suites = document.querySelector<HTMLElement>("#suites");
      const suiteCards = document.querySelectorAll<HTMLElement>(".suite-card");
      if (suites && suiteCards.length) {
        gsap.fromTo(suiteCards, { yPercent: 24, opacity: 0, scale: 0.97 }, {
          yPercent: 0, opacity: 1, scale: 1, stagger: 0.16, ease: "none",
          scrollTrigger: { trigger: suites, start: "top 80%", end: "top 25%", scrub: 1.1 }
        });
      }

      const story = document.querySelector<HTMLElement>("#story");
      const storyWords = document.querySelector<HTMLElement>(".story__words");
      const storyStamp = document.querySelector<HTMLElement>(".story__stamp");
      const storyArchitecture = document.querySelector<HTMLElement>(".story__architecture");
      if (story && storyWords && storyStamp && storyArchitecture) {
        gsap.fromTo(storyWords, { yPercent: 20, opacity: 0, scale: 0.97 }, {
          yPercent: 0, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: { trigger: story, start: "top 80%", end: "top 25%", scrub: 1.2 }
        });
        gsap.fromTo(storyStamp, { xPercent: -24, rotate: -5, opacity: 0 }, {
          xPercent: 0, rotate: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: story, start: "top 80%", end: "top 35%", scrub: 1 }
        });
        gsap.fromTo(storyArchitecture, { xPercent: 12, scale: 0.88, opacity: 0 }, {
          xPercent: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: story, start: "top 75%", end: "top 20%", scrub: 1.2 }
        });
      }

      const reservations = document.querySelector<HTMLElement>("#reservations");
      const reservationInner = document.querySelector<HTMLElement>(".reservations__inner");
      if (reservations && reservationInner) {
        gsap.fromTo(reservationInner, { yPercent: 22, scale: 0.94, opacity: 0 }, {
          yPercent: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: reservations, start: "top 85%", end: "top 30%", scrub: 1.2 }
        });
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const refreshTimer = window.setTimeout(onLoad, 150);

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(refreshTimer);
      };
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.atmosphere = atmosphere;
  }, [atmosphere]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openReservation = () => {
    scrollTo("reservations");
    toast("Private stay inquiry opened", {
      description: "Your Meridian host will shape the details around you.",
    });
  };

  return (
    <main className="site-shell">
      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <a className="brand" href="#arrival" aria-label="The Royal Meridian — top of page">
          <span className="brand__top">The Royal</span>
          <span className="brand__name">Meridian</span>
          <span className="brand__bottom">Hotel &amp; Resort</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`}>{link.label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="atmosphere" aria-label="Atmospheric view">
            {atmosphereOptions.map((option) => (
              <button
                type="button"
                aria-label={`View ${option} atmosphere`}
                key={option}
                className={atmosphere === option ? "is-active" : ""}
                onClick={() => setAtmosphere(option)}
              >
                {option === "golden" ? "Golden" : option[0].toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
          <button type="button" className="reservation-link" onClick={openReservation}>
            Reserve <ArrowUpRight size={15} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="menu-trigger"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} strokeWidth={1.4} />
          </button>
        </div>
      </header>

      <div className={`menu-panel ${menuOpen ? "menu-panel--open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" className="menu-close" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
          <X size={26} strokeWidth={1.3} />
        </button>
        <span className="menu-panel__eyebrow">Explore the Meridian</span>
        <div className="menu-panel__links">
          {[
            ...navLinks,
            { label: "The Lobby", id: "lobby" },
            { label: "Wellness", id: "wellness" },
            { label: "Signature Suites", id: "suites" },
            { label: "Our Story", id: "story" },
          ].map((link, index) => (
            <button type="button" key={link.id} onClick={() => scrollTo(link.id)}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight size={23} strokeWidth={1.2} />
            </button>
          ))}
        </div>
        <button type="button" className="menu-panel__reserve" onClick={openReservation}>Begin a private inquiry <MoveRight size={18} /></button>
      </div>

      
 <section id="arrival" className="hero">
  <div className="hero__sequence">
  <img
    className="hero__sequence-image hero__sequence-image--1"
    src={media.arrivalDay}
    alt="Royal Meridian arrival by day"
  />

  <img
    className="hero__sequence-image hero__sequence-image--2"
    src={media.arrivalClose}
    alt="Royal Meridian hotel entrance"
  />

  <img
    className="hero__sequence-image hero__sequence-image--3"
    src={media.arrivalGolden}
    alt="Royal Meridian golden hour arrival"
  />

  <img
    className="hero__sequence-image hero__sequence-image--4"
    src={media.arrivalNight}
    alt="Royal Meridian night arrival"
  />
</div>
  <motion.div
    className="hero__veil"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{
      duration: 1.8,
      delay: 0.35,
      ease: "easeInOut",
    }}
  />

  <div
  className="hero__architecture"
  aria-hidden="true"
>
  <span />
  <span />
  <span />
  <span />
  <span />
</div>

  <div className="hero__content">
    <motion.div
      className="hero__side-note"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.9,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span /> Jeddah · The Red Sea
    </motion.div>

    <div className="hero__title-block">
      <motion.p
        className="eyebrow hero__eyebrow"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.75,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        An address composed in light
      </motion.p>

      <h1>
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.85,
            duration: 1.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          The art
        </motion.span>
        <br />

        <motion.em
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 95 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.02,
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          of arrival.
        </motion.em>
      </h1>

      <motion.div
        className="hero__foot"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.25,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <p>
          At the edge of the Red Sea, a new rhythm of hospitality unfolds.
        </p>

        <motion.button
          type="button"
          className="circle-button"
          aria-label="Explore the hotel"
          onClick={() => scrollTo("lobby")}
          whileHover={{
            scale: 1.12,
            rotate: 45,
          }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowDown size={21} strokeWidth={1.3} />
        </motion.button>
      </motion.div>
    </div>

    <motion.div
      className="hero__index"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.4,
        duration: 0.8,
      }}
    >
      01 <span>—</span> 10
    </motion.div>
  </div>
</section>

      <section className="introduction section-pad" aria-labelledby="intro-heading">
        <div className="introduction__top reveal">
          <p className="eyebrow">A place made to be felt</p>
          <p className="introduction__latitude">21° 29′ N&nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;39° 11′ E</p>
        </div>
        <div className="introduction__statement reveal" id="intro-heading">
          <span className="statement-mark">“</span>
          <p>Some places are discovered. <em>Others are remembered</em> before you have even left them.</p>
        </div>
        <div className="introduction__bottom reveal">
          <p>Royal Meridian is a sanctuary shaped by the coastal landscape: pale stone, still water, deep shade and the changing blue of the sea.</p>
          <button type="button" className="text-link" onClick={() => scrollTo("story")}>Discover the philosophy <MoveRight size={17} /></button>
        </div>
      </section>

      <section id="lobby" className="lobby-section section-pad">
        <div className="section-header reveal">
          <p className="eyebrow">02 — The Lobby</p>
          <p className="section-header__note">A pause between<br />the outside and within.</p>
        </div>
        <div className="lobby-layout">
          <div className="lobby-image reveal">
            <img src={media.lobby} alt="Sculptural stair and bronze chandelier in the hotel lobby" />
            <span className="image-caption">The first room</span>
          </div>
          <div className="lobby-copy reveal">
            <h2>Enter<br />a different<br /><em>tempo.</em></h2>
            <div className="lobby-copy__detail">
              <span className="detail-number">01</span>
              <p>Stone rises slowly. Light gathers in bronze. The lobby is less an arrival hall than a threshold for the senses.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="stay" className="residences">
        <div className="residences__copy reveal">
          <p className="eyebrow">03 — Stay</p>
          <h2>Rooms for<br />unhurried <em>days.</em></h2>
          <p className="body-copy">Each residence is drawn around its own horizon—where soft linen, timber and hand-finished stone frame the water beyond.</p>
          <button type="button" className="text-link text-link--light" onClick={() => scrollTo("suites")}>Explore the residences <MoveRight size={17} /></button>
        </div>
        <div className="residences__image reveal">
          <img src={media.suite} alt="Oceanfront signature suite with natural linen and stone" />
          <div className="image-tag"><span>Suite 306</span><span>Sea-facing</span></div>
        </div>
        <div className="residences__vertical">The Residences</div>
      </section>

      <section id="dining" className="dining section-pad">
        <div className="dining__art reveal"><img src={media.dining} alt="Candlelit ocean-facing fine dining restaurant" /></div>
        <div className="dining__content reveal">
          <p className="eyebrow">04 — Dining</p>
          <h2>A table<br />with a <em>tide.</em></h2>
          <p className="body-copy">The coast, the season and the evening are quietly expressed in every plate. From a first coffee to the last pour, every table has its horizon.</p>
          <div className="dining__venues">
            <div><span>01</span><strong>Marée</strong><small>Coastal cuisine · Evening</small></div>
            <div><span>02</span><strong>Atelier</strong><small>Private dining · By request</small></div>
          </div>
          <button type="button" className="text-link" onClick={() => toast("Dining reservations are a concept interaction", { description: "The portfolio experience does not process real bookings." })}>Meet our kitchens <MoveRight size={17} /></button>
        </div>
      </section>

      <section id="wellness" className="wellness">
        <div className="wellness__orb" aria-hidden="true" />
        <div className="wellness__grid section-pad">
          <div className="wellness__heading reveal">
            <p className="eyebrow">05 — Wellness</p>
            <h2>Return to<br />your <em>centre.</em></h2>
          </div>
          <div className="wellness__copy reveal">
            <p>Water, heat and stillness compose the Meridian ritual. Treatment rooms are set behind filtered light; the air carries orange blossom, salt and cedar.</p>
            <div className="wellness__metrics">
              <span><strong>08</strong> treatment suites</span>
              <span><strong>01</strong> private hammam</span>
            </div>
            <button type="button" className="text-link" onClick={() => toast("The wellness ritual is awaiting", { description: "This is a fictional portfolio concept." })}>View the spa ritual <MoveRight size={17} /></button>
          </div>
        </div>
      </section>

      <section id="pool" className="pool-section">
        <img src={media.pool} alt="Infinity pool overlooking the Red Sea at blue hour" />
        <div className="pool-section__wash" />
        <div className="pool-section__content reveal">
          <p className="eyebrow">06 — The Infinity Pool</p>
          <h2>Where the<br />water <em>continues.</em></h2>
          <p>At blue hour, the line between pool and sea disappears entirely.</p>
        </div>
        <div className="pool-section__caption">Sunset, every day</div>
      </section>

      <section id="experiences" className="experiences section-pad">
        <div className="experiences__heading reveal">
          <p className="eyebrow">07 — Red Sea Experiences</p>
          <h2>Go where<br />the map <em>softens.</em></h2>
          <p className="body-copy">The most remarkable part of the hotel begins just beyond its terraces.</p>
        </div>
        <div className="experiences__list reveal">
          {[
            ["01", "The Quiet Coast", "A morning by dhow, tracing the limestone shore."],
            ["02", "Reef at First Light", "A private dive before the coast wakes."],
            ["03", "Desert / Sea", "A long table set where the dunes meet water."],
          ].map(([number, title, copy]) => (
            <button type="button" key={number} className="experience-row" onClick={() => toast(title, { description: copy })}>
              <span>{number}</span><strong>{title}</strong><p>{copy}</p><ArrowUpRight size={20} strokeWidth={1.3} />
            </button>
          ))}
        </div>
      </section>

      <section id="suites" className="suites section-pad">
        <div className="suites__heading reveal">
          <p className="eyebrow">08 — Signature Suites</p>
          <h2>Drawn around<br />the <em>horizon.</em></h2>
        </div>
        <div className="suite-list reveal">
          <article className="suite-card suite-card--featured">
            <span className="suite-card__number">01</span>
            <div><p>Meridian House</p><strong>Presidential Suite</strong></div>
            <div className="suite-card__meta"><span>380 m²</span><span>Private pool</span></div>
            <button type="button" aria-label="View Presidential Suite" onClick={() => toast("Meridian House", { description: "A fictional 380 m² presidential residence." })}><ChevronRight size={21} /></button>
          </article>
          <article className="suite-card">
            <span className="suite-card__number">02</span>
            <div><p>South Wing</p><strong>Horizon Suite</strong></div>
            <div className="suite-card__meta"><span>180 m²</span><span>Sea terrace</span></div>
            <button type="button" aria-label="View Horizon Suite" onClick={() => toast("Horizon Suite", { description: "A fictional residence overlooking the sea." })}><ChevronRight size={21} /></button>
          </article>
          <article className="suite-card">
            <span className="suite-card__number">03</span>
            <div><p>East Courtyard</p><strong>Garden Residence</strong></div>
            <div className="suite-card__meta"><span>120 m²</span><span>Sun court</span></div>
            <button type="button" aria-label="View Garden Residence" onClick={() => toast("Garden Residence", { description: "A fictional hideaway with a private sun court." })}><ChevronRight size={21} /></button>
          </article>
        </div>
      </section>

      <section id="story" className="story section-pad">
        <div className="story__stamp reveal"><Sparkles size={17} strokeWidth={1.2} /><span>Since 2026<br />The Red Sea</span></div>
        <div className="story__words reveal">
          <p className="eyebrow">09 — The Studio</p>
          <h2>Designed for the<br /><em>spaces in between.</em></h2>
          <p className="body-copy">Royal Meridian is a study in the gestures that make a stay singular: a cool hand towel at the right moment, an unasked-for table in the shade, the sound of water at night.</p>
        </div>
        <div className="story__architecture reveal" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      </section>

      <section id="reservations" className="reservations">
        <div className="reservations__inner reveal">
          <p className="eyebrow">10 — Reservations</p>
          <h2>Let the coast<br /><em>find you.</em></h2>
          <p>For a stay made around your pace, speak with a Meridian host.</p>
          <button type="button" className="reserve-button" onClick={() => toast("Inquiry noted", { description: "A real reservation system is intentionally outside this concept." })}>
            Begin an inquiry <ArrowUpRight size={18} strokeWidth={1.4} />
          </button>
        </div>
      </section>

      <footer className="footer">
        <a className="brand brand--footer" href="#arrival">
          <span className="brand__top">The Royal</span><span className="brand__name">Meridian</span><span className="brand__bottom">Hotel &amp; Resort</span>
        </a>
        <p>Jeddah, Kingdom of Saudi Arabia<br />On the edge of the Red Sea</p>
        <div className="footer__links"><a href="#story">Journal</a><a href="#reservations">Contact</a><a href="#arrival">Instagram</a></div>
        
      </footer>
    </main>
  );
}