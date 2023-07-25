import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import MuiTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableRow({ label, value }: TableRowProps) {
    return (
        <MuiTableRow>
            <TableCell scope="row">
                {label}
            </TableCell>
            <TableCell align="right">
                {value}
            </TableCell>
        </MuiTableRow>
    );
}

export interface TableProps {
    rows: TableRowProps[];
}

export interface TableRowProps {
    label: string;
    value: string;
}

export default function Table(props: TableProps) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <MuiTable size="small" aria-label="a dense table">
        <TableBody>
            {props.rows.map((row, idx) => (<TableRow key={idx} {...row} />))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
