import React, { useRef, useState } from "react";
import './App.css';
import './index.css';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mail, Phone, Sparkles, Shirt, Scissors, Ruler, Move3D, ArrowRight, CheckCircle2 } from "lucide-react";

// --- Simple 3D Scene (cloth-like waving plane) ---------------------------------
function WavyCloth() {
  const meshRef = useRef();
  // Create a basic waving vertex animation without external shaders
  return (
    <mesh ref={meshRef} rotation={[-0.6, 0.6, 0]}> 
      <planeGeometry args={[3.2, 2.2, 64, 64]} />
      <meshStandardMaterial color="#b6e3ff" roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

// --- UI Helpers ----------------------------------------------------------------
const Section = ({ id, title, eyebrow, children }) => (
  <section id={id} className="py-24 scroll-mt-20">
    <div className="mx-auto max-w-6xl px-6">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest text-zinc-400 mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-200">
    {children}
  </span>
);

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-3xl font-semibold text-white">{value}</div>
    <div className="text-sm text-zinc-400">{label}</div>
  </div>
);

// --- Pricing Card ---------------------------------------------------------------
function PricingCard({ tier, price, features, cta }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-zinc-400" />
        <p className="text-xs uppercase tracking-widest text-zinc-400">{tier}</p>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{price}</h3>
      <ul className="space-y-3 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-zinc-300">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className="w-full rounded-xl bg-white text-zinc-900 font-medium py-3 hover:bg-zinc-200 transition">
        {cta}
      </button>
    </div>
  );
}

// --- Portfolio Card -------------------------------------------------------------
function WorkCard({ title, subtitle, tags }) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
        {/* Placeholder turntable: replace with a snapshot or embed a real viewer */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-xl bg-zinc-700/30 backdrop-blur-sm" />
          <Shirt className="w-full h-full p-6 text-zinc-300 group-hover:rotate-6 transition-transform" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
          <Move3D className="w-4 h-4" />
          <span>{subtitle}</span>
        </div>
        <h4 className="text-lg text-white font-medium mb-3">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Contact Form (client-side only mock) --------------------------------------
function ContactForm() {
  const [status, setStatus] = useState("idle");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-200" placeholder="Your name" required />
        <input className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-200" type="email" placeholder="Email" required />
      </div>
      <input className="mt-4 w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-200" placeholder="Brand / Company (optional)" />
      <textarea className="mt-4 w-full min-h-[140px] rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-200" placeholder="Tell me about your project…" required />
      <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-zinc-900 hover:bg-zinc-200 transition" type="submit">
        <ArrowRight className="w-4 h-4" /> Request a quote
      </button>
      {status === "sent" && (
        <p className="mt-3 text-sm text-green-400">Thanks! Your message was captured locally for demo purposes.</p>
      )}
    </form>
  );
}

// --- Main Page -----------------------------------------------------------------
export default function PortfolioSite() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-white">Haresh Perera • 3D Fashion</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#process" className="hover:text-white">Process</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#contact" className="rounded-xl bg-white text-zinc-900 px-3 py-2 font-medium hover:bg-zinc-200">Get a quote</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                Photoreal 3D Clothing for <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Forward‑Thinking Brands</span>
              </motion.h1>
              <p className="mt-4 text-lg text-zinc-300 max-w-prose">
                Reduce sampling costs, preview collections before production, and wow customers with interactive product viewers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge><Scissors className="w-4 h-4 mr-2" /> Prototyping Savings</Badge>
                <Badge><Ruler className="w-4 h-4 mr-2" /> True-to-Fabric Details</Badge>
                <Badge><Move3D className="w-4 h-4 mr-2" /> Interactive 3D</Badge>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <a href="#work" className="rounded-xl bg-white text-zinc-900 px-5 py-3 font-medium hover:bg-zinc-200">See Work</a>
                <a href="#contact" className="rounded-xl border border-zinc-800 px-5 py-3 hover:border-zinc-700">Get a Quote</a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <Stat label="Avg. sample saves" value="$500+" />
                <Stat label="Turnaround" value="2–5 days" />
                <Stat label="Client rating" value="5.0/5" />
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                {/* Minimal three.js scene to hint at an AR/3D viewer */}
                <Canvas camera={{ position: [3.5, 2.5, 3.5], fov: 45 }} className="h-[360px] w-full">
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[4, 6, 3]} intensity={1.1} />
                  <WavyCloth />
                  <OrbitControls enablePan={false} />
                </Canvas>
                <div className="flex items-center justify-between p-3 text-xs text-zinc-400 border-t border-zinc-800">
                  <span>Interactive viewer demo</span>
                  <span>Drag to orbit • Scroll to zoom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK / PORTFOLIO */}
      <Section id="work" eyebrow="Selected Work" title="Portfolio">
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard title="Techwear Shell Jacket" subtitle="Photoreal concept → pre-production" tags={["Nylon Ripstop", "PBR", "4K Renders"]} />
          <WorkCard title="Minimalist Hoodie" subtitle="Shopify 3D viewer asset" tags={["Cotton Fleece", "Turntable", "USDZ/GLB"]} />
          <WorkCard title="Satin Dress" subtitle="High-fashion lookbook CGI" tags={["Silk Shader", "Studio Lighting", "Animation"]} />
          <WorkCard title="Denim Jacket" subtitle="Distressed wash exploration" tags={["Denim", "Displacement", "8K Maps"]} />
          <WorkCard title="Puffer Vest" subtitle="AR try-on prototype" tags={["Quilted", "Normal + AO", "USDZ"]} />
          <WorkCard title="Sneaker" subtitle="Marketing hero renders" tags={["Leather", "Subsurface", "Procedural"]} />
        </div>
        <div className="text-center mt-10">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-900 px-5 py-3 font-medium hover:bg-zinc-200">
            Request a custom sample <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* SERVICES / PRICING */}
      <Section id="services" eyebrow="Offerings" title="Services & Packages">
        <div className="grid md:grid-cols-3 gap-6">
          <PricingCard
            tier="Basic"
            price="$199 / garment"
            features={[
              "2–3 photoreal still renders",
              "White / studio background",
              "Social-ready exports (PNG)",
            ]}
            cta="Start with Basic"
          />
          <PricingCard
            tier="Standard"
            price="$449 / garment"
            features={[
              "Interactive 3D (GLB/USDZ)",
              "Turntable video (5–10s)",
              "Optimized for web viewers",
            ]}
            cta="Book Standard"
          />
          <PricingCard
            tier="Premium"
            price="Custom quote"
            features={[
              "Collection previews & animation",
              "AR try-on prototype support",
              "Lighting/lookdev exploration",
            ]}
            cta="Discuss Premium"
          />
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" eyebrow="How It Works" title="A Simple, Transparent Process">
        <ol className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Brief", desc: "Share sketches/refs, fabrics, and goals." },
            { step: "2", title: "Blockout", desc: "Silhouette + proportions for approval." },
            { step: "3", title: "Lookdev", desc: "Fabric shaders, stitching, hardware." },
            { step: "4", title: "Deliver", desc: "Renders, GLB/USDZ, and usage guide." },
          ].map(({ step, title, desc }) => (
            <li key={step} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="text-sm text-zinc-400">Step {step}</div>
              <div className="text-lg text-white font-medium">{title}</div>
              <p className="mt-2 text-sm text-zinc-300">{desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Why Work With Me">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-xl text-white font-semibold mb-2">Focused on Fashion</h3>
            <p className="text-zinc-300">
              I specialize in digital garments—delivering clean topology, accurate fabric behavior, and lighting that flatters real materials. My goal is to help you reduce sampling costs and sell the vision earlier.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> CLO3D / Marvelous
                Designer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Blender / Substance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> PBR / UDIM
                workflow</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> GLB / USDZ for web</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-xl text-white font-semibold mb-2">Results That Matter</h3>
            <p className="text-zinc-300">
              Clients use my renders for e‑commerce images, lookbooks, and investor decks. Interactive models increase time-on-page and help customers explore details that photos miss.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <Stat label="Avg. time-on-page" value="+28%" />
              <Stat label="Prototype cuts" value="−1–2" />
              <Stat label="Assets delivered" value="1.2k+" />
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Let's Talk" title="Get a Quote or Book a Call">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail className="w-5 h-5" /> <span>hello@hareshperera.com</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-zinc-300">
              <Phone className="w-5 h-5" /> <span>(000) 123‑4567</span>
            </div>
            <p className="mt-6 text-sm text-zinc-400">
              Prefer a live walkthrough? Ask for a quick screenshare demo. I can also prepare a free 1‑garment sample in Basic tier for qualified brands.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-400 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Haresh Perera. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-zinc-200">Home</a>
            <a href="#work" className="hover:text-zinc-200">Work</a>
            <a href="#services" className="hover:text-zinc-200">Services</a>
            <a href="#contact" className="hover:text-zinc-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
