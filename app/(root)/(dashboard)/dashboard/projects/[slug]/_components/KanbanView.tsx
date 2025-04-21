'use client'
import React from 'react';
import ProjectKanbanView from './KanbanListView';
import { useParams } from 'next/navigation';




const ProjectPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const projectSlug = slug || '';
  return (
    <div>
      <ProjectKanbanView slug= {projectSlug} />
    </div>
  );
};

export default ProjectPage;