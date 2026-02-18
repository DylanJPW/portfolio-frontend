import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import {
  type CVObject,
  type ExperienceObject,
  type SkillObject,
  SkillType,
} from "../types";
import { SkillItemForm } from "./SkillItemForm";
import { ExperienceItemForm } from "./ExperienceItemForm";
import { useEditPage } from "../useEditPage";
import "./EditPageModal.scss";

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

interface CVUploadModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const CVUploadModal = ({ show, setShow }: CVUploadModalProps) => {
  const {
    parsedCV,
    pageContent,
    parsedCVLoaded,
    getParsedCV,
    saveCV,
    getLatestCV,
  } = useEditPage();

  const [formContent, setFormContent] = useState<CVObject>(pageContent);
  const [cvFile, setCVFile] = useState<File | undefined>(undefined);

  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (show && isFirstRender.current) {
      isFirstRender.current = false;
      setFormContent(pageContent);
    }
  }, [show]);

  useEffect(() => {
    setFormContent(parsedCV);
  }, [parsedCV]);

  function handleAddSkill() {
    setFormContent({
      ...formContent,
      skillList: [...formContent.skillList, defaultSkillItem],
    });
  }

  function handleRemoveSkill(indexToRemove: number) {
    const updatedList = formContent.skillList.filter(
      (_, index) => index !== indexToRemove,
    );
    setFormContent({ ...formContent, skillList: updatedList });
  }

  function handleUpdateSkill(updatedSkill: SkillObject, indexToUpdate: number) {
    const updatedList = formContent.skillList.map((item, index) =>
      index === indexToUpdate ? updatedSkill : item,
    );
    setFormContent({ ...formContent, skillList: updatedList });
  }

  function handleAddExperience() {
    setFormContent({
      ...formContent,
      experienceList: [...formContent.experienceList, defaultExperienceItem],
    });
  }

  function handleRemoveExperience(indexToRemove: number) {
    const updatedList = formContent.experienceList.filter(
      (_, index) => index !== indexToRemove,
    );
    setFormContent({ ...formContent, experienceList: updatedList });
  }

  function handleUpdateExperience(
    updatedExperience: ExperienceObject,
    indexToUpdate: number,
  ) {
    const updatedList = formContent.experienceList.map((item, index) =>
      index === indexToUpdate ? updatedExperience : item,
    );
    setFormContent({ ...formContent, experienceList: updatedList });
  }

  function handleUploadCV() {
    getParsedCV(cvFile as File);
  }

  function handleOnClose() {
    setShow(false);
  }

  async function handleSubmit() {
    await saveCV(formContent);
    getLatestCV();
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
              <Button disabled={!cvFile} onClick={() => handleUploadCV()}>
                Upload
              </Button>
            </div>
          </Form.Group>
          {!parsedCVLoaded ? (
            <div className="d-flex justify-content-center mt-3">
              <Spinner />
              <span className="ps-2 loading--font-size">Loading...</span>
            </div>
          ) : (
            <>
              <Form.Group className="pt-2 pb-3 border-bottom">
                <Form.Label className="modal-subtitle">
                  Personal Summary
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formContent.summary}
                  onChange={(e) =>
                    setFormContent({ ...formContent, summary: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="pt-3 pb-3 border-bottom">
                <Form.Label className="mb-0 modal-subtitle">Skills</Form.Label>
                {formContent?.skillList?.map((skillItem, index) => (
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
                <Form.Label className="mb-0 modal-subtitle">
                  Experience
                </Form.Label>
                {formContent?.experienceList?.map((experienceItem, index) => (
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
            </>
          )}
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
