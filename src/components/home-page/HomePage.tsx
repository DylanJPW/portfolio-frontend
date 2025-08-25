import { AboutMePage } from "../about-me-page/AboutMePage";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div
      id="home"
      className="d-flex flex-column justify-content-center w-100"
    >
      <AboutMePage />
    </div>
  );
};
