'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResumeData, TemplateName, createEmptyResume, sampleResume } from '@/types/resume';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';

const DATA_KEY = 'rb-data';
const TPL_KEY = 'rb-tpl';

export default function Home() {
  const [data, setData] = useState<ResumeData>(createEmptyResume());
  const [template, setTemplate] = useState<TemplateName>('modern');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const d = localStorage.getItem(DATA_KEY);
      if (d) setData(JSON.parse(d));
      const t = localStorage.getItem(TPL_KEY);
      if (t) setTemplate(t as TemplateName);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(TPL_KEY, template);
  }, [template, ready]);

  const handlePrint = useCallback(() => window.print(), []);
  const handleSample = useCallback(() => setData(sampleResume), []);
  const handleClear = useCallback(() => {
    if (window.confirm('Clear all resume data? This cannot be undone.')) setData(createEmptyResume());
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="no-print bg-white border-b border-gray-200 px-3 sm:px-5 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-xl">📄</span>
            <span className="hidden sm:inline">Resume Builder</span>
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile view toggle */}
          <div className="flex md:hidden bg-gray-100 rounded-lg p-0.5 mr-1">
            <button onClick={() => setView('edit')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'edit' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Edit</button>
            <button onClick={() => setView('preview')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Preview</button>
          </div>

          <button onClick={handleSample} className="hidden sm:inline-flex text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Load Sample</button>
          <button onClick={handleClear} className="hidden sm:inline-flex text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors">Clear All</button>
          <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            PDF
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className={`w-full md:w-[44%] lg:w-[40%] overflow-y-auto scrollbar-thin form-panel border-r border-gray-200 bg-gray-50 ${view === 'preview' ? 'hidden md:block' : ''}`}>
          <ResumeForm data={data} onChange={setData} onLoadSample={handleSample} />
        </div>
        <div className={`w-full md:w-[56%] lg:w-[60%] overflow-y-auto scrollbar-thin preview-panel bg-stone-200 ${view === 'edit' ? 'hidden md:block' : ''}`}>
          <ResumePreview data={data} template={template} onTemplateChange={setTemplate} />
        </div>
      </div>
    </div>
  );
}
