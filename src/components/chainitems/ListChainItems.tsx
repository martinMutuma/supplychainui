import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChainItemType } from "../../apptypes";
import DataTableBase from "../Base/DataTableBase";
import { ChainItemsListTK } from "../../features/chainItems/chainItemsThunk";
import { TableColumn } from "react-data-table-component";
import { Button, ButtonGroup } from "react-bootstrap";
import { ShowJsonObjectDataModal } from "../Base/DisplayData";
import { Eye } from "react-bootstrap-icons";

const ListChainItems = () => {
  const chainItemsList = useAppSelector(
    (state) => state.ChainItems.chainItemsList
  );
  const diapatchAction = useAppDispatch();

  const columns: TableColumn<ChainItemType>[] = [
    {
      name: "id",
      selector: (rowItem) => rowItem.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (rowItem) => rowItem.item_name,
      sortable: true,
    },
    {
      name: "Color",
      selector: (rowItem) => rowItem.color,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (rowItem) => rowItem.weight,
      sortable: true,
    },
    {
      name: "Dimensions",
      selector: (rowItem) => rowItem.dimensions,
      sortable: true,
    },
    {
      name: "Price",
      selector: (rowItem) => rowItem.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (rowItem) => rowItem.quantity,
      sortable: true,
      width: "115px",
    },
    {
      name: "Status",
      selector: (rowItem) => rowItem.status,
      sortable: true,
    },
    {
      button: true,
      cell: (rowItem) => {
        const [show, setShow] = useState(false);
        const handleShow = () => {
          setShow(true);
        };
        return (
          <>
            <ButtonGroup size="sm">
              <Button variant="outline-primary" size="sm" onClick={handleShow}>
                <Eye></Eye>
              </Button>
            </ButtonGroup>
            {show == true && (
              <ShowJsonObjectDataModal
                scObject={rowItem}
                ShowModal={show}
                SetShowHandle={setShow}
                title={rowItem.item_name}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    diapatchAction(ChainItemsListTK());
  }, []);

  return (
    <>
      <DataTableBase
        title="Supply Chain Items"
        columns={columns}
        data={chainItemsList}
      />
    </>
  );
};

export default ListChainItems;
