import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useMemo } from "react";


export interface SourceCodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SourceCodeEditor({ value = '', onChange }: SourceCodeEditorProps) {
    const monaco = useMonaco();
    useEffect(() => {
        monaco?.languages.typescript.typescriptDefaults.addExtraLib("Buffer", "declare class Buffer { static from(data: string, encoding: string): Buffer; }");
        monaco?.languages.typescript.typescriptDefaults.setCompilerOptions({ allowJs: true });
    }, [monaco]);
    const onChangeHandler = useMemo(() => (value: string | undefined) => value && onChange(value), [onChange]);
    return (
        <Editor
            onChange={onChangeHandler}
            height="100vh"
            language="typescript"
            value={value}
        />
    );
}