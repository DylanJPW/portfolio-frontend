import { Form, CloseButton } from "react-bootstrap";
import { SkillObject, SkillType } from "../types";
import { useMemo } from "react";

interface SkillItemFormProps {
  skillItem: SkillObject;
  index: number;
  handleRemoveSkill: (indexToRemove: number) => void;
  handleUpdateSkill: (updatedSkill: SkillObject, indexToUpdate: number) => void;
}

export const SkillItemForm = ({
  skillItem,
  index,
  handleRemoveSkill,
  handleUpdateSkill,
}: SkillItemFormProps) => {
  const { name, description, type, yearsExperience } = skillItem;
  const isTechSkill = useMemo<boolean>(() => type === SkillType.HARD, [type]);

  return (
    <Form.Group>
      <Form.Group className="pt-2">
        <div className="d-flex justify-content-between">
          <Form.Label>Name</Form.Label>
          <CloseButton onClick={() => handleRemoveSkill(index)} />
        </div>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => {
            const updatedItem = { ...skillItem, name: e.target.value };
            handleUpdateSkill(updatedItem, index);
          }}
        />
      </Form.Group>
      <Form.Group className="pt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => {
            const updatedItem = { ...skillItem, description: e.target.value };
            handleUpdateSkill(updatedItem, index);
          }}
        />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between pt-3">
        <Form.Group className="d-flex">
          <Form.Label className="mb-0 pe-3">Type:</Form.Label>
          <Form.Group>
            <Form.Check
              inline
              type="radio"
              name={`skill-type-${index}`}
              label="Technical"
              checked={isTechSkill}
              onChange={(e) => {
                if (e.target.checked) {
                  const updatedItem = { ...skillItem, type: SkillType.HARD };
                  handleUpdateSkill(updatedItem, index);
                }
              }}
            />
            <Form.Check
              inline
              type="radio"
              name={`skill-type-${index}`}
              label="Soft"
              checked={!isTechSkill}
              onChange={(e) => {
                if (e.target.checked) {
                  const updatedItem = { ...skillItem, type: SkillType.SOFT };
                  handleUpdateSkill(updatedItem, index);
                }
              }}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group className="d-flex align-items-center" hidden={!isTechSkill}>
          <Form.Label className="mb-0 pe-3" hidden={!isTechSkill}>
            Years of Experience:
          </Form.Label>
          <Form.Control
            hidden={!isTechSkill}
            className="w-auto"
            type="number"
            size="sm"
            value={yearsExperience}
            onChange={(e) => {
              const updatedItem = {
                ...skillItem,
                yearsExperience: parseInt(e.target.value),
              };
              handleUpdateSkill(updatedItem, index);
            }}
          />
        </Form.Group>
      </div>
    </Form.Group>
  );
};
