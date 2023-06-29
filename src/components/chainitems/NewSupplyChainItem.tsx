import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChainItemType } from "../../apptypes";
import { useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import {
  GetChainItemTK,
  SaveChainItemTK,
} from "../../features/chainItems/chainItemsThunk";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { LazyUpdateCurrentEditedItem } from "../../features/chainItems/chainItemsSlice";

interface EditItemProps {
  SchainItemId: number;
}

const initialSypplyItem: ChainItemType = {
  id: 0,
  item_name: "",
  item_description: "",
  color: "",
  price: "",
  supplier: "",
  manufacturer: "",
  batch_number: "",
  weight: 0,
  dimensions: "",
  quantity: 0,
  status: "",
};

const NewSupplyChainItem = ({ SchainItemId }: EditItemProps): JSX.Element => {
  const [supplyChainItem, setSupplyChainItem] = useState<ChainItemType>({
    ...initialSypplyItem,
    id: SchainItemId,
  });
  const dispatchAction = useAppDispatch();

  useEffect(() => {
    if (supplyChainItem && supplyChainItem.id > 0) {
      dispatchAction(GetChainItemTK(supplyChainItem.id))
        .unwrap()
        .then((responseData) => {
          if (responseData) {
            const itemDt = responseData as unknown as ChainItemType;
            setSupplyChainItem(itemDt);
          }
        });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChainItemType>({
    defaultValues: { ...supplyChainItem },
    values: supplyChainItem,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  const onSypplyFormFormSubmit: SubmitHandler<ChainItemType> = (data) => {
    dispatchAction(SaveChainItemTK({ ...supplyChainItem, ...data }))
      .unwrap()
      .then((responseData) => {
        if (responseData) {
          const itemDt = responseData as unknown as ChainItemType;
          setSupplyChainItem(itemDt);
          dispatchAction(LazyUpdateCurrentEditedItem(itemDt));
        }
      });
  };

  const formMargin = "mb-2";

  return (
    <>
      <Form className="" onSubmit={handleSubmit(onSypplyFormFormSubmit)}>
        <Card className=" " border="light">
          <Card.Body>
            <Form.Group className={formMargin} controlId="fgScName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                isInvalid={errors.item_name ? true : false}
                type="text"
                placeholder="Name"
                {...register("item_name", { required: true })}
              />
            </Form.Group>

            <Form.Group className={formMargin} controlId="fgScDescription">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={errors.item_description ? true : false}
                placeholder="Description"
                {...register("item_description", { required: true })}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className={formMargin} controlId="fgscPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  isInvalid={errors.price ? true : false}
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgscquantity"
              >
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  isInvalid={errors.quantity ? true : false}
                  type="number"
                  placeholder="Quantity"
                  {...register("quantity", { required: true })}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgscWeight"
              >
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  isInvalid={errors.weight ? true : false}
                  type="Number"
                  placeholder="Weight"
                  {...register("weight", { required: true })}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgscdimensions"
              >
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                  isInvalid={errors.dimensions ? true : false}
                  type="string"
                  placeholder="Dimensions"
                  {...register("dimensions", { required: true })}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgScbatch_number"
              >
                <Form.Label>Batch Number</Form.Label>
                <Form.Control
                  isInvalid={errors.batch_number ? true : false}
                  type="text"
                  placeholder="Batch Number"
                  {...register("batch_number", { required: true })}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className={formMargin}
                controlId="fgScStatus"
              >
                <Form.Label>Status</Form.Label>
                <Form.Control
                  isInvalid={errors.status ? true : false}
                  type="text"
                  placeholder="Status"
                  {...register("status", { required: true })}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className={formMargin + " "}
                controlId="fgScColor"
                xs="auto"
              >
                <Form.Label>Color</Form.Label>
                <Form.Control
                  isInvalid={errors.color ? true : false}
                  type="color"
                  {...register("color", { required: true })}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={formMargin} controlId="fgScSupplier">
                <Form.Label>Supplier</Form.Label>

                <Form.Control
                  type="text"
                  isInvalid={errors.supplier ? true : false}
                  placeholder="Supplier"
                  {...register("supplier", { required: true })}
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
  schainItem: EditItemProps;
}

export const SupplyChainItemFormModal = ({
  ShowModal,
  SetShowHandle,
  schainItem,
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
          <Modal.Title>SupplyChain Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <NewSupplyChainItem {...schainItem}></NewSupplyChainItem>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewSupplyChainItem;
