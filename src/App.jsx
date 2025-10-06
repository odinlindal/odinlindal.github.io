import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [repos, setRepos] = useState([]);
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [showViewMore, setShowViewMore] = useState(false);


    useEffect(() => {
        fetch("https://api.github.com/users/odinlindal/repos")
            .then(res => res.json())
            .then(data => {
                const publicRepos = data.filter(repo => !repo.fork);
                setRepos(publicRepos);
                setShowViewMore(publicRepos.length > 6);
            });
    }, []);

    function loadMoreProjects() {
        setVisibleProjects(repos.length);
        setShowViewMore(false);
    }


    return (
        <div className="portfolio-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">Odin Lindal</span>
                        </h1>
                        <p className="hero-subtitle">
                            Electrical and Computer Engineering Student
                        </p>
                        <p className="hero-description">
                            I love building things, whether it's race car electronics, lunar rovers, or a piece of software that makes life easier. 
                            I'm fueled by curiosity, hands-on problem-solving, and the thrill of turning an idea into something real.
                        </p>
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">View My Work</a>
                            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img 
                            src="https://media.licdn.com/dms/image/v2/D5603AQGdWVd_1Ncy5Q/profile-displayphoto-shrink_800_800/B56ZdVLXbWGoAk-/0/1749480732988?e=1762387200&v=beta&t=R60u_FtDSAIDLPVyB3tYyTBbww8HW_9sHlFRJYYgGsQ" 
                            alt="Odin Lindal" 
                            className="headshot"
                        />
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects-section">
                <div className="section-container">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-subtitle">
                        Here are some of the projects I've been working on through the years.
                        Mostly school projects, but a few personal ones as well.
                    </p>
                    <div className="projects-grid">
                        {repos.slice(0, visibleProjects).map((repo) => (
                            <div key={repo.id} className="project-card">
                                <div className="project-header">
                                    <h3 className="project-title">{repo.name}</h3>
                                    <div className="project-links">
                                        <a 
                                            href={repo.html_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <span>🔗</span>
                                        </a>
                                    </div>
                                </div>
                                <p className="project-description">
                                    {repo.description || "A software project showcasing various programming concepts and technologies."}
                                </p>
                                <div className="project-meta">
                                    <span className="project-language">
                                        {repo.language || "Various"}
                                    </span>
                                    <span className="project-stars">
                                        ⭐ {repo.stargazers_count}
                                    </span>
                                </div>
                                <div className="project-topics">
                                    {repo.topics && repo.topics.slice(0, 3).map((topic, index) => (
                                        <span key={index} className="project-topic">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* View More Button */}
                    {showViewMore && (
                        <div className="view-more-container">
                            <button 
                                onClick={loadMoreProjects} 
                                className="btn btn-outline view-more-btn"
                            >
                                View {Math.min(6, repos.length - visibleProjects)} More Projects
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default App;
