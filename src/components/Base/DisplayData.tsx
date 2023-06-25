import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
interface universalKeyPair {
  [key: string]: any;
}
const ShowJsonObjectData = ({ scObject }: universalKeyPair): JSX.Element => {
  const scObjectKeys = Object.keys(scObject);
  return (
    <Table striped bordered hover>
      <tbody>
        {scObjectKeys?.map((key) => {
          return (
            <tr>
              <td>{key}:</td>
              <td>{scObject[key]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
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
      <Modal show={show} onHide={handleClose}>
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
