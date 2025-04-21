import React from 'react';
import ProjectKanbanView from './_components/KanbanListView';


const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;
console.log('====================================');
console.log(slug);
console.log('====================================');


  return (
    <div>
      {slug}
    </div>
  );
};

export default ProjectPage;