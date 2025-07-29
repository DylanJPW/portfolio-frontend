import React from 'react';
import './home-page.scss';
import { AboutMePage } from '../about-me-page/about-me-page';
import { ProjectsPage } from '../projects-page/projects-page';

export const HomePage = () => {
  return (
    <div className='container d-flex flex-column home-page--height justify-content-center'>
      <AboutMePage />
      <ProjectsPage isOverview={true} projectLimit={4} />
    </div>
  );
};
