import React, { useState } from 'react';

const initialData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: []
};

export const useCVForm = () => {
  const [formData, setFormData] = useState(initialData);

  const updatePersonalInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        institution: '',
        year: '',
        description: ''
      }]
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'متوسط' }]
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now(), name: '', level: 'متوسط' }]
    }));
  };

  const removeItem = (section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const updateItem = (section, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };
  
  return {
    formData,
    updatePersonalInfo,
    addExperience,
    addEducation,
    addSkill,
    addLanguage,
    removeItem,
    updateItem
  };
};