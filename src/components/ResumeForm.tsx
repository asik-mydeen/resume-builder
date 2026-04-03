'use client';

import { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem, SkillCategory, ProjectItem, generateId } from '@/types/resume';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onLoadSample: () => void;
}

const TABS = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4, hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none" />
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

export default function ResumeForm({ data, onChange, onLoadSample }: Props) {
  const [tab, setTab] = useState<TabId>('personal');

  const up = (field: keyof ResumeData['personal'], value: string) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const addExp = () => onChange({ ...data, experience: [...data.experience, { id: generateId(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, highlights: '' }] });
  const updExp = (i: number, u: Partial<ExperienceItem>) => { const a = [...data.experience]; a[i] = { ...a[i], ...u }; onChange({ ...data, experience: a }); };
  const rmExp = (i: number) => onChange({ ...data, experience: data.experience.filter((_, x) => x !== i) });

  const addEdu = () => onChange({ ...data, education: [...data.education, { id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }] });
  const updEdu = (i: number, u: Partial<EducationItem>) => { const a = [...data.education]; a[i] = { ...a[i], ...u }; onChange({ ...data, education: a }); };
  const rmEdu = (i: number) => onChange({ ...data, education: data.education.filter((_, x) => x !== i) });

  const addSkill = () => onChange({ ...data, skills: [...data.skills, { id: generateId(), category: '', items: '' }] });
  const updSkill = (i: number, u: Partial<SkillCategory>) => { const a = [...data.skills]; a[i] = { ...a[i], ...u }; onChange({ ...data, skills: a }); };
  const rmSkill = (i: number) => onChange({ ...data, skills: data.skills.filter((_, x) => x !== i) });

  const addProj = () => onChange({ ...data, projects: [...data.projects, { id: generateId(), name: '', description: '', technologies: '', link: '' }] });
  const updProj = (i: number, u: Partial<ProjectItem>) => { const a = [...data.projects]; a[i] = { ...a[i], ...u }; onChange({ ...data, projects: a }); };
  const rmProj = (i: number) => onChange({ ...data, projects: data.projects.filter((_, x) => x !== i) });

  const isEmpty = !data.personal.fullName && data.experience.length === 0;

  const badge = (count: number) => count > 0 ? <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-gray-200 text-gray-600">{count}</span> : null;

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex overflow-x-auto px-3 py-2 gap-1 scrollbar-none">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${ tab === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700' }`}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {tab !== t.id && t.id === 'experience' && badge(data.experience.length)}
              {tab !== t.id && t.id === 'education' && badge(data.education.length)}
              {tab !== t.id && t.id === 'skills' && badge(data.skills.length)}
              {tab !== t.id && t.id === 'projects' && badge(data.projects.length)}
            </button>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {isEmpty && tab === 'personal' && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl text-center">
            <p className="text-sm text-blue-800 font-medium mb-1">✨ New here?</p>
            <p className="text-xs text-blue-600 mb-2">Load sample data to see how it works</p>
            <button onClick={onLoadSample} className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors">Load Sample Resume</button>
          </div>
        )}

        {tab === 'personal' && (
          <div className="space-y-3">
            <Input label="Full Name" value={data.personal.fullName} onChange={(v) => up('fullName', v)} placeholder="Alex Johnson" />
            <Input label="Professional Title" value={data.personal.title} onChange={(v) => up('title', v)} placeholder="Senior Software Engineer" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Email" value={data.personal.email} onChange={(v) => up('email', v)} placeholder="alex@email.com" type="email" />
              <Input label="Phone" value={data.personal.phone} onChange={(v) => up('phone', v)} placeholder="(555) 123-4567" />
            </div>
            <Input label="Location" value={data.personal.location} onChange={(v) => up('location', v)} placeholder="San Francisco, CA" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="LinkedIn" value={data.personal.linkedin} onChange={(v) => up('linkedin', v)} placeholder="linkedin.com/in/alexjohnson" />
              <Input label="Website" value={data.personal.website} onChange={(v) => up('website', v)} placeholder="alexjohnson.dev" />
            </div>
          </div>
        )}

        {tab === 'summary' && (
          <div className="space-y-3">
            <TextArea label="Professional Summary" value={data.summary} onChange={(v) => onChange({ ...data, summary: v })} placeholder="Brief overview of your experience, skills, and career objectives..." rows={6} hint="2-4 sentences highlighting your key qualifications" />
          </div>
        )}

        {tab === 'experience' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{data.experience.length} position{data.experience.length !== 1 ? 's' : ''}</p>
              <button onClick={addExp} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">+ Add Position</button>
            </div>
            {data.experience.length === 0 && <div className="text-center py-12 text-gray-300"><span className="text-4xl block mb-3">💼</span><p className="text-sm">Add your work experience</p></div>}
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Position {i + 1}</span>
                  <button onClick={() => rmExp(i)} className="text-[11px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Job Title" value={exp.position} onChange={(v) => updExp(i, { position: v })} placeholder="Software Engineer" />
                  <Input label="Company" value={exp.company} onChange={(v) => updExp(i, { company: v })} placeholder="TechCorp Inc." />
                </div>
                <Input label="Location" value={exp.location} onChange={(v) => updExp(i, { location: v })} placeholder="San Francisco, CA or Remote" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Start Date" value={exp.startDate} onChange={(v) => updExp(i, { startDate: v })} type="month" />
                  <div>
                    {!exp.current && <Input label="End Date" value={exp.endDate} onChange={(v) => updExp(i, { endDate: v })} type="month" />}
                    {exp.current && <div><label className="block text-xs font-medium text-gray-500 mb-1">End Date</label><div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">Present</div></div>}
                    <label className="flex items-center gap-1.5 mt-2 cursor-pointer">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updExp(i, { current: e.target.checked, endDate: '' })} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-xs text-gray-500">I currently work here</span>
                    </label>
                  </div>
                </div>
                <TextArea label="Key Achievements" value={exp.highlights} onChange={(v) => updExp(i, { highlights: v })} placeholder="One achievement per line, e.g.:\nLed migration to microservices reducing deploy time by 70%\nBuilt notification system serving 2M+ users" rows={4} hint="One bullet point per line" />
              </div>
            ))}
          </div>
        )}

        {tab === 'education' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{data.education.length} entr{data.education.length !== 1 ? 'ies' : 'y'}</p>
              <button onClick={addEdu} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">+ Add Education</button>
            </div>
            {data.education.length === 0 && <div className="text-center py-12 text-gray-300"><span className="text-4xl block mb-3">🎓</span><p className="text-sm">Add your education</p></div>}
            {data.education.map((edu, i) => (
              <div key={edu.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Education {i + 1}</span>
                  <button onClick={() => rmEdu(i)} className="text-[11px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                </div>
                <Input label="Institution" value={edu.institution} onChange={(v) => updEdu(i, { institution: v })} placeholder="University of California, Berkeley" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Degree" value={edu.degree} onChange={(v) => updEdu(i, { degree: v })} placeholder="Bachelor of Science" />
                  <Input label="Field of Study" value={edu.field} onChange={(v) => updEdu(i, { field: v })} placeholder="Computer Science" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Input label="Start Date" value={edu.startDate} onChange={(v) => updEdu(i, { startDate: v })} type="month" />
                  <Input label="End Date" value={edu.endDate} onChange={(v) => updEdu(i, { endDate: v })} type="month" />
                  <Input label="GPA" value={edu.gpa} onChange={(v) => updEdu(i, { gpa: v })} placeholder="3.8" />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'skills' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{data.skills.length} categor{data.skills.length !== 1 ? 'ies' : 'y'}</p>
              <button onClick={addSkill} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">+ Add Category</button>
            </div>
            {data.skills.length === 0 && <div className="text-center py-12 text-gray-300"><span className="text-4xl block mb-3">⚡</span><p className="text-sm">Add your skill categories</p></div>}
            {data.skills.map((skill, i) => (
              <div key={skill.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Category {i + 1}</span>
                  <button onClick={() => rmSkill(i)} className="text-[11px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                </div>
                <Input label="Category Name" value={skill.category} onChange={(v) => updSkill(i, { category: v })} placeholder="Programming Languages" />
                <Input label="Skills (comma-separated)" value={skill.items} onChange={(v) => updSkill(i, { items: v })} placeholder="JavaScript, TypeScript, Python, Go" />
              </div>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{data.projects.length} project{data.projects.length !== 1 ? 's' : ''}</p>
              <button onClick={addProj} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">+ Add Project</button>
            </div>
            {data.projects.length === 0 && <div className="text-center py-12 text-gray-300"><span className="text-4xl block mb-3">🚀</span><p className="text-sm">Add your projects</p></div>}
            {data.projects.map((proj, i) => (
              <div key={proj.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Project {i + 1}</span>
                  <button onClick={() => rmProj(i)} className="text-[11px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Project Name" value={proj.name} onChange={(v) => updProj(i, { name: v })} placeholder="My Cool Project" />
                  <Input label="Link" value={proj.link} onChange={(v) => updProj(i, { link: v })} placeholder="github.com/user/project" />
                </div>
                <TextArea label="Description" value={proj.description} onChange={(v) => updProj(i, { description: v })} placeholder="Brief description of the project..." rows={3} />
                <Input label="Technologies" value={proj.technologies} onChange={(v) => updProj(i, { technologies: v })} placeholder="React, Node.js, PostgreSQL" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
