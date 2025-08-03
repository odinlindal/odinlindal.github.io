import Editor from "@monaco-editor/react";

function CodeIDE({ code, language }) {
    return (
        <Editor
            height="500px"
            defaultLanguage={language}
            defaultValue={code}
            theme="vs-dark"
            options={{
                readOnly: true,
                minimap: { enabled: false },
                wordWrap: "on",
                fontSize: 14,
                scrollBeyondLastLine: false,
            }}
        />
    );
}

export default CodeIDE;
