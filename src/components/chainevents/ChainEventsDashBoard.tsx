import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import ListChainEvents from "./ListChainEvents";
import { Arrow90degLeft, PlusLg } from "react-bootstrap-icons";
import { SupplyChainEventForModal } from "./NewSupplyChainEvent";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ShowJsonObjectData from "../Base/DisplayData";
import { ChainItemsEventsListTK } from "../../features/chainEvents/chainEventsThunk";
import { useNavigate } from "react-router-dom";

const ChainEventsDashBoard = () => {
  const supplyChainIItem = useAppSelector(
    (state) => state.ChainEvents.SupplyChainIItem
  );
  const supplyChainIEditItem = useAppSelector(
    (state) => state.ChainEvents.CurrentEditChainEvent
  );

  const dispatchAction = useAppDispatch();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);
  const handleNewItemButtonClick = () => {
    setItemEditId(0);
    setShowEditModal(true);
  };

  const handleBackToItems = () => {
    navigate("/items");
  };
  useEffect(() => {
    if (supplyChainIEditItem && supplyChainIEditItem.id > 0) {
      setItemEditId(supplyChainIEditItem.id);
      setShowEditModal(true);
    }
  }, [supplyChainIEditItem]);
  useMemo(() => {
    if (!showEditModal && supplyChainIItem) {
      dispatchAction(ChainItemsEventsListTK(supplyChainIItem.id));
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
                <Button variant="outline-secondary" onClick={handleBackToItems}>
                  <Arrow90degLeft></Arrow90degLeft> Items
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
