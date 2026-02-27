/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import CodeViewer from './components/CodeViewer';
import WebSimulation from './components/WebSimulation';
import { Code2, Smartphone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'code'>('simulation');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              AVU DEV - FF MOD
            </h1>
            <p className="text-gray-400 mt-1">DEV APP BY AVUDEV9</p>
          </div>

          <div className="flex bg-[#1e1e1e] p-1 rounded-lg border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'simulation'
                  ? 'bg-yellow-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone size={16} />
              Web Simulation
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-yellow-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 size={16} />
              Android Source Code
            </button>
          </div>
        </header>

        <main className="relative">
          {activeTab === 'simulation' ? (
            <div className="flex flex-col h-[calc(100vh-140px)]">
              <h2 className="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                Live Web Simulation
              </h2>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <WebSimulation />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-140px)]">
              <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Android Source Code
              </h2>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e]">
                <CodeViewer />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

