/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Download, Command, Zap, Shield, MousePointer2, Copy, Check, File, HardDrive, Folder } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function App() {
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
            <a href="/qopy.dmg" download className="no-underline">
            <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
              <Download className="w-5 h-5" />
              Download for Mac
            </Button>
            </a>
            <p className="text-xs text-zinc-500 font-pixel uppercase">Requires macOS 12.0+</p>
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
        
        {/* Installation Demo Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-4">EASY INSTALL</h2>
          <p className="text-zinc-400 font-sans">Just drag and drop. No complex installers.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl rounded-lg border-2 border-[#00FF41] bg-zinc-900 shadow-[0_0_30px_rgba(0,255,65,0.2)] p-2 mb-32"
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
        
        {/* Bottom CTA */}
        <div className="text-center border-t border-zinc-900 pt-32 pb-16">
          <h2 className="text-3xl md:text-5xl font-pixel text-white mb-8">READY TO COPY?</h2>
          <a href="/qopy.dmg" download className="no-underline">
          <Button variant="pixel" size="lg" className="gap-2 text-lg h-14 px-8">
            <Download className="w-5 h-5" />
            Download for Mac
          </Button>
          </a>
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
            <a href="#" className="text-xs text-zinc-600 hover:text-[#00FF41] font-pixel uppercase">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
