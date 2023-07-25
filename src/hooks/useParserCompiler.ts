import { parseVaa } from "@certusone/wormhole-sdk";
import { useState, useEffect, useRef } from "react";
import { transpile, ScriptTarget } from "typescript";
import vm from "vm";

const PAYLOAD_TRANSFER_PARSER = `
function parse(payload: Buffer) {
    const payloadType = payload.readUInt8(0);
    const amount = BigInt(new BN(payload.subarray(1, 33)).toString());
    const tokenAddress = payload.subarray(33, 65);
    const tokenChain = payload.readUInt16BE(65);
    const to = payload.subarray(67, 99);
    const toChain = payload.readUInt16BE(99);
    const fee = payloadType == 1
        ? BigInt(new BN(payload.subarray(101, 133)).toString())
        : null;
    const fromAddress = payloadType == 3 ? payload.subarray(101, 133) : null;
    const tokenTransferPayload = payload.subarray(133);
    return {
        payloadType,
        amount,
        tokenAddress,
        tokenChain,
        to,
        toChain,
        fee,
        fromAddress,
        tokenTransferPayload,
    };
}
`;

export interface ParserCompiler {
    error: any;
    source: string;
    parser: (payload: Uint8Array, BN: any) => any;
    onParserChange: (source: string) => void;
}

export default function useParserCompiler(): ParserCompiler {
    const [error, setError] = useState<any>(null);
    const ref = useRef<any>();
    const [source, onParserChange] = useState<string>(PAYLOAD_TRANSFER_PARSER);

    useEffect(() => {
        try {
            const compiled = transpile(source, { noImplicitAny: true, target: ScriptTarget.ESNext, allowJs: true });
            const fn = new Function('payload', 'BN', 
            `
                ${compiled};
                return parse(payload);
            `);
            const context = { x: 2 };
            vm.createContext(context); // Contextify the object.

            const code = 'x += 40; var y = 17;';
            // `x` and `y` are global variables in the context.
            // Initially, x has the value 2 because that is the value of context.x.
            console.log(vm.runInContext(code, context));
            ref.current = fn;
            setError(null);
        } catch (err) {
            setError(err);
        }
    }, [source]);
    return { error, source, parser: ref.current, onParserChange};
}

export function useParser() {
    const [error, setError] = useState<any>(null);
    const [source, setSource] = useState<string>(PAYLOAD_TRANSFER_PARSER);
    const onParserChange  = (source: string) => setSource(source);
    return {
        error,
        onParserChange
    }
}