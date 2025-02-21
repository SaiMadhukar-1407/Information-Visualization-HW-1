import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: "350px", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Genre</b></TableCell>
            <TableCell><b>Creative Type</b></TableCell>
            <TableCell><b>Release</b></TableCell>
            <TableCell><b>Rating</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No Data Selected</TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>{row.creative_type}</TableCell>
                <TableCell>{row.release}</TableCell>
                <TableCell>{row.rating}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
