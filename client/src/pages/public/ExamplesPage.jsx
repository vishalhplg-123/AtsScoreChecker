import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ExamplesPage = () => {
  const examples = [
    {
      title: 'Senior MERN / Full Stack Developer',
      role: 'Full Stack Engineer',
      atsScore: 94,
      experience: '4+ Years',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      desc: 'High impact metrics, sub-second API latency achievements, and modern tech stack tags.',
    },
    {
      title: 'Frontend React & Next.js Specialist',
      role: 'Frontend Developer',
      atsScore: 92,
      experience: '3 Years',
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Core Web Vitals'],
      desc: 'Focus on UI performance, component design systems, and responsive web accessibility.',
    },
    {
      title: 'Junior Software Engineer / Fresher',
      role: 'Software Engineer',
      atsScore: 88,
      experience: 'Fresher / Entry',
      skills: ['JavaScript', 'HTML5/CSS3', 'React', 'Git', 'Data Structures'],
      desc: 'Project-centric layout highlighting academic achievements, hackathon awards, and coding projects.',
    },
    {
      title: 'Engineering Lead & Cloud Architect',
      role: 'Lead Architect',
      atsScore: 96,
      experience: '8+ Years',
      skills: ['System Design', 'Microservices', 'Kubernetes', 'Team Leadership'],
      desc: 'Executive format emphasizing team leadership, multi-million dollar business impact, and governance.',
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 font-display">
          Resume Examples That Landed Top Offers
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Explore realistic, recruiter-verified resume templates across various experience levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {examples.map((ex, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle hover:shadow-premium transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{ex.experience}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ATS Score: {ex.atsScore}/100
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{ex.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ex.desc}</p>

              <div className="flex flex-wrap gap-1 pt-2">
                {ex.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10.5px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/register">
              <Button variant="outline" size="sm" className="w-full">
                Create Similar Resume
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
