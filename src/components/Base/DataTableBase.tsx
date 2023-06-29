import { Container, Row } from "react-bootstrap";
import { ArrowDown } from "react-bootstrap-icons";
import DataTable, { TableProps, TableStyles } from "react-data-table-component";

const sortIcon = <ArrowDown />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

const customStyle: TableStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      padding: "8px", // override the cell padding for head cells
      fontWeight: "700",
    },
  },
  cells: {
    style: {
      padding: "8px", // override the cell padding for data cells
      minHeight: "45px",
      wordWrap: "break-word",
      textWrap: "wrap",
      whiteSpace: "wrap",
    },
  },
};

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <Container>
      <Row>
        <DataTable
          responsive
          selectableRowsComponentProps={selectProps}
          sortIcon={sortIcon}
          className="table table-hover border"
          fixedHeader={true}
          fixedHeaderScrollHeight="60%"
          customStyles={customStyle}
          pagination
          dense
          selectableRows
          {...props}
        />
      </Row>
    </Container>
  );
}

export default DataTableBase;
