import { CloseButton, Form } from "react-bootstrap";
import { type ExperienceObject } from "../types";
import { useState } from "react";

interface ExperienceItemFormProps {
  experienceItem: ExperienceObject;
  index: number;
  handleRemoveExperience: (indexToRemove: number) => void;
  handleUpdateExperience: (
    updatedExperience: ExperienceObject,
    indexToUpdate: number,
  ) => void;
}

export const ExperienceItemForm = ({
  experienceItem,
  index,
  handleRemoveExperience,
  handleUpdateExperience,
}: ExperienceItemFormProps) => {
  const { companyName, position, startDate, endDate, description } =
    experienceItem;

  const [isCurrentPosition, setIsCurrentPosition] = useState<boolean>(
    !endDate ? true : false,
  );

  return (
    <Form.Group>
      <Form.Group className="pt-2">
        <div className="d-flex justify-content-between">
          <Form.Label>Company Name</Form.Label>
          <CloseButton onClick={() => handleRemoveExperience(index)} />
        </div>
        <Form.Control
          type="text"
          value={companyName}
          onChange={(e) => {
            const updatedItem = {
              ...experienceItem,
              companyName: e.target.value,
            };
            handleUpdateExperience(updatedItem, index);
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="pt-3">
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          value={position}
          onChange={(e) => {
            const updatedItem = { ...experienceItem, position: e.target.value };
            handleUpdateExperience(updatedItem, index);
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="pt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => {
            const updatedItem = {
              ...experienceItem,
              description: e.target.value,
            };
            handleUpdateExperience(updatedItem, index);
          }}
        ></Form.Control>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between pt-3">
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mb-0 pe-3">Start Date:</Form.Label>
          <Form.Control
            className="w-auto"
            type="date"
            value={startDate}
            onChange={(e) => {
              const updatedStartDate = new Date(e.target.value)
                .toISOString()
                .split("T")[0];
              const updatedItem = {
                ...experienceItem,
                startDate: updatedStartDate,
              };
              handleUpdateExperience(updatedItem, index);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mb-0 pe-3">End Date:</Form.Label>
          <Form.Control
            className="w-auto"
            type="date"
            value={endDate ?? ""}
            onChange={(e) => {
              const updatedEndDate = new Date(e.target.value)
                .toISOString()
                .split("T")[0];
              const updatedItem = {
                ...experienceItem,
                endDate: updatedEndDate,
              };
              handleUpdateExperience(updatedItem, index);
            }}
            disabled={isCurrentPosition}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex">
          <Form.Check
            label="Current position?"
            checked={isCurrentPosition}
            onChange={(e) => setIsCurrentPosition(e.target.checked)}
          ></Form.Check>
        </Form.Group>
      </div>
    </Form.Group>
  );
};
