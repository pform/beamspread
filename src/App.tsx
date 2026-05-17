/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Target, 
  Layers, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X,
  Dna,
  Telescope,
  Radio,
  Share2
} from "lucide-react";

const HERO_IMAGE_URL = "/src/assets/images/hero_beam_abstract_1778978629310.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-brand-cyan flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">BEAMSPREAD</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href={isHome ? "#analysis" : "/#analysis"}>ANALYSIS</NavLink>
          <NavLink href={isHome ? "#solutions" : "/#solutions"}>SOLUTIONS</NavLink>
          <Link 
            to="/valuation" 
            className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
          >
            VALUATION
          </Link>
          <Link 
            to="/technical" 
            className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
          >
            TECHNICAL
          </Link>
          <NavLink href={isHome ? "#contact" : "/#contact"}>CONTACT</NavLink>
          <a 
            href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Purchase BeamSpread.com on GoDaddy"
            aria-label="Purchase the BeamSpread.com domain name on GoDaddy"
            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-brand-cyan transition-colors"
          >
            ACQUIRE DOMAIN
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-bg border-b border-brand-border p-6 flex flex-col gap-4"
          >
            <NavLink href={isHome ? "#analysis" : "/#analysis"} onClick={() => setIsOpen(false)}>ANALYSIS</NavLink>
            <NavLink href={isHome ? "#solutions" : "/#solutions"} onClick={() => setIsOpen(false)}>SOLUTIONS</NavLink>
            <Link 
              to="/valuation" 
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
            >
              VALUATION
            </Link>
            <Link 
              to="/technical" 
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
            >
              TECHNICAL
            </Link>
            <NavLink href={isHome ? "#contact" : "/#contact"} onClick={() => setIsOpen(false)}>CONTACT</NavLink>
            <a 
              href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Purchase BeamSpread.com Domain"
              aria-label="Purchase BeamSpread.com Domain Name"
              className="bg-brand-cyan text-black px-4 py-2 rounded font-semibold text-center"
            >
              ACQUIRE DOMAIN
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  if (href.startsWith("#") || href.startsWith("/#")) {
    return (
      <a 
        href={href} 
        onClick={onClick}
        className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
      >
        {children}
      </a>
    );
  }
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className="font-mono text-xs tracking-widest text-white/60 hover:text-brand-cyan transition-colors"
    >
      {children}
    </Link>
  );
};

const BeamVisualizer = () => {
  const [spread, setSpread] = useState(15);
  
  return (
    <div className="bg-brand-gray rounded-2xl border border-brand-border p-8 overflow-hidden relative group">
      <div className="absolute top-4 right-4 z-10">
        <span className="font-mono text-[10px] text-brand-cyan/60 uppercase tracking-widest">Live Simulator 0.1v</span>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold mb-2">Divergence Control</h3>
          <p className="text-white/40 text-sm max-w-xs font-sans">
            Real-time visualization of beam propagation across variable atmospheres.
          </p>
        </div>

        <div className="relative h-64 bg-black/50 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d={`M 0 100 L 400 ${100 - spread} L 400 ${100 + spread} Z`}
              fill="url(#beamGradient)"
              filter="url(#glow)"
              animate={{ d: `M 0 128 L 600 ${128 - spread * 5} L 600 ${128 + spread * 5} Z` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
            
            {/* Grid lines */}
            {[...Array(10)].map((_, i) => (
              <line 
                key={i}
                x1={i * 60} y1="0" x2={i * 60} y2="256"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}
          </svg>
          
          <div className="absolute left-8 w-4 h-4 bg-brand-cyan rounded-full shadow-[0_0_20px_#00f2ff]" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label className="font-mono text-xs text-white/60">SPREAD RADIUS</label>
            <span className="font-mono text-brand-cyan text-lg">{spread}°sr</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="45" 
            value={spread}
            onChange={(e) => setSpread(parseInt(e.target.value))}
            className="w-full accent-brand-cyan cursor-pointer h-1.5 bg-brand-border rounded-lg appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 border border-brand-border bg-brand-gray/30 rounded-2xl hover-glow transition-all group">
    <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors">
      <Icon className="w-6 h-6 text-brand-cyan group-hover:text-black transition-colors" />
    </div>
    <h4 className="font-display text-xl font-bold mb-3">{title}</h4>
    <p className="text-white/40 text-sm leading-relaxed">{description}</p>
  </div>
);

const ContactPuzzle = () => {
  const [isSolved, setIsSolved] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const targetValue = 75;
  const tolerance = 5;

  useEffect(() => {
    if (Math.abs(sliderValue - targetValue) <= tolerance) {
      setIsSolved(true);
    }
  }, [sliderValue]);

  return (
    <div className="mt-12 p-8 border border-brand-cyan/20 bg-black/40 rounded-2xl">
      {!isSolved ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-xl font-bold">Contact Verification</h4>
            <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest">Align the signal focus</span>
          </div>
          <p className="text-white/40 text-sm">Slide the beam to 75% intensity to reveal the owner's contact info.</p>
          
          <div className="relative h-12 bg-brand-bg border border-brand-border rounded-full flex items-center px-4 overflow-hidden">
             <motion.div 
               className="absolute left-0 top-0 bottom-0 bg-brand-cyan/20"
               animate={{ width: `${sliderValue}%` }}
               transition={{ type: "spring", bounce: 0, duration: 0.1 }}
             />
             <div 
               className="absolute h-full w-1 bg-brand-cyan/50 z-10"
               style={{ left: `${targetValue}%` }}
             />
             <input 
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full accent-brand-cyan relative z-20 cursor-pointer appearance-none bg-transparent"
             />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-white/20">
            <span>0% INTENSITY</span>
            <span>100% INTENSITY</span>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center gap-4 py-4"
        >
          <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-500 mb-2">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-display text-2xl font-bold">Signal Locked</h4>
          <a 
            href="mailto:info@beamspread.com" 
            className="font-mono text-2xl text-brand-cyan hover:underline decoration-brand-cyan/30 underline-offset-8"
          >
            info@beamspread.com
          </a>
          <p className="text-white/40 text-sm">Direct inquiries regarding the purchase of beamspread.com</p>
        </motion.div>
      )}
    </div>
  );
};

const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metas: Record<string, { title: string, desc: string }> = {
      "/": {
        title: "BeamSpread.com | Premium Technology & Engineering Domain For Sale",
        desc: "Acquire BeamSpread.com - The premier domain name for optical engineering, LiDAR systems, laser technology, and high-performance radiation analysis."
      },
      "/valuation": {
        title: "BeamSpread Domain Valuation | Strategic Technology Asset Review",
        desc: "Detailed market valuation and semantic scarcity analysis for the BeamSpread.com domain name asset."
      },
      "/technical": {
        title: "Technical Definition: Beam Spread | Optical Engineering Fundamentals",
        desc: "Understanding beam spread and divergence in optical systems, LiDAR, and electromagnetic propagation."
      }
    };

    const current = metas[pathname] || metas["/"];
    document.title = current.title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", current.desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", current.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", current.desc);
  }, [pathname]);

  return null;
};

const HomePage = () => {
  return (
    <main>
      {/* SEO context for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Premium Domain: BeamSpread.com</h2>
        <p>
          BeamSpread.com is a premier digital asset for established tech companies and high-growth startups specialized in optical engineering, LiDAR development, laser technology, and radiation analysis. 
          The domain name "Beam Spread" holds significant semantic value in applied physics and data distribution sectors.
        </p>
        <ul>
          <li>Industry-standard technology terminology</li>
          <li>Memorable and authoritative brand identity</li>
          <li>Optimized for global engineering markets</li>
          <li>Highly relevant for fiber optics and signal distribution</li>
        </ul>
      </div>

      <article>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={HERO_IMAGE_URL}
              alt="Futuristic abstract light beam refraction representing BeamSpread technology"
              className="w-full h-full object-cover opacity-60 mask-fade-bottom scale-110"
              referrerPolicy="no-referrer"
            />

          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 font-mono text-[10px] text-brand-cyan tracking-widest uppercase mb-6">
              Premium Web Asset Available Now
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
              BEAMSPREAD.COM <br />
              <span className="text-brand-cyan glow-cyan">FOR SALE</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
              Unlock the ultimate digital identity for your optical engineering, data distribution, or laser technology brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Acquire BeamSpread.com on GoDaddy"
                aria-label="Acquire this domain asset via GoDaddy"
                className="flex items-center justify-center gap-2 bg-brand-cyan text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform group"
              >
                ACQUIRE DOMAIN
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a 
                href="#contact"
                className="flex items-center justify-center gap-2 border border-brand-border bg-white/5 backdrop-blur px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                DIRECT INQUIRY
                <Share2 className="w-5 h-5 text-white/40" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid / Interactive Section */}
      <section id="analysis" className="py-24 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 mb-8">
              <div className="h-[1px] w-full bg-brand-border mb-12" />
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-white">
                <div>
                  <h2 className="font-display text-4xl font-bold mb-4">Strategic Value</h2>
                  <p className="text-white/40 max-w-lg">
                    Perfect for startups and leaders in LiDAR, Fiber Optics, Wide-Area Distribution, and Applied Physics.
                  </p>
                </div>
                <div className="font-mono text-xs text-white/20 uppercase tracking-[0.2em]">
                  Brand Equity propogation
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BeamVisualizer />
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
              <div className="p-8 bg-brand-cyan rounded-3xl text-black flex flex-col justify-between h-full">
                <div>
                  <Target className="w-10 h-10 mb-6" />
                  <h3 className="font-display text-4xl font-bold tracking-tight">Market Focus</h3>
                </div>
                <p className="font-medium text-lg leading-snug">
                  Establish immediate authority in radiation analysis markets globally.
                </p>
              </div>
              <div className="p-8 bg-brand-gray border border-brand-border rounded-3xl flex flex-col justify-between h-full text-white">
                <div className="flex justify-between">
                  <Cpu className="w-8 h-8 text-brand-cyan" />
                  <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">Asset Value</span>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold mb-2">Scalable Tech</h4>
                  <p className="text-white/40 text-sm">A short, memorable domain name with high semantic relevance to engineering.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="solutions" className="py-24 bg-brand-gray/20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Layers}
              title="Broad Coverage"
              description="A versatile name that spans across diverse sectors in lighting, telecommunications, and defense."
            />
            <FeatureCard 
              icon={Dna}
              title="Global Recognition"
              description="Simple phonetics and clear imagery make it recognizable across international research communities."
            />
            <FeatureCard 
              icon={Telescope}
              title="Future Proof"
              description="As signal distribution becomes more critical, the prefix 'Beam' grows in long-term technological value."
            />
          </div>
        </div>
      </section>

      {/* Stats / CTA */}
      <section id="contact" className="py-32 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="p-12 border border-brand-border bg-brand-gray/50 rounded-[2rem]">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">Technical Justification</h3>
            <p className="text-white/40 mb-6 leading-relaxed">
              In optical engineering, <strong className="text-brand-cyan">beam spread</strong> (beam divergence) is the fundamental measure of how much a signal increases in diameter as it propagates from its source.
            </p>
            <ul className="space-y-4 font-mono text-xs text-white/60">
              <li className="flex items-start gap-3">
                <span className="text-brand-cyan mt-1 tabular-nums">01.</span>
                <span>High semantic relevance for LiDAR, Free Space Optics (FSO), and Laser Communication sectors.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-cyan mt-1 tabular-nums">02.</span>
                <span>Exact-match industry terminology yields significant organic search advantage.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-cyan mt-1 tabular-nums">03.</span>
                <span>Direct association with "radiation analysis" and "optical dispersion" technology markets.</span>
              </li>
            </ul>
          </div>
          <div className="p-12 border border-brand-border bg-brand-gray/50 rounded-[2rem]">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">Asset Scarcity</h3>
            <p className="text-white/40 mb-6 leading-relaxed">
              The .com TLD remains the global standard for engineering enterprise. BeamSpread.com is a "category-killer" brand for high-performance optical firms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-brand-border">
                <div className="text-brand-cyan font-bold text-lg mb-1">Global</div>
                <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Reach</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-brand-border">
                <div className="text-brand-cyan font-bold text-lg mb-1">Premium</div>
                <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Tier</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border border-brand-cyan/20 bg-brand-cyan/5 rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Radio className="w-96 h-96 text-brand-cyan" />
          </div>
          
          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">Ready to own this asset?</h2>
            <p className="text-xl text-white/60 mb-8">
              Don't miss the opportunity to secure a high-value niche domain for your enterprise.
            </p>
            
            <a 
              href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-cyan text-black px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all"
            >
              ACQUIRE DOMAIN
            </a>

            <ContactPuzzle />
          </div>
        </div>
      </section>
      </article>
    </main>
  );
};

const Footer = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'BeamSpread.com | Premium Domain For Sale',
      text: 'Acquisition opportunity: BeamSpread.com is a premium digital asset for optical engineering and technology.',
      url: 'https://beamspread.com',
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://beamspread.com').then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }).catch(() => {
      // Fallback for older browsers or restricted iframes
      const textArea = document.createElement("textarea");
      textArea.value = 'https://beamspread.com';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    });
  };

  const goToMarketplace = () => {
    window.open('https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com', '_blank');
  };

  return (
    <footer className="border-t border-brand-border py-20 px-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] bg-brand-cyan text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            LINK COPIED TO CLIPBOARD
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2 text-white">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-brand-cyan" />
            <span className="font-display text-2xl font-bold tracking-tight">BEAMSPREAD</span>
          </div>
          <p className="text-white/40 max-w-sm mb-8">
            Premium technology domain name available for direct purchase or brokerage.
            Silicon Valley roots, global visibility.
          </p>
          <div className="flex gap-4">
            <SocialIcon 
              onClick={handleShare} 
              title="Share Domain Asset"
              className={showToast ? "border-brand-cyan text-brand-cyan" : ""}
            >
              <Share2 className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon onClick={goToMarketplace} title="View Marketplace Listing">
              <Radio className="w-4 h-4" />
            </SocialIcon>
          </div>
        </div>
        
        <div>
          <h5 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">RESOURCES</h5>
          <ul className="flex flex-col gap-4">
            <FooterLink to="/valuation">Valuation Guide</FooterLink>
            <FooterLink to="/technical">Technical Whitepaper</FooterLink>
            <FooterLink to="/#analysis">Asset Analysis</FooterLink>
            <FooterLink to="/#contact">Contact Support</FooterLink>
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">SALES STATUS</h5>
          <button 
            onClick={goToMarketplace}
            className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 cursor-pointer hover:bg-blue-500/10 transition-colors group w-full text-left"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-tighter">Listed on Afternic/GoDaddy</span>
            <ChevronRight className="w-3 h-3 text-blue-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-border flex justify-between items-center text-[10px] font-mono text-white/20">
        <address className="not-italic">© 2026 BEAMSPREAD.COM / ASSET LIQUIDATION OFFICE</address>
        <span className="hidden md:block select-none text-white/20">EST. 2024</span>
      </div>
    </footer>
  );
};

const ValuationPage = () => {
  return (
    <main className="pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <span className="text-brand-cyan font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Asset Review</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 text-white">Valuation Model</h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            A comprehensive analysis of current trends and semantic scarcity that positions BeamSpread.com as a Tier-1 industrial technology asset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-white">
          <div className="p-8 border border-brand-border bg-brand-gray/50 rounded-2xl">
            <h3 className="font-display text-2xl font-bold mb-4">Historical Context</h3>
            <p className="text-white/40 leading-relaxed mb-6">
              Exact-match phrases in physics are rarely available on the open market. "Beam Spread" is the fundamental term taught in every optics lab globally.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-mono">HIGH RECALL</span>
              <span className="px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-mono">INDUSTRY STANDARD</span>
            </div>
          </div>
          <div className="p-8 border border-brand-border bg-brand-gray/50 rounded-2xl">
            <h3 className="font-display text-2xl font-bold mb-4">Market Growth</h3>
            <p className="text-white/40 leading-relaxed mb-6">
              The LiDAR and autonomous vehicle sensor market is projected to reach $6.7B by 2030. Own the terminology that defines the sector.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-mono">LiDAR</span>
              <span className="px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-mono">FIBER OPTICS</span>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="font-display text-3xl font-bold mb-8 text-white">Key Valuation Drivers</h2>
          <div className="space-y-6">
            {[
              { title: "Length & Simplicity", desc: "Two simple, English words. Easy to spell, impossible to forget." },
              { title: ".COM Authority", desc: "The gold standard of domain extensions, ensuring trust and global reach." },
              { title: "SEO Advantage", desc: "Direct match for technical search queries in photonics and signal distribution." },
              { title: "Brandable & Professional", desc: "Conveys stability, precision, and engineering excellence from the first encounter." }
            ].map((driver, i) => (
              <div key={i} className="flex gap-6 p-6 border-b border-brand-border group hover:bg-white/5 transition-colors">
                <span className="font-mono text-brand-cyan text-lg">0{i+1}.</span>
                <div>
                  <h4 className="font-display text-xl font-bold mb-1 text-white">{driver.title}</h4>
                  <p className="text-white/40">{driver.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="p-12 border border-brand-cyan/20 bg-brand-cyan/5 rounded-3xl text-center">
          <h3 className="font-display text-3xl font-bold mb-6 text-white text-center">Ready to discuss terms?</h3>
          <p className="max-w-lg mx-auto text-white/50 mb-8 text-center">
            Private sales and brokerage options are available via authorized partners.
          </p>
          <a 
            href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=beamspread.com"
            target="_blank"
            className="inline-block bg-brand-cyan text-black px-10 py-5 rounded-full font-bold text-lg"
          >
            VIEW CURRENT LISTING
          </a>
        </div>
      </article>
    </main>
  );
};

const TechnicalPage = () => {
  return (
    <main className="pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <span className="text-brand-cyan font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Physics & Engineering</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 text-white">Technical Definition</h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            Understanding the core mechanics of "Beam Spread" in high-performance optical arrays and radiation propagation.
          </p>
        </motion.div>

        <section className="bg-brand-gray border border-brand-border rounded-3xl p-12 mb-20 text-white leading-relaxed">
          <h2 className="font-display text-3xl font-bold mb-8">What is Beam Spread?</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <p className="text-white/60">
                In optics, beam spread (or beam divergence) is an angular measure of the increase in beam diameter or radius with distance from the optical aperture or antenna aperture from which the electromagnetic beam emerges.
              </p>
              <div className="p-6 bg-black/40 border border-brand-border rounded-xl font-mono text-sm">
                θ = 2 * arctan(D / (2 * L))
                <br />
                <span className="text-white/20 text-[10px] mt-2 block">Where θ is the divergence, D is the diameter, and L is the length.</span>
              </div>
            </div>
            <div className="flex-1 border-l border-brand-border pl-12">
              <h4 className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-4">Critical Vectors</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li>• Diffraction limited propagation</li>
                <li>• Atmospheric scintillation impact</li>
                <li>• M-squared factor optimization</li>
                <li>• Geometric vs. Wave optics</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold">Signal Attenuation</h3>
            <p className="text-white/40">
              As a beam spreads, its intensity decreases over the cross-sectional area following the inverse-square law. Controlling this spread is the central challenge in long-distance data transmission and target acquisition.
            </p>
          </div>
          <div className="space-y-6 text-white text-left">
            <h3 className="font-display text-2xl font-bold">Applications</h3>
            <div className="flex flex-wrap gap-3">
              {["NASA Deep Space", "LiDAR Arrays", "Quantum Key Distribution", "Free Space Optics"].map((app, i) => (
                <span key={i} className="px-4 py-2 bg-brand-cyan/5 border border-brand-cyan/10 rounded-full text-xs font-mono text-brand-cyan">
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 p-12 border border-brand-border rounded-3xl text-center">
            <div className="mb-8">
              <Target className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-white text-center">The Industry Standard Domain</h3>
            </div>
            <p className="text-white/40 mb-8 max-w-lg mx-auto text-center">
              Don't compromise on your brand's technical authority. BeamSpread.com is the definitive asset for professional optics.
            </p>
            <Link to="/#contact" className="inline-block bg-brand-cyan text-black px-10 py-5 rounded-full font-bold text-lg">
                GET IN TOUCH
            </Link>
        </div>
      </article>
    </main>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEOManager />
      <div className="min-h-screen text-white bg-black">
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/technical" element={<TechnicalPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const SocialIcon = ({ 
  children, 
  onClick, 
  title,
  className = ""
}: { 
  children: React.ReactNode, 
  onClick?: () => void,
  title?: string,
  className?: string
}) => (
  <button 
    onClick={onClick}
    title={title}
    className={`w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-cyan hover:text-brand-cyan transition-colors cursor-pointer bg-white/5 ${className}`}
  >
    {children}
  </button>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  if (to.startsWith("#") || to.startsWith("/#")) {
    return (
      <li>
        <a href={to} className="text-white/60 hover:text-brand-cyan transition-colors text-sm hover:translate-x-1 inline-block transform">
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={to} className="text-white/60 hover:text-brand-cyan transition-colors text-sm hover:translate-x-1 inline-block transform">
        {children}
      </Link>
    </li>
  );
};

