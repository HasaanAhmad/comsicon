import React from 'react';
import ProjectKanbanView from './_components/KanbanListView';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  // Use "paam" as the slug value
  const projectSlug = params.slug;
  console.log('====================================');
  console.log(projectSlug);
  console.log('====================================');
  
  return (
    <div>
      <ProjectKanbanView slug= {projectSlug} />
    </div>
  );
};

export default ProjectPage;