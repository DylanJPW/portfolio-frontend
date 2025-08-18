import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../config/store";
import { getLatestCV, uploadCV } from "../cv.reducer";
import { useState } from "react";
import { ExperienceObject, SkillObject, SkillType } from "../types";
import { SkillItemForm } from "./SkillItemForm";
import { ExperienceItemForm } from "./ExperienceItemForm";
import "./modal.scss";

interface CVUploadModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const CVUploadModal = ({ show, setShow }: CVUploadModalProps) => {
  const dispatch = useAppDispatch();
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
    startDate: new Date(),
    endDate: null,
    description: "",
  };

  const [skillList, setSkillList] = useState<SkillObject[]>([defaultSkillItem]);
  const [experienceList, setExperienceList] = useState<ExperienceObject[]>([
    defaultExperienceItem,
  ]);

  function handleAddSkill() {
    setSkillList([...skillList, { ...defaultSkillItem }]);
  }

  function handleRemoveSkill(indexToRemove: number) {
    setSkillList([...skillList.filter((_, index) => index !== indexToRemove)]);
  }

  function handleUpdateSkill(updatedSkill: SkillObject, indexToUpdate: number) {
    skillList[indexToUpdate] = updatedSkill;
    setSkillList([...skillList]);
  }

  function handleAddExperience() {
    setExperienceList([...experienceList, { ...defaultExperienceItem }]);
  }

  function handleRemoveExperience(indexToRemove: number) {
    setExperienceList([
      ...experienceList.filter((_, index) => index !== indexToRemove),
    ]);
  }

  function handleUpdateExperience(
    updatedExperience: ExperienceObject,
    indexToUpdate: number
  ) {
    experienceList[indexToUpdate] = updatedExperience;
    setExperienceList([...experienceList]);
  }

  function handleOnClose() {
    setShow(false);
  }

  async function handleSubmit() {
    await dispatch(uploadCV(cvFile as File));
    dispatch(getLatestCV());
    handleOnClose();
  }

  return (
    <Modal show={show} scrollable size="lg">
      <Modal.Header closeButton onHide={() => handleOnClose()}>
        Upload CV
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="pb-3 border-bottom">
            <Form.Label>Upload your CV (.pdf)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                setCVFile(input.files?.[0]);
              }}
            />
          </Form.Group>
          <Form.Group className="pt-2 pb-3 border-bottom">
            <Form.Label className="modal-subtitle">Personal Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                setCVFile(input.files?.[0]);
              }}
            />
          </Form.Group>
          <Form.Group className="pt-3 pb-3 border-bottom">
            <Form.Label className="mb-0 modal-subtitle">Skills</Form.Label>
            {skillList.map((skillItem, index) => (
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
            {experienceList.map((experienceItem, index) => (
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
