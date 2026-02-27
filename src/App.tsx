/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import CodeViewer from './components/CodeViewer';
import WebSimulation from './components/WebSimulation';
import { Download } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { androidFiles } from './data/androidFiles';

export default function App() {
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    
    androidFiles.forEach(file => {
      zip.file(file.name, file.content);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'AVU_DEV_FF_MOD.zip');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500/30">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              AVU DEV - FF MOD
            </h1>
            <p className="text-gray-400 mt-1">DEV APP BY AVUDEV9</p>
          </div>

          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95"
          >
            <Download size={20} />
            Tải Full Source Code (ZIP)
          </button>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Cột 1: Web Simulation */}
          <div className="flex flex-col h-[calc(100vh-140px)]">
            <h2 className="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              Live Web Simulation
            </h2>
            <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <WebSimulation />
            </div>
          </div>

          {/* Cột 2: Android Source Code */}
          <div className="flex flex-col h-[calc(100vh-140px)]">
            <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Android Source Code
            </h2>
            <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e]">
              <CodeViewer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

