import React from 'react';
import { motion } from 'framer-motion';
import PersonalInfoForm from '@/components/cv/form-sections/PersonalInfoForm';
import ExperienceForm from '@/components/cv/form-sections/ExperienceForm';
import EducationForm from '@/components/cv/form-sections/EducationForm';
import SkillsForm from '@/components/cv/form-sections/SkillsForm';
import LanguagesForm from '@/components/cv/form-sections/LanguagesForm';
import TemplateSelector from '@/components/cv/TemplateSelector';

const CVForm = ({
  formData,
  updatePersonalInfo,
  addExperience,
  addEducation,
  addSkill,
  addLanguage,
  removeItem,
  updateItem,
  templates,
  selectedTemplate,
  setSelectedTemplate,
  generateCV
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PersonalInfoForm 
            personalInfo={formData.personalInfo} 
            updatePersonalInfo={updatePersonalInfo} 
          />
          <ExperienceForm 
            experience={formData.experience} 
            addExperience={addExperience} 
            removeItem={removeItem} 
            updateItem={updateItem} 
          />
          <EducationForm 
            education={formData.education} 
            addEducation={addEducation} 
            removeItem={removeItem} 
            updateItem={updateItem} 
          />
          <div className="grid md:grid-cols-2 gap-8">
            <SkillsForm
              skills={formData.skills}
              addSkill={addSkill}
              removeItem={removeItem}
              updateItem={updateItem}
            />
            <LanguagesForm
              languages={formData.languages}
              addLanguage={addLanguage}
              removeItem={removeItem}
              updateItem={updateItem}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            generateCV={generateCV}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CVForm;