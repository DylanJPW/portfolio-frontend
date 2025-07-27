import React from 'react';
import './home-page.scss';
import { AboutMePage } from '../about-me-page/about-me-page';
import { ProjectsPage } from '../projects-page/projects-page';

const HomePageIntroduction = () => {
  return (
    <div id="home" className="home-page container-fluid text-center section--height">
      <h1>Welcome to my Portfolio</h1>
      <p>This is the home page content.</p>
    </div>
  )
}

export const HomePage = () => {


  return (
    <div className='container d-flex flex-column home-page--height'>
      <HomePageIntroduction />
      <AboutMePage />
      <ProjectsPage isOverview={true} projectLimit={1} />
    </div>
  );
};
