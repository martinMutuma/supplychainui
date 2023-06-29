import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChainEventType } from "../../apptypes";
import DataTableBase from "../Base/DataTableBase";

import { TableColumn } from "react-data-table-component";
import { Button, ButtonGroup } from "react-bootstrap";
import { ShowJsonObjectDataModal } from "../Base/DisplayData";
import { Eye, PencilSquare, Trash } from "react-bootstrap-icons";
import {
  LazyUpdateCurrentDeletedChainEvent,
  SetCurrentSupplyChainEditChainEvent,
} from "../../features/chainEvents/chainEventsSlice";
import {
  ChainItemsEventsListTK,
  DeleteChainEventTK,
} from "../../features/chainEvents/chainEventsThunk";

const ListChainEvents = () => {
  const chainEventsList = useAppSelector(
    (state) => state.ChainEvents.chainIEventList
  );
  const supplyChainIItem = useAppSelector(
    (state) => state.ChainEvents.SupplyChainIItem
  );
  const diapatchAction = useAppDispatch();

  const SetCurrentEditEvent = (supplyChainEvent: ChainEventType) => {
    diapatchAction(SetCurrentSupplyChainEditChainEvent(supplyChainEvent));
  };
  const DeleteCurrentEvent = (supplyChainEvent: ChainEventType) => {
    if (
      supplyChainEvent &&
      confirm("Are sure you want to delete this Event?") == true
    ) {
      diapatchAction(DeleteChainEventTK(supplyChainEvent.id)).then(() => {
        diapatchAction(LazyUpdateCurrentDeletedChainEvent(supplyChainEvent));
      });
    }
  };

  const columns: TableColumn<ChainEventType>[] = [
    {
      name: "id",
      selector: (rowItem) => rowItem.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "TimeStamp",
      selector: (rowItem) => {
        return rowItem.created_at!;
      },
      sortable: true,
    },
    {
      name: "location",
      selector: (rowItem) => rowItem.location!,
      sortable: true,
    },
    {
      name: "Type",
      selector: (rowItem) => rowItem?.event_type?.name!,
      sortable: true,
    },
    {
      name: "Custodian",
      selector: (rowItem) => rowItem.custodian?.username!,
      sortable: true,
    },
    {
      name: "Status",
      selector: (rowItem) => rowItem.event_status?.name!,
      sortable: true,
    },
    {
      button: true,
      cell: (rowItem) => {
        const [show, setShow] = useState(false);
        const handleShow = () => {
          setShow(true);
        };
        const handleEdit = () => {
          SetCurrentEditEvent(rowItem);
        };
        const handleDelete = () => {
          DeleteCurrentEvent(rowItem);
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
                title={rowItem.description!}
              />
            )}
          </>
        );
      },
    },
  ];

  useMemo(() => {
    if (supplyChainIItem && supplyChainIItem.id) {
      diapatchAction(ChainItemsEventsListTK(supplyChainIItem.id));
    } else {
      diapatchAction(ChainItemsEventsListTK(0));
      // diapatchAction(ChainEventsListTK());
    }
  }, []);
  // useEffect(() => {}, [chainEventsList, supplyChainIItem]);

  return (
    <>
      <DataTableBase
        columns={columns}
        data={chainEventsList}
        defaultSortFieldId="id"
        defaultSortAsc={false}
      />
    </>
  );
};

export default ListChainEvents;
