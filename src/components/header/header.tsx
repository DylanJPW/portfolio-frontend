import {Navbar, Nav} from "react-bootstrap";
import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import "./Header.scss";

export const Header = () => {
  return (
    <Navbar className="header w-100 position-fixed top-0 px-3">
      <Navbar.Brand href="/">
        My Portfolio
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-between">
        <Nav className="align-items-center">
          <Nav.Link href="/#home">Home</Nav.Link>
          <Nav.Link href="/#projects-section">Projects</Nav.Link>
          <Nav.Link className="d-flex align-items-center">Upload CV<i className="bi bi-upload fs-5 text-secondary ps-2" /></Nav.Link>
        </Nav>
        <Navbar.Text >
          <SocialMediaLinks/>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}