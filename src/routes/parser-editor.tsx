import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import SourceCodeEditor from "../components/organism/SourceCodeEditor";
import localforage from "localforage";
import Grid from "@mui/material/Grid";
import VaaInspector from "../components/organism/VaaInspector";
import { Alert, Button, TextField, Toolbar } from "@mui/material";
import useParserCompiler from "../hooks/useParserCompiler";
import useVaa from "../hooks/useVaa";
import { useEffect, useState } from "react";
import { BN } from '@project-serum/anchor';

export async function vaaParserEditorLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    const fnDefinition = await localforage.getItem(`vaa-parser-${id}`);
    if (fnDefinition) {
        return fnDefinition;
    } else {
        return new Response("Not found", { status: 404 });
    };
}

export function vaaParserEditorAction(_: ActionFunctionArgs) {
    return {};
}

export default function ParserEditor() {
    const { error, source, parser, onParserChange } = useParserCompiler();
    const { parsed, vaa, setVaaString } = useVaa();
    const [payload, setPayload] = useState<any>();
    useEffect(() => {
        console.log(parser)
        try {
            if (parsed?.payload ) {
                setPayload(parser?.(parsed.payload, BN));
            }
        } catch (err) {
            console.error(err);
        }
    }, [parser, parsed]);
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="top">
            <Grid item xs={12}>
                <Toolbar>
                    <Button>Save</Button>
                </Toolbar>
            </Grid>
            <Grid item xs={6}>
                {error ? <Alert severity="error">{error?.message}</Alert> : ''}
                <TextField value={vaa} onChange={e => setVaaString(e.target.value)} fullWidth/>
                <VaaInspector payload={payload} vaaString={vaa} vaa={parsed} onVaaChange={setVaaString} />
            </Grid>
            <Grid item xs={6}>
                <SourceCodeEditor value={source} onChange={onParserChange}/>
            </Grid>
        </Grid>
    )
}