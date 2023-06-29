import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import ListChainItems from "./ListChainItems";
import { PlusLg } from "react-bootstrap-icons";
import { SupplyChainItemFormModal } from "./NewSupplyChainItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SetCurrentSupplyChainItem } from "../../features/chainItems/chainItemsSlice";

const ChainItemsDashBoard = () => {
  const currentEditItem = useAppSelector(
    (state) => state.ChainItems.CurrentEditItem
  );
  const diapatchAction = useAppDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);
  const handleNewItemButtonClick = () => {
    setItemEditId(0);
    setShowEditModal(true);
  };
  useEffect(() => {
    if (currentEditItem && currentEditItem.id > 0) {
      setItemEditId(currentEditItem.id);
      setShowEditModal(true);
    }
  }, [currentEditItem]);
  useEffect(() => {
    if (!showEditModal) {
      diapatchAction(SetCurrentSupplyChainItem(null));
    }
  }, [showEditModal]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Supply Chain items</h2>
          </Col>
          <Col>
            <ButtonGroup size="sm" className="float-end">
              <Button
                variant="outline-primary"
                onClick={handleNewItemButtonClick}
              >
                <PlusLg></PlusLg> New Item
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <ListChainItems></ListChainItems>
      </Container>
      {showEditModal && (
        <SupplyChainItemFormModal
          ShowModal={showEditModal}
          SetShowHandle={setShowEditModal}
          schainItem={{ SchainItemId: itemEditId }}
        ></SupplyChainItemFormModal>
      )}
    </>
  );
};

export default ChainItemsDashBoard;
