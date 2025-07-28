import React from 'react';
import './home-page.scss';
import { AboutMePage } from '../about-me-page/about-me-page';
import { ProjectsPage } from '../projects-page/projects-page';
import { usePageHeight } from '../../hooks/usePageHeight';

const HomePageIntroduction = () => {
  const height = usePageHeight();
  return (
    <div id="home" className="home-page container-fluid d-flex flex-column text-center align-items-center justify-content-center section--height" style={{height}}>
      <h1>Welcome to my portfolio</h1>
      <p>This is the home page content.</p>
    </div>
  )
}

export const HomePage = () => {


  return (
    <div className='container d-flex flex-column home-page--height justify-content-center'>
      <HomePageIntroduction />
      <AboutMePage />
      <ProjectsPage isOverview={true} projectLimit={4} />
    </div>
  );
};
