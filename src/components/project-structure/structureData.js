import React from 'react';
import { Package, FileCode, Folder, FolderGit2, Image, Settings2, Shield, Wind } from 'lucide-react';

export const structure = [
  {
    name: 'public',
    type: 'folder',
    icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
    children: [{ name: 'vite.svg', type: 'file', icon: React.createElement(Image, { className: "w-4 h-4 text-green-400" }) }],
  },
  {
    name: 'src',
    type: 'folder',
    icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
    children: [
      {
        name: 'components',
        type: 'folder',
        icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
        children: [
            {
                name: 'cv',
                type: 'folder',
                icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
                children: [
                    {
                        name: 'form-sections',
                        type: 'folder',
                        icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
                        children: [
                            { name: 'EducationForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                            { name: 'ExperienceForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                            { name: 'LanguagesForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                            { name: 'PersonalInfoForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                            { name: 'SkillsForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                        ]
                    },
                    { name: 'CVForm.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'CVPreview.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'TemplateSelector.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                ]
            },
            {
                name: 'project-structure',
                type: 'folder',
                icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
                children: [
                    { name: 'ProjectStructure.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'TreeNode.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'structureData.js', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                ]
            },
            {
                name: 'ui',
                type: 'folder',
                icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
                children: [
                    { name: 'button.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'toast.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'toaster.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                    { name: 'use-toast.js', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
                ]
            },
        ],
      },
      {
        name: 'hooks',
        type: 'folder',
        icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
        children: [{ name: 'useCVForm.js', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) }],
      },
      {
        name: 'lib',
        type: 'folder',
        icon: React.createElement(Folder, { className: "w-4 h-4 text-blue-400" }),
        children: [{ name: 'utils.js', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) }],
      },
      { name: 'App.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
      { name: 'index.css', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-pink-400" }) },
      { name: 'main.jsx', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-yellow-400" }) },
    ],
  },
  { name: '.gitignore', type: 'file', icon: React.createElement(FolderGit2, { className: "w-4 h-4 text-red-400" }) },
  { name: 'index.html', type: 'file', icon: React.createElement(FileCode, { className: "w-4 h-4 text-orange-400" }) },
  { name: 'package.json', type: 'file', icon: React.createElement(Package, { className: "w-4 h-4 text-red-500" }) },
  { name: 'package-lock.json', type: 'file', icon: React.createElement(Shield, { className: "w-4 h-4 text-green-500" }) },
  { name: 'postcss.config.js', type: 'file', icon: React.createElement(Settings2, { className: "w-4 h-4 text-gray-400" }) },
  { name: 'tailwind.config.js', type: 'file', icon: React.createElement(Wind, { className: "w-4 h-4 text-cyan-400" }) },
  { name: 'vite.config.js', type: 'file', icon: React.createElement(Settings2, { className: "w-4 h-4 text-purple-400" }) },
];