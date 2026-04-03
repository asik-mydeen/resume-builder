'use client';

import { ResumeData, TemplateName } from '@/types/resume';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';

interface Props {
  data: ResumeData;
  template: TemplateName;
  onTemplateChange: (t: TemplateName) => void;
}

const TPL_OPTIONS: { id: TemplateName; label: string; desc: string }[] = [
  { id: 'classic', label: 'Classic', desc: 'Traditional' },
  { id: 'modern', label: 'Modern', desc: 'Two-column' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean' },
];

export default function ResumePreview({ data, template, onTemplateChange }: Props) {
  const Component = { classic: ClassicTemplate, modern: ModernTemplate, minimal: MinimalTemplate }[template];
  const hasContent = !!(data.personal.fullName || data.summary || data.experience.length > 0);

  return (
    <div className="h-full flex flex-col">
      {/* Template selector bar */}
      <div className="template-bar sticky top-0 z-10 bg-stone-200/90 backdrop-blur-sm border-b border-stone-300/50 px-4 py-2 flex items-center justify-center gap-1.5">
        {TPL_OPTIONS.map((t) => (
          <button key={t.id} onClick={() => onTemplateChange(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${template === t.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'}`}>
            <span className="capitalize">{t.label}</span>
            <span className="hidden sm:inline text-gray-400 ml-1 font-normal">· {t.desc}</span>
          </button>
        ))}
      </div>

      {/* Resume content */}
      <div className="flex-1 p-4 sm:p-6 flex justify-center">
        {hasContent ? (
          <div className="resume-page bg-white shadow-2xl w-full max-w-[850px] min-h-[1100px]">
            <Component data={data} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-30">📄</div>
              <p className="text-gray-400 text-sm font-medium">Your resume preview will appear here</p>
              <p className="text-gray-300 text-xs mt-1">Fill in the form or load sample data to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
