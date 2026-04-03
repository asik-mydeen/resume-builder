import { ResumeData, formatDate } from '@/types/resume';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects } = data;
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.linkedin, personal.website].filter(Boolean);

  return (
    <div className="px-10 py-8" style={{ fontFamily: "'Inter', 'Helvetica Neue', -apple-system, sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        {personal.fullName && <h1 className="text-[26px] font-light text-gray-900 tracking-tight">{personal.fullName}</h1>}
        {personal.title && <p className="text-[13px] text-gray-400 mt-0.5 font-medium">{personal.title}</p>}
        {contactParts.length > 0 && <p className="text-[11px] text-gray-500 mt-2">{contactParts.join('  ·  ')}</p>}
        {linkParts.length > 0 && <p className="text-[11px] text-gray-400 mt-0.5">{linkParts.join('  ·  ')}</p>}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-[12px] text-gray-600 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold text-gray-900 uppercase tracking-[0.15em] mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[13px] font-semibold text-gray-900">{exp.position}</span>
                    {exp.company && <span className="text-[12px] text-gray-400 ml-2">{[exp.company, exp.location].filter(Boolean).join(', ')}</span>}
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap ml-3">{formatDate(exp.startDate)}{(exp.startDate || exp.endDate || exp.current) && ' – '}{exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.split('\n').filter(Boolean).map((h, i) => (
                      <li key={i} className="text-[12px] text-gray-600 leading-relaxed pl-3 relative">
                        <span className="absolute left-0 text-gray-300">–</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold text-gray-900 uppercase tracking-[0.15em] mb-3">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-[13px] font-semibold text-gray-900">{[edu.degree, edu.field].filter(Boolean).join(' in ')}</span>
                  {edu.institution && <span className="text-[12px] text-gray-400 ml-2">{edu.institution}{edu.gpa && ` · ${edu.gpa} GPA`}</span>}
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap ml-3">{formatDate(edu.startDate)}{(edu.startDate || edu.endDate) && ' – '}{formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold text-gray-900 uppercase tracking-[0.15em] mb-2">Skills</h2>
          <div className="space-y-1">
            {skills.map((s) => (
              <p key={s.id} className="text-[12px] text-gray-600">
                {s.category && <span className="font-medium text-gray-700">{s.category}: </span>}
                {s.items}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-[11px] font-semibold text-gray-900 uppercase tracking-[0.15em] mb-3">Projects</h2>
          <div className="space-y-2.5">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-gray-900">{p.name}</span>
                  {p.link && <span className="text-[10px] text-gray-300">{p.link}</span>}
                  {p.technologies && <span className="text-[10px] text-gray-400 ml-auto">{p.technologies}</span>}
                </div>
                {p.description && <p className="text-[12px] text-gray-600 mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
