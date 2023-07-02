import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
interface universalKeyPair {
  [key: string]: any;
}
const ShowJsonObjectData = ({ scObject }: universalKeyPair): JSX.Element => {
  const scObjectKeys = Object.keys(scObject);
  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          {scObjectKeys?.map((key) => {
            return (
              <tr key={key}>
                <td>{key}:</td>
                <td>
                  {scObject[key] && typeof scObject[key] === "object" ? (
                    <ShowJsonObjectData
                      scObject={scObject[key]}
                    ></ShowJsonObjectData>
                  ) : (
                    scObject[key]
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
interface ScObJectShowProps {
  scObject: universalKeyPair;
  ShowModal: boolean;
  SetShowHandle: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

export const ShowJsonObjectDataModal = ({
  scObject,
  ShowModal,
  SetShowHandle,
  title,
}: ScObJectShowProps): JSX.Element => {
  const [show, setShow] = useState(ShowModal);
  const handleClose = () => {
    setShow(false);
    SetShowHandle(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowJsonObjectData scObject={scObject}></ShowJsonObjectData>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowJsonObjectData;
