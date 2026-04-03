import { ResumeData, formatDate } from '@/types/resume';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects } = data;
  const contacts = [
    personal.email && { icon: '✉', value: personal.email },
    personal.phone && { icon: '☎', value: personal.phone },
    personal.location && { icon: '📍', value: personal.location },
    personal.linkedin && { icon: '🔗', value: personal.linkedin },
    personal.website && { icon: '🌐', value: personal.website },
  ].filter(Boolean) as { icon: string; value: string }[];

  return (
    <div className="flex min-h-[1100px]" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Sidebar */}
      <div className="w-[220px] bg-slate-800 text-white p-6 flex-shrink-0">
        {/* Name in sidebar */}
        <div className="mb-6">
          {personal.fullName && <h1 className="text-lg font-bold leading-tight">{personal.fullName}</h1>}
          {personal.title && <p className="text-[11px] text-slate-300 mt-1 leading-snug">{personal.title}</p>}
        </div>

        {/* Contact */}
        {contacts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Contact</h2>
            <div className="space-y-1.5">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] mt-0.5 opacity-70">{c.icon}</span>
                  <span className="text-[11px] text-slate-200 leading-snug break-all">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Skills</h2>
            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.id}>
                  {s.category && <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider mb-1">{s.category}</p>}
                  <p className="text-[11px] text-slate-300 leading-relaxed">{s.items}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in sidebar */}
        {education.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[11px] font-semibold text-white leading-snug">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{edu.institution}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(edu.startDate)}{(edu.startDate || edu.endDate) && ' – '}{formatDate(edu.endDate)}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-7">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-2">About</h2>
            <p className="text-[12px] text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[13px] font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-3 font-medium">{formatDate(exp.startDate)}{(exp.startDate || exp.endDate || exp.current) && ' – '}{exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <p className="text-[11px] text-blue-600/80 font-medium">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                  {exp.highlights && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.split('\n').filter(Boolean).map((h, i) => (
                        <li key={i} className="text-[12px] text-gray-600 leading-relaxed flex">
                          <span className="mr-2 text-blue-400">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[13px] font-bold text-gray-900">{p.name}</h3>
                    {p.link && <span className="text-[10px] text-gray-400">{p.link}</span>}
                  </div>
                  {p.description && <p className="text-[12px] text-gray-600 mt-0.5">{p.description}</p>}
                  {p.technologies && <p className="text-[10px] text-blue-500 mt-0.5 font-medium">{p.technologies}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
