import { ParsedVaa, parseVaa } from "@certusone/wormhole-sdk";
import { useState, useEffect } from "react";

const strip0x = (input: string) => (input.startsWith("0x") ? input.slice(2) : input);

const EMPTY = '';

export default function useVaa(): { parsed: ParsedVaa | null, vaa: string, setVaaString: (vaa: string) => void} {
  const [vaa, setVaaString] = useState<string>(EMPTY);
  const [parsed, setParsedVaa] = useState<ParsedVaa | null>(null);
  const isBase64Encoded = (vaa: string) => /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(vaa);
  const isHex = (vaa: string) => /^[0-9a-fA-F]+$/.test(vaa);
  useEffect(() => {
    try {
      if (vaa !== EMPTY) {
        if (isHex(vaa)) {
          const decoded = Buffer.from(strip0x(vaa), "hex");
          setParsedVaa(parseVaa(decoded));
        } else if (isBase64Encoded(vaa)) {
          const decoded = Buffer.from(vaa, "base64");
          setParsedVaa(parseVaa(decoded));
        } 
      }
    } catch (err) {
      console.error(err);
      setParsedVaa(null);
    }

  }, [vaa]);
    return { parsed, vaa, setVaaString };
  }