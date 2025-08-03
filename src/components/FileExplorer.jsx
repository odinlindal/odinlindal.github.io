import { useEffect, useState } from "react";

export default function FileExplorer({ onRepoSelect }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/odinlindal/repos")
            .then(res => res.json())
            .then(data => {
                const publicRepos = data.filter(repo => !repo.fork);
                setRepos(publicRepos);
            });
    }, []);

    return (
        <div>
            <h3>Projects</h3>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>
                        <button onClick={() => onRepoSelect(repo)}>{repo.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
