import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { CVUploadModal } from "../cv/modal/EditPageModal";
import { useSectionContext } from "../shared/SectionContext";
import "./Header.scss";

export const SectionLinks = () => {
  const { sections, activeSectionId, setActiveSectionId } = useSectionContext();

  return (
    <>
      {sections.map((section) => (
        <Nav.Link
          key={section.id}
          active={section.id === activeSectionId}
          href={`/#${section.id}`}
          onClick={() => setActiveSectionId(section.id)}
        >
          {section.title}
        </Nav.Link>
      ))}
    </>
  );
};

export const Header = () => {
  const [show, setShow] = useState<boolean>(false);

  function handleUploadCVOnClick() {
    setShow(true);
  }

  return (
    <>
      <Navbar className="header bg-body-secondary w-100 px-3 navbar-sticky">
        <Navbar.Brand href="/">My Portfolio</Navbar.Brand>
        <Navbar.Collapse className="justify-content-between">
          <Nav className="align-items-center">
            <SectionLinks />
            <Nav.Link
              className="d-flex align-items-center"
              onClick={() => handleUploadCVOnClick()}
            >
              Upload CV
              <i className="bi bi-upload fs-5 text-secondary ps-2" />
            </Nav.Link>
          </Nav>
          <div>
            <SocialMediaLinks />
          </div>
        </Navbar.Collapse>
      </Navbar>
      <CVUploadModal show={show} setShow={setShow} />
    </>
  );
};
