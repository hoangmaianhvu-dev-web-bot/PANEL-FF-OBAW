/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import WebSimulation from './components/WebSimulation';

export default function App() {
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
        </header>

        <main className="relative">
          <WebSimulation />
        </main>
      </div>
    </div>
  );
}

