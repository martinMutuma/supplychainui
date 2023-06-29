import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import ListChainEvents from "./ListChainEvents";
import { PlusLg } from "react-bootstrap-icons";
import { SupplyChainEventForModal } from "./NewSupplyChainEvent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SetCurrentSupplyChainItem } from "../../features/chainItems/chainItemsSlice";
import ShowJsonObjectData from "../Base/DisplayData";
import { ChainItemType } from "../../apptypes";

const ChainEventsDashBoard = () => {
  const currentEditItem: ChainItemType | null | undefined = useAppSelector(
    (state) => state.ChainItems.CurrentEditItem
  );
  const supplyChainIItem = useAppSelector(
    (state) => state.ChainEvents.SupplyChainIItem
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
            <h3>
              {" "}
              {supplyChainIItem?.id && supplyChainIItem.item_name} - Events
            </h3>
          </Col>
          {supplyChainIItem?.id && (
            <Col>
              <ButtonGroup size="sm" className="float-end">
                <Button
                  variant="outline-primary"
                  onClick={handleNewItemButtonClick}
                >
                  <PlusLg></PlusLg> New Event
                </Button>
              </ButtonGroup>
            </Col>
          )}
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={12}>
            <ListChainEvents></ListChainEvents>
          </Col>
          {supplyChainIItem?.id && (
            <Col className="">
              <ShowJsonObjectData
                scObject={supplyChainIItem}
              ></ShowJsonObjectData>
            </Col>
          )}
        </Row>
      </Container>
      {showEditModal && (
        <SupplyChainEventForModal
          ShowModal={showEditModal}
          SetShowHandle={setShowEditModal}
          schainEvent={{ SchainIEventId: itemEditId }}
        ></SupplyChainEventForModal>
      )}
    </>
  );
};

export default ChainEventsDashBoard;
