import { ChainId, coalesceChainId, hexToNativeString, parseVaa } from "@certusone/wormhole-sdk";
import { Grid, Select, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useVaaId from "../hooks/useVaaId";



export default function VaaInspector() {
  const [vaa, setVaa] = useState("");
  const parsedVaa = useMemo(() => {
    try {
      return parseVaa(Buffer.from(vaa, "hex"));
    } catch (e) {
      console.trace(e);
    }
  }, [vaa]);
  const id = useVaaId(parsedVaa);
  return (
      <Grid
        container
        justifyContent="space-between"
        direction="column"
        spacing={1}
      >
        <Grid item>
          <TextField
            label="Chain Tx"
            size="small"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="VAA Id"
            size="small"
            variant="standard"
            fullWidth
            value={id}
          />
        </Grid>
        <Grid item>
          <TextField
            id="filled-multiline-flexible"
            label="VAA"
            multiline
            minRows={5}
            maxRows={10}
            variant="standard"
            fullWidth
            value={vaa}
            onChange={(e) => setVaa(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Select fullWidth>
          </Select>
        </Grid>
        <Grid item>
        <TableContainer component={Paper} elevation={0}>
            <Table
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                    version
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.version}
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.version === 1 ? "transfer" : parsedVaa?.version === 2 ? 'attest' : parsedVaa?.version === 3 ? 'transfer with payload' : '' }
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  guardian set index
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.guardianSetIndex}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  timestamp
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.timestamp ? new Date(parsedVaa?.timestamp * 1000).toISOString() : ""}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  emitter chain
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.emitterChain}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  emitter address
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.emitterAddress ? hexToNativeString(parsedVaa?.emitterAddress.toString("hex"), coalesceChainId(parsedVaa.emitterChain as ChainId)) : ""}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  sequence
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.sequence.toString()}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  nonce
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.nonce}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  consistency level
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.consistencyLevel}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row">
                  hash
                  </TableCell>
                  <TableCell align="right">
                    {parsedVaa?.hash.toString("hex")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
  );
}
