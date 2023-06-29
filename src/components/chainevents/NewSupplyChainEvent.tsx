import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChainEventType, UserType } from "../../apptypes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useMemo, useState } from "react";

import { Col, Container, Modal, Row } from "react-bootstrap";
import {
  ChainEventsStatusListTK,
  ChainEventsTypesListTK,
  GetChainEventTK,
  SaveChainEventTK,
} from "../../features/chainEvents/chainEventsThunk";
import { LazyUpdateCurrentEditedChainEvent } from "../../features/chainEvents/chainEventsSlice";
import { GetUserListTK } from "../../features/auth/authThunk";
import Select from "react-select";

interface EditEventProps {
  SchainIEventId: number;
}

const initialSypplyItemEvent: ChainEventType = {
  id: 0,
  location: "",
  description: "",
  action: "",
  additional_parties_involved: "",
  signature: "",
  item: null,
};

const SupplyChainEventForm = ({
  SchainIEventId,
}: EditEventProps): JSX.Element => {
  const [supplyChainItemEvent, setSupplyChainItemEvent] =
    useState<ChainEventType>({
      ...initialSypplyItemEvent,
      id: SchainIEventId,
    });
  const dispatchAction = useAppDispatch();

  const userList = useAppSelector((state) => state.UserList.UserList);
  const eventTypesList = useAppSelector(
    (state) => state.EventTypesList.EventTypesList
  );
  const eventStatusList = useAppSelector(
    (state) => state.EventStatusList.EventStatusList
  );

  useEffect(() => {
    if (supplyChainItemEvent && supplyChainItemEvent.id > 0) {
      dispatchAction(GetChainEventTK(supplyChainItemEvent.id))
        .unwrap()
        .then((responseData) => {
          if (responseData) {
            const itemDt = responseData as unknown as ChainEventType;
            setSupplyChainItemEvent(itemDt);
          }
        });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChainEventType>({
    defaultValues: { ...supplyChainItemEvent },
    values: supplyChainItemEvent,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  const onSypplyFormFormSubmit: SubmitHandler<ChainEventType> = (data) => {
    dispatchAction(SaveChainEventTK({ ...supplyChainItemEvent, ...data }))
      .unwrap()
      .then((responseData) => {
        if (responseData) {
          const itemDt = responseData as unknown as ChainEventType;
          setSupplyChainItemEvent(itemDt);
          dispatchAction(LazyUpdateCurrentEditedChainEvent(itemDt));
        }
      });
  };

  useMemo(() => {
    dispatchAction(GetUserListTK());
    dispatchAction(ChainEventsTypesListTK());
    dispatchAction(ChainEventsStatusListTK());
  }, []);

  // useMemo(() => {
  //   setUserListOptions(CovertListToOptions(userList, "username"));
  // }, [userList]);
  const formMargin = "mb-2";

  return (
    <>
      <Form className="" onSubmit={handleSubmit(onSypplyFormFormSubmit)}>
        <Card className=" " border="light">
          <Card.Body>
            <Row>
              <Form.Group as={Col} className={formMargin}>
                <Form.Label>Custodian</Form.Label>

                <Form.Select aria-label="Select Custodian">
                  {userList?.map((user) => {
                    return (
                      <option value={user.id?.toString()}>
                        {user.username!}{" "}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className={formMargin}>
                <Form.Label>Event Type</Form.Label>

                <Form.Select aria-label="Select Custodian">
                  {eventTypesList?.map((eventType) => {
                    return (
                      <option value={eventType.id?.toString()}>
                        {eventType.name!}{" "}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgScLocation"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  isInvalid={errors.location ? true : false}
                  type="text"
                  placeholder="location"
                  {...register("location", { required: true })}
                />
              </Form.Group>

              <Form.Group as={Col} className={formMargin}>
                <Form.Label>Event Status</Form.Label>

                <Form.Select aria-label="Select Custodian">
                  {eventStatusList?.map((eventStatus) => {
                    return (
                      <option value={eventStatus.id?.toString()}>
                        {eventStatus.name!}{" "}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className={formMargin} controlId="fgScDescription">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={errors.description ? true : false}
                placeholder="Description"
                {...register("description", { required: true })}
              />
            </Form.Group>

            <Row>
              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgscAction"
              >
                <Form.Label>Action</Form.Label>
                <Form.Control
                  isInvalid={errors.action ? true : false}
                  type="text"
                  placeholder="Action"
                  {...register("action", { required: false })}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgscSignature"
              >
                <Form.Label>Signature</Form.Label>
                <Form.Control
                  isInvalid={errors.signature ? true : false}
                  type="text"
                  placeholder="Signature"
                  {...register("signature", { required: false })}
                />
              </Form.Group>
            </Row>

            <Button
              variant="outline-success"
              className="float-end"
              type="submit"
            >
              save
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};
interface SupplyChainItemModalProps {
  ShowModal: boolean;
  SetShowHandle: React.Dispatch<React.SetStateAction<boolean>>;
  schainEvent: EditEventProps;
}

export const SupplyChainEventForModal = ({
  ShowModal,
  SetShowHandle,
  schainEvent,
}: SupplyChainItemModalProps): JSX.Element => {
  const [show, setShow] = useState(ShowModal);

  const handleClose = () => {
    setShow(false);
    SetShowHandle(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>SupplyChain Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <SupplyChainEventForm {...schainEvent}></SupplyChainEventForm>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

// function CovertListToOptions<T, K extends keyof T>(
//   listToCovert: T[],
//   lableKey: K
// ): OptionType<T>[] {
//   const ReturnList = listToCovert.map((elem) => {
//     const opt: OptionType<T> = {
//       value: elem,
//       label: elem[lableKey],
//     };
//     return opt;
//   });

//   return ReturnList;
// }

export default SupplyChainEventForm;
