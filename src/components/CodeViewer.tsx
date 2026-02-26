import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { androidFiles } from '../data/androidFiles';
import { FileCode2, Copy, Check } from 'lucide-react';

export default function CodeViewer() {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = androidFiles[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#252526] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Files</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {androidFiles.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveFileIndex(index)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors ${
                activeFileIndex === index
                  ? 'bg-[#37373d] text-white'
                  : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200'
              }`}
            >
              <FileCode2 size={16} className={activeFileIndex === index ? 'text-blue-400' : 'text-gray-500'} />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1e1e1e]">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FileCode2 size={16} className="text-blue-400" />
            {activeFile.name}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <SyntaxHighlighter
            language={activeFile.language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
            }}
            showLineNumbers={true}
          >
            {activeFile.content}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
