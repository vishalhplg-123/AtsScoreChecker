import React from 'react';
import { ClassicAtsTemplate } from './ClassicAtsTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { DeveloperTemplate } from './DeveloperTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';

export const TemplateRenderer = ({ resume, scale = 1 }) => {
  if (!resume) return null;

  const templateName = resume.template || 'modern';
  const customization = resume.customization || {};

  const fontFamilies = {
    inter: 'font-sans',
    merriweather: 'font-serif',
    jetbrains: 'font-mono',
    display: 'font-display',
  };

  const fontSizes = {
    small: 'text-[11px]',
    medium: 'text-[12.5px]',
    large: 'text-[13.5px]',
  };

  const margins = {
    compact: 'p-4 sm:p-6',
    normal: 'p-6 sm:p-8',
    spacious: 'p-8 sm:p-10',
  };

  const renderSelectedTemplate = () => {
    switch (templateName) {
      case 'classic':
        return <ClassicAtsTemplate resume={resume} customization={customization} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} customization={customization} />;
      case 'developer':
        return <DeveloperTemplate resume={resume} customization={customization} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} customization={customization} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} customization={customization} />;
      case 'modern':
      default:
        return <ModernTemplate resume={resume} customization={customization} />;
    }
  };

  return (
    <div
      id="resume-preview-area"
      className={`bg-white shadow-2xl rounded-sm mx-auto overflow-hidden transition-all duration-300 border border-slate-200/60 print:border-none print:shadow-none ${
        fontFamilies[customization.fontFamily] || 'font-sans'
      } ${fontSizes[customization.fontSize] || 'text-[12.5px]'}`}
      style={{
        width: '210mm',
        minHeight: '297mm', // A4 aspect ratio standard
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {renderSelectedTemplate()}
    </div>
  );
};
