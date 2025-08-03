import { useState, useEffect } from "react";
import FileExplorer from "./components/FileExplorer";
import CodeIDE from "./components/CodeIDE";
import "./App.css";

function App() {
    const [files, setFiles] = useState([]);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [selectedFile, setSelectedFile] = useState("");
    const [repos, setRepos] = useState([]);
    const [showConsole, setShowConsole] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState("");


    useEffect(() => {
        fetch("https://api.github.com/users/odinlindal/repos")
            .then(res => res.json())
            .then(data => {
                const publicRepos = data.filter(repo => !repo.fork);
                setRepos(publicRepos);
            });
    }, []);

    async function handleRepoSelect(repo) {
        setSelectedRepo(repo.name);
        const url = `https://api.github.com/repos/${repo.full_name}/contents/`;
        const res = await fetch(url);
        const contents = await res.json();

        if (!res.ok) {
            alert(`Failed to fetch repo contents: ${res.status}`);
            return;
        }

        const codeFiles = contents.filter(file =>
            /\.(cpp|h|java|py|js|ts)$/i.test(file.name)
        );

        setFiles(codeFiles);
    }

    async function handleFileClick(file) {
        const res = await fetch(file.download_url);
        const text = await res.text();

        setCode(text);
        setSelectedFile(file.name);

        const ext = file.name.split(".").pop();
        const langMap = {
            cpp: "cpp",
            h: "cpp",
            java: "java",
            py: "python",
            js: "javascript",
            ts: "typescript",
        };
        setLanguage(langMap[ext] || "plaintext");
    }

    function handleRunClick() {
        setConsoleOutput("Simulated program output...");
        setShowConsole(true);
    }


    return (
        <div className="app-container">
            <div className="sidebar">
                <h3>Projects</h3>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {repos.map((repo) => (
                        <li key={repo.id}>
                            <button className="repo-button" onClick={() => handleRepoSelect(repo)}>
                                {repo.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {selectedRepo && (
                    <div className="file-list">
                        <h4>Files in <em>{selectedRepo}</em>:</h4>
                        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                            {files.map((file) => (
                                <li key={file.sha}>
                                    <button className="file-button" onClick={() => handleFileClick(file)}>
                                        {file.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="editor-area">
                {selectedFile ? (
                    <>
                        <div className="editor-header">
                            <h2>{selectedFile}</h2>
                            <button className="run-button" onClick={handleRunClick}>Run</button>
                        </div>
                        <>
                            <CodeIDE code={code} language={language} />
                            <div className="console-output">{consoleOutput || "Output will appear here..."}</div>
                        </>

                    </>
                ) : (
                    <p>Select a file to preview its code</p>
                )}
            </div>
        </div>
    );
}

export default App;
