/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, ChevronDown, Command, Github, LockKeyhole, MousePointer2, ScanLine, X } from "lucide-react";
import { track } from "@vercel/analytics";
import { PrivacyContent, TermsContent } from "./components/LegalContent";
import { HeroDemo } from "./components/HeroDemo";

const MAC_DOWNLOAD = "https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg";
const GITHUB = "https://github.com/Srihar1-raman/qopy";
type Policy = "terms" | "privacy";

function QopyMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
      {/* Geometry follows the original app mark; color inherits the site palette. */}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M332 122H240C175 122 122 175 122 240V332M689 122H781C846 122 899 175 899 240V332M122 689V782C122 847 175 900 240 900H332M689 900H781C846 900 899 847 899 782V689" strokeWidth="60" />
        <path d="M519 266H388C357 266 332 291 332 322V700C332 731 357 756 388 756H650C681 756 706 731 706 700V454C706 439 700 425 690 414L559 283C548 272 534 266 519 266Z" strokeWidth="47" />
        <path d="M519 270V422C519 440 533 454 551 454H701" strokeWidth="47" />
      </g>
    </svg>
  );
}

function DownloadLink({ location, compact = false }: { location: "top" | "bottom"; compact?: boolean }) {
  return (
    <a className={`download-button${compact ? " compact" : ""}`} href={MAC_DOWNLOAD}
      onClick={() => { if (import.meta.env.PROD) track(`download_click_${location}`); }}>
      <ArrowDownToLine size={18} aria-hidden="true" />
      Download for Mac
    </a>
  );
}

function Shortcut({ paste = false }: { paste?: boolean }) {
  return <span className="shortcut" aria-label={paste ? "Command V" : "Command Shift 2"}>
    <kbd aria-hidden="true">⌘</kbd>{!paste && <kbd aria-hidden="true">⇧</kbd>}<kbd aria-hidden="true">{paste ? "V" : "2"}</kbd>
  </span>;
}


export default function App() {
  const [policy, setPolicy] = useState<Policy | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !policy) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [policy]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header page-width">
        <a className="brand" href="#" aria-label="qopy home"><QopyMark /><span>qopy</span></a>
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#get-started">Get started</a>
          <a className="github-link" href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="qopy on GitHub (opens in a new tab)"><Github size={20} /><span>GitHub</span><ArrowUpRight size={13} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Copy text from<br /><span className="qopy-word">your screen<svg viewBox="0 0 256 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11C65 2 164 2 251 8" /></svg></span>.</h1>
            <p className="hero-description">Select text in images or videos and copy it to your clipboard.</p>
            <div className="hero-actions"><DownloadLink location="top" /><span className="download-note">For macOS 14 and later</span></div>
          </div>
          <HeroDemo />
        </section>

        <section className="benefits page-width" aria-label="Features">
          <div className="benefit"><span className="benefit-icon"><Command size={21} /></span><p>⌘ ⇧ 2 shortcut</p></div>
          <div className="benefit"><span className="benefit-icon"><LockKeyhole size={21} /></span><p>On-device text recognition</p></div>
          <div className="benefit"><span className="benefit-icon"><ScanLine size={21} /></span><p>Menu bar app</p></div>
        </section>

        <section className="how-section page-width" id="how-it-works" aria-labelledby="how-title">
          <div className="section-heading"><h2 id="how-title">How it works</h2></div>
          <ol className="steps">
            <li><div className="step-top"><span className="step-number">01</span><Shortcut /></div><h3>Start capture</h3><p>Press Command + Shift + 2.</p></li>
            <li><div className="step-top"><span className="step-number">02</span><span className="selection-mini" aria-hidden="true"><MousePointer2 size={22} /></span></div><h3>Select text</h3><p>Click and drag over an area.</p></li>
            <li><div className="step-top"><span className="step-number">03</span><Shortcut paste /></div><h3>Paste</h3><p>Press Command + V.</p></li>
          </ol>
        </section>

        <section className="setup-section page-width" id="get-started" aria-labelledby="setup-title">
          <div className="setup-intro"><h2 id="setup-title">Install qopy</h2><DownloadLink location="bottom" compact /><span className="setup-platform">macOS 14+ · .dmg download</span></div>
          <div className="setup-details">
            <details open><summary><span><span className="detail-number">01</span>Move to Applications</span><ChevronDown size={18} /></summary><div className="detail-content"><p>Open the .dmg file, drag qopy into Applications, then open qopy.</p></div></details>
            <details><summary><span><span className="detail-number">02</span>Allow the permissions</span><ChevronDown size={18} /></summary><div className="detail-content"><p>When qopy asks, enable Screen Recording and Accessibility in System Settings → Privacy &amp; Security. These enable screen capture and the keyboard shortcut.</p><p>You can turn either permission off in System Settings at any time.</p></div></details>
            <details className="install-help"><summary><span>macOS won’t open the app?</span><ChevronDown size={18} /></summary><div className="detail-content"><p>If macOS blocks qopy, first check that you downloaded it from the linked GitHub release. If you trust the app, open System Settings → Privacy &amp; Security and choose Open Anyway for qopy, then follow the macOS prompts.</p><p>If it still won’t open, <a href={GITHUB} target="_blank" rel="noopener noreferrer">check the project on GitHub <ArrowUpRight size={12} /></a>.</p></div></details>
          </div>
        </section>

      </main>

      <footer className="site-footer page-width"><span>© {new Date().getFullYear()} qopy</span><div className="footer-links"><a href="https://twitter.com/combif1am" target="_blank" rel="noopener noreferrer">Twitter <ArrowUpRight size={12} /></a><button type="button" onClick={() => setPolicy("privacy")}>Privacy</button><button type="button" onClick={() => setPolicy("terms")}>Terms</button></div></footer>

      <dialog ref={dialogRef} className="legal-dialog" aria-labelledby="policy-title" onClose={() => setPolicy(null)} onClick={(event) => { if (event.target === event.currentTarget) setPolicy(null); }}>
        <div className="legal-dialog-inner"><div className="legal-dialog-header"><h2 id="policy-title">{policy === "terms" ? "Terms of service" : "Mac app privacy"}</h2><button className="close-dialog" type="button" autoFocus onClick={() => setPolicy(null)} aria-label="Close dialog"><X size={22} /></button></div>
          {policy === "terms" ? <TermsContent /> : <><p className="policy-context">The policy below covers the downloaded Mac app. This website uses Vercel Analytics, as described in the Terms.</p><PrivacyContent /></>}
        </div>
      </dialog>
    </>
  );
}
