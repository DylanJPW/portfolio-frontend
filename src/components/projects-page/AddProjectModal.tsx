import { Button, Form, Modal } from "react-bootstrap";
import { Project } from "./types";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../config/store";
import { addProject, getProjects, updateProject } from "./projects.reducer";

interface AddProjectModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  project: Project;
}

export const AddProjectModal = ({
  show,
  setShow,
  project,
}: AddProjectModalProps) => {
  const dispatch = useAppDispatch();

  const [newProject, setNewProject] = useState<Project>({} as Project);

  useEffect(() => {
    setNewProject(project);
  }, [project]);

  function handleOnClose() {
    setNewProject({} as Project);
    setShow(false);
  }

  async function handleOnSave() {
    if (!!project?.id) await dispatch(updateProject(newProject));
    if (!project?.id) await dispatch(addProject(newProject));
    dispatch(getProjects());
    setShow(false);
  }

  const title = useMemo<string>(
    () => (project?.id ? `Edit Project ${project.name}` : "Add Project"),
    [show],
  );

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={() => handleOnClose()}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={project.name}
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              placeholder="Enter project name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={project.description}
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repository Link</Form.Label>
            <Form.Control
              type="url"
              defaultValue={project.repoLink}
              value={newProject.repoLink}
              onChange={(e) =>
                setNewProject({ ...newProject, repoLink: e.target.value })
              }
              placeholder="https://github.com/..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              defaultValue={project.tags}
              value={newProject.tags}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  tags: e.target.value.replace(" ", "").split(","),
                })
              }
              placeholder="React, Spring Boot, Fullstack"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="url"
              defaultValue={project.image?.imageUrl}
              value={newProject.image?.imageUrl}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  image: { ...newProject.image, imageUrl: e.target.value },
                })
              }
            />
            <Form.Label>Image Alt Text</Form.Label>
            <Form.Control
              type="text"
              defaultValue={project.image?.altText}
              value={newProject.image?.altText}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  image: { ...newProject.image, altText: e.target.value },
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleOnClose()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleOnSave()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
