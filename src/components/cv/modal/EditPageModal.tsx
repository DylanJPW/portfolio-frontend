import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../config/store";
import { getLatestCV, getParsedCV, saveCV, setPageContent } from "../edit-page.reducer";
import { useState } from "react";
import { CVObject, ExperienceObject, SkillObject, SkillType } from "../types";
import { SkillItemForm } from "./SkillItemForm";
import { ExperienceItemForm } from "./ExperienceItemForm";
import "./EditPageModal.scss";

interface CVUploadModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const CVUploadModal = ({ show, setShow }: CVUploadModalProps) => {
  const dispatch = useAppDispatch();
  const { parsedCV } = useAppSelector((state) => state.cv);

  const pageContent: CVObject = structuredClone(parsedCV);
  const [cvFile, setCVFile] = useState<File | undefined>(undefined);

  const defaultSkillItem: SkillObject = {
    name: "",
    description: "",
    type: SkillType.HARD,
    yearsExperience: 0,
  };

  const defaultExperienceItem: ExperienceObject = {
    companyName: "",
    position: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: null,
    description: "",
  };

  function handleAddSkill() {
    pageContent.skillList.push(defaultSkillItem);
  }

  function handleRemoveSkill(indexToRemove: number) {
    pageContent.skillList = pageContent.skillList.splice(indexToRemove, 1);
  }

  function handleUpdateSkill(updatedSkill: SkillObject, indexToUpdate: number) {
    pageContent.skillList[indexToUpdate] = updatedSkill;
  }

  function handleAddExperience() {
    pageContent.experienceList.push(defaultExperienceItem);
  }

  function handleRemoveExperience(indexToRemove: number) {
    pageContent.experienceList = pageContent.experienceList.splice(
      indexToRemove,
      1
    );
  }

  function handleUpdateExperience(
    updatedExperience: ExperienceObject,
    indexToUpdate: number
  ) {
    pageContent.experienceList[indexToUpdate] = updatedExperience;
  }

  function handleUploadCV() {
    dispatch(getParsedCV(cvFile as File));
  }

  function handleOnClose() {
    setShow(false);
  }

  async function handleSubmit() {
    await dispatch(saveCV(pageContent));
    dispatch(getLatestCV());
    handleOnClose();
  }

  return (
    <Modal show={show} scrollable size="lg">
      <Modal.Header closeButton onHide={() => handleOnClose()}>
        Edit Page Content
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="pb-3 border-bottom">
            <Form.Label className="modal-subtitle">
              Upload your CV (.pdf)
            </Form.Label>
            <Form.Text className="mb-2">Populate fields with your CV</Form.Text>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                setCVFile(input.files?.[0]);
              }}
            />
            <div className="d-flex justify-content-end mt-2">
              <Button onClick={() => handleUploadCV()}>Upload</Button>
            </div>
          </Form.Group>
          <Form.Group className="pt-2 pb-3 border-bottom">
            <Form.Label className="modal-subtitle">Personal Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={pageContent.summary}
              onChange={(e) => (pageContent.summary = e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pt-3 pb-3 border-bottom">
            <Form.Label className="mb-0 modal-subtitle">Skills</Form.Label>
            {pageContent?.skillList?.map((skillItem, index) => (
              <SkillItemForm
                skillItem={skillItem}
                index={index}
                handleRemoveSkill={handleRemoveSkill}
                handleUpdateSkill={handleUpdateSkill}
              />
            ))}
            <div className="d-flex justify-content-end pt-2">
              <Button onClick={() => handleAddSkill()}>Add Skill</Button>
            </div>
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label className="mb-0 modal-subtitle">Experience</Form.Label>
            {pageContent?.experienceList?.map((experienceItem, index) => (
              <ExperienceItemForm
                experienceItem={experienceItem}
                index={index}
                handleRemoveExperience={handleRemoveExperience}
                handleUpdateExperience={handleUpdateExperience}
              />
            ))}
            <div className="d-flex justify-content-end pt-2">
              <Button onClick={() => handleAddExperience()}>
                Add Experience
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleOnClose()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
