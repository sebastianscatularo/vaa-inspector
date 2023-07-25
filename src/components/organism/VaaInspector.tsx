import { Box, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Table from "../molecule/Table";
import { ParsedVaa } from "@certusone/wormhole-sdk";

const toRowName = (input: string) =>
  input
    .split(/(?=[A-Z])/)
    .map((s) => s.toLowerCase())
    .join(" ");

export interface VaaInspectorProps {
    vaa: ParsedVaa | null;
    vaaString: string;
    onVaaChange: (vaa: string) => void;
    payload: any;
}

export default function VaaInspector({ payload = {}, vaaString = '', vaa = {} as ParsedVaa, onVaaChange = (_: string) => {} }: VaaInspectorProps) {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    if (vaa) {
        setRows(
            Object.entries(vaa).map(([label, value]) => ({
              label: toRowName(label),
              value,
            }))
          );
    }
  }, [vaa]);
  return (
    <>
      <Box>
        <Grid container
        justifyContent="space-between"
        direction="column"
        spacing={1}>
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
              value={`${vaa?.emitterChain}/${vaa?.emitterAddress?.toString('hex')}/${vaa?.sequence}`}
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
              value={vaaString}
              onChange={(e) => onVaaChange(e.target.value)}
            />
          </Grid>
        </Grid>
        <Table rows={rows} />
        <Table rows={[]} />
      </Box>
    </>
  );
}
