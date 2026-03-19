/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Download, Command, Zap, Shield, MousePointer2, Copy, Check, File, HardDrive, Folder, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { track } from "@vercel/analytics";

export default function App() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00FF41] selection:text-black relative overflow-hidden crt">
      <div className="scanline"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4111_1px,transparent_1px),linear-gradient(to_bottom,#00FF4111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-[#00FF41]/20">
        <div className="flex items-center gap-2">
          <img src="/qopy.png" alt="qopy logo" className="w-8 h-8 rounded shadow-[0_0_10px_#00FF41] object-contain bg-black" />
          <span className="font-pixel text-2xl tracking-widest text-[#00FF41]">qopy</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="http://twitter.com/combif1am" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-[#00FF41] transition-colors font-pixel uppercase">Twitter</a>
          <a href="https://github.com/Srihar1-raman/qopy" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-[#00FF41] transition-colors font-pixel uppercase">GitHub</a>
        </div>
      </nav>

      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 text-[#00FF41] text-xs font-pixel uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></span>
            v1.0 is live for macOS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-pixel text-white leading-tight"
          >
            GRAB TEXT FROM <br/>
            <span className="text-[#00FF41] drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">ANY SCREEN</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl font-sans"
          >
            One click and drag. That's it. qopy extracts text from images, videos, or any unselectable area on your Mac directly to your clipboard.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a href="https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg" target="_blank" rel="noopener noreferrer" className="no-underline" onClick={() => track('download_click_top')}>
            <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Download for Mac
            </Button>
            </a>
            <a href="https://github.com/Srihar1-raman/qopy-releases/raw/main/qopy-windows.exe" target="_blank" rel="noopener noreferrer" className="no-underline" onClick={() => track('download_click_windows_top')}>
            <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Download for Windows
            </Button>
            </a>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-xs text-zinc-500 font-pixel uppercase">Requires macOS 14+</p>
              <p className="text-xs text-zinc-500 font-pixel uppercase">Windows hotkey: Ctrl + Alt + Q</p>
            </div>
          </motion.div>
        </div>

        {/* Video/Demo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto max-w-4xl rounded-lg border-2 border-[#00FF41] bg-zinc-900 shadow-[0_0_30px_rgba(0,255,65,0.2)] p-2 mb-32"
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-black border-b-2 border-[#00FF41] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="mx-auto font-pixel text-xs text-zinc-500">qopy-demo.mp4</div>
          </div>
          <div className="mt-8 aspect-video bg-zinc-950 relative overflow-hidden flex items-center justify-center">
            {/* Simulated Video Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-3/4 h-3/4 border border-zinc-800 bg-zinc-900 rounded p-6 flex flex-col gap-4">
                <div className="w-1/2 h-4 bg-zinc-800 rounded"></div>
                <div className="w-3/4 h-4 bg-zinc-800 rounded"></div>
                <div className="w-full h-24 bg-zinc-800 rounded flex items-center justify-center text-zinc-600 font-pixel relative">
                  [ UNSELECTABLE TEXT IN IMAGE ]
                  
                  {/* Simulated Selection Box */}
                  <motion.div 
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{ width: "100%", height: "100%", opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                    className="absolute top-0 left-0 border-2 border-[#00FF41] bg-[#00FF41]/20 z-10"
                  >
                    {/* Simulated Cursor attached to the bottom right of the selection box */}
                    <motion.div
                      className="absolute -bottom-3 -right-3 z-20"
                    >
                      <MousePointer2 className="w-6 h-6 text-white drop-shadow-md" />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Simulated Toast */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute top-4 right-4 bg-[#00FF41] text-black font-pixel text-xs px-3 py-2 flex items-center gap-2 shadow-[2px_2px_0_0_#ffffff] z-30"
                >
                  <Check className="w-4 h-4" />
                  COPIED TO CLIPBOARD
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-[#00FF41] mb-4" />
              <CardTitle>LIGHTNING FAST</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Uses on-device machine learning to recognize text instantly. No loading spinners, no waiting.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-[#00FF41] mb-4" />
              <CardTitle>100% PRIVATE</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Everything happens locally on your Mac. No images or text are ever sent to any server.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Command className="w-8 h-8 text-[#00FF41] mb-4" />
              <CardTitle>NATIVE FEEL</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built specifically for macOS. Sits quietly in your menu bar until you need it.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <div className="text-center mb-32">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-16">HOW IT WORKS</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#00FF41] flex items-center justify-center text-2xl font-pixel text-[#00FF41]">1</div>
              <p className="font-pixel text-lg">PRESS SHORTCUT</p>
              <p className="text-sm text-zinc-400 font-sans">Cmd + Shift + 2</p>
            </div>
            <div className="hidden md:block w-16 h-0.5 bg-zinc-800 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00FF41] rotate-45"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#00FF41] flex items-center justify-center text-2xl font-pixel text-[#00FF41]">2</div>
              <p className="font-pixel text-lg">SELECT AREA</p>
              <p className="text-sm text-zinc-400 font-sans">Click and drag</p>
            </div>
            <div className="hidden md:block w-16 h-0.5 bg-zinc-800 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00FF41] rotate-45"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#00FF41] flex items-center justify-center text-2xl font-pixel text-[#00FF41]">3</div>
              <p className="font-pixel text-lg">PASTE TEXT</p>
              <p className="text-sm text-zinc-400 font-sans">Cmd + V anywhere</p>
            </div>
          </div>
        </div>
        
        {/* Installation Demo Section - Mobile friendly */}
        <div className="text-center mb-16 md:hidden">
          <h2 className="text-3xl font-pixel text-white mb-4">EASY INSTALL</h2>
          <p className="text-zinc-400 font-sans mb-8 px-4">Download .dmg → Open → Driver appears on desktop → Drag app to Applications</p>
          <div className="inline-flex items-center gap-3 bg-zinc-900 border-2 border-[#00FF41] rounded-lg px-6 py-4 mb-32">
            <File className="w-8 h-8 text-[#00FF41]" />
            <span className="font-pixel text-[#00FF41]">qopy.dmg</span>
          </div>
        </div>
        
        <div className="hidden md:block text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-4">EASY INSTALL</h2>
          <p className="text-zinc-400 font-sans">Just drag and drop. No complex installers.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden md:block relative mx-auto max-w-4xl rounded-lg border-2 border-[#00FF41] bg-zinc-900 shadow-[0_0_30px_rgba(0,255,65,0.2)] p-2 mb-32"
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-black border-b-2 border-[#00FF41] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="mx-auto font-pixel text-xs text-zinc-500">install-demo.mp4</div>
          </div>
          <div className="mt-8 aspect-video bg-zinc-950 relative overflow-hidden">
            {/* Desktop Background (CRT/Grid style) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4105_1px,transparent_1px),linear-gradient(to_bottom,#00FF4105_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
            
            {/* qopy.dmg */}
            <motion.div 
              className="absolute flex flex-col items-center gap-1 z-10"
              style={{ top: "15%", left: "85%", x: "-50%", y: "-50%" }}
              animate={{ scale: [1, 1, 0.9, 1, 1] }}
              transition={{ duration: 10, repeat: Infinity, times: [0, 0.13, 0.14, 0.16, 1] }}
            >
              <File className="w-10 h-10 text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
              <span className="text-xs font-pixel text-[#00FF41] bg-black/50 px-1 rounded mt-1">qopy.dmg</span>
            </motion.div>

            {/* Mounted Drive */}
            <motion.div 
              className="absolute flex flex-col items-center gap-1 z-10"
              style={{ top: "35%", left: "85%", x: "-50%", y: "-50%" }}
              animate={{ 
                opacity: [0, 0, 1, 1, 1, 1, 1, 0, 0], 
                scale: [0.8, 0.8, 1, 1, 0.9, 1, 1, 0.8, 0.8] 
              }}
              transition={{ duration: 10, repeat: Infinity, times: [0, 0.16, 0.18, 0.23, 0.24, 0.26, 0.8, 0.85, 1] }}
            >
              <HardDrive className="w-10 h-10 text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
              <span className="text-xs font-pixel text-[#00FF41] bg-black/50 px-1 rounded mt-1">qopy</span>
            </motion.div>

            {/* Installer Window */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-80 h-48 bg-black border-2 border-[#00FF41] rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.2)] flex flex-col overflow-hidden z-10"
              style={{ x: "-50%", y: "-50%" }}
              animate={{ 
                opacity: [0, 0, 1, 1, 0, 0], 
                scale: [0.9, 0.9, 1, 1, 0.9, 0.9] 
              }}
              transition={{ duration: 10, repeat: Infinity, times: [0, 0.28, 0.32, 0.75, 0.8, 1] }}
            >
              <div className="h-8 border-b-2 border-[#00FF41] flex items-center px-3 gap-1.5 bg-[#00FF41]/10">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="mx-auto font-pixel text-xs text-[#00FF41]">qopy</div>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <span className="text-[#00FF41]/50 font-pixel text-sm animate-pulse">DRAG TO DESKTOP</span>
              </div>
            </motion.div>

            {/* App Icon (Draggable item) */}
            <motion.div 
              className="absolute z-20 flex flex-col items-center"
              style={{ x: "-50%", y: "-50%" }}
              animate={{ 
                left: ["50%", "50%", "50%", "50%", "50%", "20%", "20%", "20%", "20%", "20%"],
                top: ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"],
                opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                scale: [0.9, 0.9, 1, 1, 1.1, 1.1, 1, 1, 0.9, 0.9]
              }}
              transition={{ duration: 10, repeat: Infinity, times: [0, 0.28, 0.32, 0.4, 0.42, 0.55, 0.6, 0.8, 0.85, 1] }}
            >
              <img src="/qopy.png" alt="qopy app" className="w-12 h-12 rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.5)] border border-[#00FF41]/50 object-contain bg-black" />
              <span className="text-[10px] font-pixel text-white mt-2 bg-black/50 px-1 rounded">qopy.app</span>
            </motion.div>

            {/* Cursor */}
            <motion.div 
              className="absolute z-30"
              style={{ x: "-20%", y: "-10%" }}
              animate={{ 
                left: ["50%", "85%", "85%", "85%", "85%", "85%", "85%", "85%", "85%", "50%", "50%", "50%", "20%", "20%", "50%", "50%"],
                top: ["80%", "15%", "15%", "15%", "15%", "35%", "35%", "35%", "35%", "50%", "50%", "50%", "50%", "50%", "80%", "80%"],
                scale: [1, 1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 0.8, 0.8, 1, 1, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, times: [0, 0.1, 0.13, 0.14, 0.16, 0.2, 0.22, 0.24, 0.26, 0.35, 0.4, 0.42, 0.55, 0.6, 0.8, 1] }}
            >
              <MousePointer2 className="w-6 h-6 text-[#00FF41] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-black" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Troubleshooting Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-4">TROUBLESHOOTING</h2>
          <p className="text-zinc-400 font-sans">If "qopy" was blocked on first launch, follow these steps:</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg border-2 border-[#00FF41] overflow-hidden flex items-center justify-center p-2">
                <img src="/first.webp" alt="System Preferences Privacy & Security" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-lg text-white mb-2">STEP 1</h3>
                <p className="text-sm text-zinc-400 font-sans">Go to <strong>System Settings</strong> → <strong>Privacy & Security</strong>, scroll down, and click <strong>"Open Anyway"</strong></p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg border-2 border-[#00FF41] overflow-hidden flex items-center justify-center p-2">
                <img src="/second.webp" alt="Click Open Anyway Again" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-lg text-white mb-2">STEP 2</h3>
                <p className="text-sm text-zinc-400 font-sans">A second popup will appear. Click <strong>"Open Anyway"</strong> again, then enter your <strong>computer password</strong> when prompted.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg border-2 border-[#00FF41] overflow-hidden flex items-center justify-center p-2">
                <img src="/fourth.png" alt="Accessibility Permission" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-lg text-white mb-2">STEP 3</h3>
                <p className="text-sm text-zinc-400 font-sans">A popup will request <strong>accessibility</strong> access. Click <strong>"Open System Settings"</strong> and enable qopy.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg border-2 border-[#00FF41] overflow-hidden flex items-center justify-center p-2">
                <img src="/five.png" alt="Screen Recording Permission" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-lg text-white mb-2">STEP 4</h3>
                <p className="text-sm text-zinc-400 font-sans">A popup will request <strong>screen recording</strong> access. Click <strong>"Open System Settings"</strong> and enable qopy.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg border-2 border-[#00FF41] overflow-hidden flex items-center justify-center p-2">
                <img src="/third.webp" alt="Allow Screen Recording" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-lg text-white mb-2">STEP 5</h3>
                <p className="text-sm text-zinc-400 font-sans">Click <strong>Allow</strong> to grant screen recording permission. If another popup appears, allow that too.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <div className="text-center border-t border-zinc-900 pt-32 pb-16">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-8">READY TO QOPY?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg" target="_blank" rel="noopener noreferrer" className="no-underline" onClick={() => track('download_click_bottom')}>
            <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Download for Mac
            </Button>
            </a>
            <a href="https://github.com/Srihar1-raman/qopy-releases/raw/main/qopy-windows.exe" target="_blank" rel="noopener noreferrer" className="no-underline" onClick={() => track('download_click_windows_bottom')}>
            <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Download for Windows
            </Button>
            </a>
          </div>
          <p className="mt-3 text-xs text-zinc-500 font-pixel uppercase">Windows hotkey: Ctrl + Alt + Q</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#00FF41]/20 bg-black py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/qopy.png" alt="qopy logo" className="w-5 h-5 rounded object-contain bg-black" />
            <span className="font-pixel text-lg text-zinc-400">qopy</span>
          </div>
          <p className="text-xs text-zinc-600 font-sans">
            &copy; {new Date().getFullYear()} qopy app. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setShowTerms(true)} className="text-xs text-zinc-600 hover:text-[#00FF41] font-pixel uppercase cursor-pointer bg-transparent border-none">Terms</button>
            <button onClick={() => setShowPrivacy(true)} className="text-xs text-zinc-600 hover:text-[#00FF41] font-pixel uppercase cursor-pointer bg-transparent border-none">Privacy</button>
            <a href="#" className="text-xs text-zinc-600 hover:text-[#00FF41] font-pixel uppercase">Contact</a>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowTerms(false)}>
          <div className="bg-zinc-900 border-2 border-[#00FF41] rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-pixel text-white">TERMS OF SERVICE</h2>
              <button onClick={() => setShowTerms(false)} className="text-zinc-400 hover:text-white bg-transparent border-none cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-zinc-300 font-sans text-sm space-y-4">
              <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">1. ACCEPTANCE OF TERMS</h3>
              <p>By downloading, installing, or using qopy, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the application.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">2. USE OF SOFTWARE</h3>
              <p>qopy is provided "as is" for personal use on macOS devices. You may not copy, modify, distribute, sell, or lease any part of the software without prior written consent.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">3. TECHNOLOGY</h3>
              <p>qopy utilizes Apple's native on-device Optical Character Recognition (OCR) technology (Vision Framework) to extract text from screen content. All text recognition processing occurs locally on your device. No images, screenshots, or extracted text are transmitted to any external servers.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">4. PRIVACY & DATA</h3>
              <p>qopy does not collect, store, or transmit any personal data, usage analytics, or user content. The application operates entirely offline. When screen recording permission is granted, qopy captures screen content solely for performing OCR text extraction within the application memory. This data is not saved, logged, or shared with any third party.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">5. PERMISSIONS</h3>
              <p>qopy requires certain macOS permissions to function: screen recording and accessibility. These permissions are used exclusively for capturing screen content and enabling global hotkeys. The permissions are not used for any purpose other than core text extraction functionality.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">6. DISCLAIMER</h3>
              <p>qopy is provided without warranties of any kind, express or implied. The software is not guaranteed to be error-free or uninterrupted. Use of the software is at the user's own risk.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">7. LIMITATION OF LIABILITY</h3>
              <p>In no event shall the developers of qopy be liable for any damages arising out of the use or inability to use the software, including but not limited to loss of data, profits, or business interruption.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">8. WEBSITE ANALYTICS</h3>
              <p>The qopy website uses Vercel Analytics for traffic analysis. This applies only to the website at qopy.app, not to the downloaded application. The downloaded .dmg file does not contain any analytics or tracking functionality.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">9. CONTACT</h3>
              <p>For questions about these terms, contact through the GitHub repository or Twitter.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowPrivacy(false)}>
          <div className="bg-zinc-900 border-2 border-[#00FF41] rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-pixel text-white">PRIVACY POLICY</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-zinc-400 hover:text-white bg-transparent border-none cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-zinc-300 font-sans text-sm space-y-4">
              <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">1. PRIVACY COMMITMENT</h3>
              <p>qopy operates entirely offline. All text recognition happens locally on the device using Apple's Vision Framework.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">2. WHAT IS NOT COLLECTED</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>No personal information</li>
                <li>No usage analytics or telemetry</li>
                <li>No screenshots or images</li>
                <li>No extracted text or clipboard content</li>
                <li>No device or usage statistics</li>
                <li>No cookies or tracking</li>
              </ul>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">3. HOW qopy WORKS</h3>
              <p>qopy uses Apple's built-in Vision Framework (OCR) to recognize text from screen content. When qopy is used:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Screen content is captured temporarily in memory only</li>
                <li>Text recognition is performed entirely on-device using Apple's native APIs</li>
                <li>Extracted text is copied directly to the clipboard</li>
                <li>All data is discarded immediately after processing</li>
                <li>Nothing is saved, stored, or transmitted</li>
              </ul>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">4. NO NETWORK TRANSMISSION</h3>
              <p>qopy does not make any network requests. The application does not connect to the internet for its core functionality. There is no server, cloud service, or third-party API involved in the text extraction process.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">5. PERMISSIONS EXPLAINED</h3>
              <p>qopy requires macOS permissions to function:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Screen Recording:</strong> Required to capture screen content for text extraction. Used only when qopy is actively invoked.</li>
                <li><strong>Accessibility:</strong> Required to enable global keyboard shortcuts. Not used for any other purpose.</li>
              </ul>
              <p className="mt-2">These permissions are granted through macOS system settings and can be revoked at any time.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">6. THIRD PARTIES</h3>
              <p>qopy does not share any data with third parties. There are no analytics providers, advertising networks, or affiliate partners.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">7. CHANGES TO POLICY</h3>
              <p>If this policy is updated, it will be to clarify practices. The fundamental commitment to privacy will not change.</p>
              
              <h3 className="text-[#00FF41] font-pixel text-lg mt-4">8. CONTACT</h3>
              <p>For privacy concerns or questions, contact through the GitHub repository.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
