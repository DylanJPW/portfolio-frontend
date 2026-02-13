import { useContext, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { CVUploadModal } from "../cv/modal/EditPageModal";
import { useSectionContext } from "../shared/SectionContext";
import { LoginModal } from "../login/LoginModal";
import { AuthContext } from "../login/AuthContext";
import "./Header.scss";

const SectionLinks = () => {
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

const LoginButton = ({
  setShowLoginModal,
}: {
  setShowLoginModal: (value: boolean) => void;
}) => {
  return (
    <div
      className="d-flex align-items-center cursor-pointer"
      onClick={() => setShowLoginModal(true)}
    >
      Admin Login
    </div>
  );
};

const LogoutButton = ({ logout }: { logout: () => void }) => {
  return (
    <div
      className="d-flex align-items-center cursor-pointer"
      onClick={() => logout()}
    >
      Log Out
    </div>
  );
};

export const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  function handleUploadCVOnClick() {
    setShowUploadModal(true);
  }

  return (
    <>
      <Navbar className="header bg-body-secondary w-100 px-3 navbar-sticky">
        <Navbar.Brand href="/">My Portfolio</Navbar.Brand>
        <Navbar.Collapse className="justify-content-between">
          <Nav className="align-items-center">
            <SectionLinks />
            {isLoggedIn && (
              <Nav.Link
                className="d-flex align-items-center"
                onClick={() => handleUploadCVOnClick()}
              >
                Upload CV
                <i className="bi bi-upload fs-5 text-secondary ps-2" />
              </Nav.Link>
            )}
          </Nav>
          <div className="flex flex-row gap-3">
            {isLoggedIn ? (
              <LogoutButton logout={logout} />
            ) : (
              <LoginButton setShowLoginModal={setShowLoginModal} />
            )}
            <SocialMediaLinks />
          </div>
        </Navbar.Collapse>
      </Navbar>
      <CVUploadModal show={showUploadModal} setShow={setShowUploadModal} />
      <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
    </>
  );
};
