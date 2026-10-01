import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./HeroDemo.css";

/** A simulated walkthrough, not a recording of the native Mac application. */
export function HeroDemo() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <figure className="hero-demo" data-paused={paused || reducedMotion} data-reduced-motion={reducedMotion}
      aria-label="Simulated qopy demo: select text from an image, copy it, and paste it into a text editor">
      <div className="demo-screen" aria-hidden="true">
        <svg viewBox="0 0 640 430" fill="none" className="demo-desktop">
          <defs>
            <linearGradient id="demo-wallpaper" x1="0" y1="0" x2="640" y2="430" gradientUnits="userSpaceOnUse">
              <stop stopColor="#dce5f4" /><stop offset="1" stopColor="#b8c7e4" />
            </linearGradient>
            <linearGradient id="demo-wallpaper-wave" x1="185" y1="295" x2="635" y2="436" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a7bce4" stopOpacity=".28" /><stop offset="1" stopColor="#7e9dce" stopOpacity=".45" />
            </linearGradient>
            <filter id="demo-shadow" x="-30%" y="-30%" width="160%" height="175%"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#354466" floodOpacity=".15" /></filter>
          </defs>
          <path fill="url(#demo-wallpaper)" d="M0 0h640v430H0z" />
          <path d="M0 366C135 242 271 395 397 229S576 114 640 121V430H0Z" fill="url(#demo-wallpaper-wave)" />
          <path d="M0 0h640v28H0z" fill="#ffffff" fillOpacity=".55" />
          <g fill="#3e4860" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontSize="10">
            <text x="18" y="18" fontWeight="700">Preview</text><text x="77" y="18">File</text><text x="106" y="18">Edit</text><text x="139" y="18">View</text>
            <text x="601" y="18" textAnchor="end">10:09</text>
          </g>
          <g className="demo-menu-mark" stroke="#3e4860" strokeWidth="1.4" strokeLinecap="round"><path d="M548 8h-3v3m10-3h3v3m-13 6v3h3m7 0h3v-3" /><path d="M549 11h3l3 3v4h-6z" /></g>

          <g filter="url(#demo-shadow)">
            <rect x="40" y="62" width="410" height="247" rx="10" fill="#f8f9fb" />
            <path d="M50 62h390a10 10 0 0 1 10 10v24H40V72a10 10 0 0 1 10-10Z" fill="#f2f3f6" />
            <path d="M40 96h410" stroke="#e0e3e9" />
            <circle cx="56" cy="79" r="4" fill="#ed8b83" /><circle cx="70" cy="79" r="4" fill="#e5c16f" /><circle cx="84" cy="79" r="4" fill="#93be98" />
            <text x="250" y="83" textAnchor="middle" className="demo-window-title">order.png</text>
            <image href="/demo-order.svg" x="64" y="115" width="362" height="164" />
            <rect x="40.5" y="62.5" width="409" height="246" rx="9.5" stroke="#7687aa" strokeOpacity=".2" />
          </g>

          <rect className="demo-selection" x="89" y="134" width="260" height="87" fill="#3a56cc" fillOpacity=".1" stroke="#4e6cd3" strokeWidth="1.8" />


          <g className="demo-editor" filter="url(#demo-shadow)">
            <rect x="286" y="250" width="318" height="141" rx="10" fill="#fff" />
            <path d="M296 250h298a10 10 0 0 1 10 10v24H286v-24a10 10 0 0 1 10-10Z" fill="#f4f5f8" />
            <path d="M286 284h318" stroke="#e7e9ef" />
            <circle cx="302" cy="267" r="4" fill="#ed8b83" /><circle cx="316" cy="267" r="4" fill="#e5c16f" /><circle cx="330" cy="267" r="4" fill="#93be98" />
            <text x="452" y="271" textAnchor="middle" className="demo-window-title">Untitled — TextEdit</text>
            <rect className="demo-editor-focus" x="286.5" y="250.5" width="317" height="140" rx="9.5" stroke="#526ebd" strokeOpacity=".38" />
            <g className="demo-pasted-text" fill="#333b4b" fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" fontSize="16">
              <text x="310" y="318">Order number</text><text x="310" y="344">QP–2048</text>
            </g>
            <path className="demo-empty-caret" d="M310 304v18" stroke="#3a56cc" strokeWidth="1.6" />
            <path className="demo-pasted-caret" d="M380 331v18" stroke="#3a56cc" strokeWidth="1.6" />
          </g>

          <g className="demo-copy-toast" filter="url(#demo-shadow)">
            <rect x="157" y="236" width="175" height="34" rx="8" fill="#fff" fillOpacity=".97" />
            <path d="m171 253 4 4 8-9" stroke="#477853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <text x="193" y="257" fill="#42516a" fontSize="11" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Copied to clipboard</text>
          </g>

          <g className="demo-shortcut demo-capture-shortcut"><rect x="232" y="367" width="82" height="34" rx="8" fill="#243552" fillOpacity=".88" /><text x="273" y="390" textAnchor="middle" className="demo-shortcut-text">⌘ ⇧ 2</text></g>
          <g className="demo-shortcut demo-paste-shortcut"><rect x="404" y="360" width="66" height="32" rx="8" fill="#243552" fillOpacity=".88" /><text x="437" y="382" textAnchor="middle" className="demo-shortcut-text">⌘ V</text></g>
          <g className="demo-cursor"><path d="m0 0 2 25 6-7 5 11 5-2-5-11 9-1Z" fill="#26334c" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></g>
        </svg>
        <div className="demo-timeline"><span /></div>
      </div>
      <figcaption className="demo-controls">
        <span>Simulated demo</span>
        {reducedMotion ? <span className="demo-motion-note">Animation off</span> :
          <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}
            aria-label={paused ? "Play simulated demo" : "Pause simulated demo"}>
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span>
          </button>}
      </figcaption>
    </figure>
  );
}
