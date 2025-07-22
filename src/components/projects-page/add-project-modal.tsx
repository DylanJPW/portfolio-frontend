import { Button, Form, Modal } from "react-bootstrap";
import { Project } from "./types";
import { useState } from "react";
import { useAppDispatch } from "../../config/store";
import { addProject, getProjects } from "./projects.reducer";

interface AddProjectModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const AddProjectModal = ({show, setShow}: AddProjectModalProps) => {
  const dispatch = useAppDispatch();

  const [newProject, setNewProject] = useState<Project>({} as Project);
  

  function handleOnClose() {
    setShow(false);
  }

  async function handleOnSave() {
    await dispatch(addProject(newProject));
    dispatch(getProjects());
    setShow(false);
  }

  return (<Modal show={show}>
    <Modal.Header closeButton onHide={() => handleOnClose()}>
      <Modal.Title>Add Project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="Enter project name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repository Link</Form.Label>
            <Form.Control
              type="url"
              value={newProject.repoLink}
              onChange={(e) => setNewProject({...newProject, repoLink: e.target.value})}
              placeholder="https://github.com/..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={newProject.tags}
              onChange={(e) => setNewProject({...newProject, tags: e.target.value.replace(' ', '').split(',')})}
              placeholder="React, Spring Boot, Fullstack"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="url"
              value={newProject.image?.imageUrl}
              onChange={(e) => setNewProject({...newProject, image: {...newProject.image, imageUrl: e.target.value}})}
            />
            <Form.Label>Image Alt Text</Form.Label>
            <Form.Control
              type="text"
              value={newProject.image?.altText}
              onChange={(e) => setNewProject({...newProject, image: {...newProject.image, altText: e.target.value}})}
            />
          </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => handleOnClose()}>Close</Button>
      <Button variant="primary" onClick={() => handleOnSave()}>Save Changes</Button>
    </Modal.Footer>
  </Modal>);
}