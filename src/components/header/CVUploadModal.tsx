import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../config/store";
import { uploadCV } from "../../reducers/cv.reducer";
import { useState } from "react";

interface CVUploadModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const CVUploadModal = ({ show, setShow }: CVUploadModalProps) => {
  const dispatch = useAppDispatch();
	const [cvFile, setCVFile] = useState<File | undefined>(undefined);

  function handleOnClose() {
    setShow(false);
  }

  function handleSubmit() {
		// dispatch(uploadCV(cvFile));
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={() => handleOnClose()}>
        Upload CV
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Upload your CV (.pdf)</Form.Label>
            <Form.Control type="file" accept=".pdf" onChange={(e) => console.log(e.target)}/>
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
