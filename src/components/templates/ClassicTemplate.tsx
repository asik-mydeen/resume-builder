import { ResumeData, formatDate } from '@/types/resume';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects } = data;
  const contactParts = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean);

  return (
    <div className="px-10 py-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Header */}
      <div className="text-center mb-1">
        {personal.fullName && <h1 className="text-[22px] font-bold text-gray-900 tracking-[0.15em] uppercase">{personal.fullName}</h1>}
        {personal.title && <p className="text-[13px] text-gray-500 mt-0.5 tracking-wide">{personal.title}</p>}
      </div>
      {contactParts.length > 0 && (
        <p className="text-center text-[11px] text-gray-500 mt-1.5">
          {contactParts.map((part, i) => (<span key={i}>{i > 0 && <span className="mx-1.5 text-gray-300">|</span>}{part}</span>))}
        </p>
      )}

      {/* Summary */}
      {summary && (
        <div className="mt-5">
          <h2 className="text-[11px] font-bold text-gray-900 tracking-[0.2em] uppercase border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-[12px] text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mt-5">
          <h2 className="text-[11px] font-bold text-gray-900 tracking-[0.2em] uppercase border-b border-gray-300 pb-1 mb-3">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-[11px] text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.startDate)}{(exp.startDate || exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="text-[12px] text-gray-600 italic">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                {exp.highlights && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.split('\n').filter(Boolean).map((h, i) => (
                      <li key={i} className="text-[12px] text-gray-700 leading-relaxed flex">
                        <span className="mr-2 text-gray-400">•</span>
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mt-5">
          <h2 className="text-[11px] font-bold text-gray-900 tracking-[0.2em] uppercase border-b border-gray-300 pb-1 mb-3">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold text-gray-900">{edu.institution}</h3>
                  <span className="text-[11px] text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.startDate)}{(edu.startDate || edu.endDate) && ' — '}{formatDate(edu.endDate)}</span>
                </div>
                <p className="text-[12px] text-gray-600">{[edu.degree, edu.field].filter(Boolean).join(' in ')}{edu.gpa && <span className="text-gray-400"> · GPA: {edu.gpa}</span>}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-5">
          <h2 className="text-[11px] font-bold text-gray-900 tracking-[0.2em] uppercase border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="space-y-1">
            {skills.map((s) => (
              <p key={s.id} className="text-[12px] text-gray-700"><span className="font-semibold text-gray-800">{s.category}:</span> {s.items}</p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mt-5">
          <h2 className="text-[11px] font-bold text-gray-900 tracking-[0.2em] uppercase border-b border-gray-300 pb-1 mb-3">Projects</h2>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[13px] font-bold text-gray-900">{p.name}</h3>
                  {p.link && <span className="text-[11px] text-gray-400">{p.link}</span>}
                </div>
                {p.description && <p className="text-[12px] text-gray-700 mt-0.5">{p.description}</p>}
                {p.technologies && <p className="text-[11px] text-gray-500 mt-0.5 italic">{p.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
