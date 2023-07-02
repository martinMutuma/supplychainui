import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChainEventType, ChainItemType } from "../../apptypes";
import DataTableBase from "../Base/DataTableBase";
import {
  ChainItemsListTK,
  DeleteChainItemTK,
} from "../../features/chainItems/chainItemsThunk";
import { TableColumn } from "react-data-table-component";
import { Button, ButtonGroup } from "react-bootstrap";
import { ShowJsonObjectDataModal } from "../Base/DisplayData";
import {
  Eye,
  PencilSquare,
  SkipEndBtn,
  Trash,
  ViewList,
} from "react-bootstrap-icons";
import {
  LazyUpdateCurrentDeletedItem,
  SetCurrentSupplyChainItem,
} from "../../features/chainItems/chainItemsSlice";
import { SetCurrentEventsSupplyChainIItem } from "../../features/chainEvents/chainEventsSlice";
import { useNavigate } from "react-router-dom";
import { GetChainItemLatestEventTK } from "../../features/chainEvents/chainEventsThunk";
import { unwrapResult } from "@reduxjs/toolkit";

const ListChainItems = () => {
  const chainItemsList = useAppSelector(
    (state) => state.ChainItems.chainItemsList
  );

  const dispatchAction = useAppDispatch();
  const navigate = useNavigate();

  const SetCurrentItem = (supplyChainItem: ChainItemType) => {
    dispatchAction(SetCurrentSupplyChainItem(supplyChainItem));
  };
  const SetCurrentEventsItem = (supplyChainItem: ChainItemType) => {
    dispatchAction(SetCurrentEventsSupplyChainIItem(supplyChainItem));
  };
  const DeleteCurrentItem = (supplyChainItem: ChainItemType) => {
    if (
      supplyChainItem &&
      confirm("Are sure you want to delete this Item?") == true
    ) {
      dispatchAction(DeleteChainItemTK(supplyChainItem.id)).then(() => {
        dispatchAction(LazyUpdateCurrentDeletedItem(supplyChainItem));
      });
    }
  };

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
    // {
    //   name: "Dimensions",
    //   selector: (rowItem) => rowItem.dimensions,
    //   sortable: true,
    // },
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
      name: "Items",
      button: true,
      cell: (rowItem) => {
        const [show, setShow] = useState(false);
        const handleShow = () => {
          setShow(true);
        };
        const handleEdit = () => {
          SetCurrentItem(rowItem);
        };
        const handleDelete = () => {
          DeleteCurrentItem(rowItem);
        };
        return (
          <>
            <ButtonGroup size="sm">
              <Button variant="outline-primary" size="sm" onClick={handleShow}>
                <Eye></Eye>
              </Button>

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleEdit}
              >
                <PencilSquare></PencilSquare>
              </Button>
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                <Trash></Trash>
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
    {
      name: "Events",
      button: true,
      cell: (rowItem) => {
        const [latestChainItemEvent, setLatestChainItemEvent] =
          useState<ChainEventType | null>(null);
        const [showLatest, setShowLatest] = useState(false);
        const handleShowLatest = () => {
          dispatchAction(GetChainItemLatestEventTK(rowItem.id))
            .then(unwrapResult)
            .then((response) => {
              if (response) {
                // const latestEvent = response as ChainEventType;
                setLatestChainItemEvent(response);
                setShowLatest(true);
              }
            });
        };
        const handleShowEvents = () => {
          SetCurrentEventsItem(rowItem);
          navigate("/event");
        };

        return (
          <>
            <ButtonGroup size="sm">
              <Button
                title="Show item Events"
                variant="outline-info"
                size="sm"
                onClick={handleShowEvents}
              >
                <ViewList></ViewList>
              </Button>

              <Button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Show last Event"
                variant="outline-info"
                size="sm"
                onClick={handleShowLatest}
              >
                <SkipEndBtn></SkipEndBtn>
              </Button>
            </ButtonGroup>
            {latestChainItemEvent && showLatest ? (
              <ShowJsonObjectDataModal
                scObject={latestChainItemEvent as ChainEventType}
                ShowModal={showLatest}
                SetShowHandle={setShowLatest}
                title={rowItem.item_name + " Latest Event"}
              />
            ) : null}
          </>
        );
      },
    },
  ];

  useMemo(() => {
    dispatchAction(ChainItemsListTK());
  }, []);
  useEffect(() => {}, [chainItemsList]);

  return (
    <>
      <DataTableBase
        columns={columns}
        data={chainItemsList}
        defaultSortFieldId="id"
        defaultSortAsc={false}
      />
    </>
  );
};

export default ListChainItems;
