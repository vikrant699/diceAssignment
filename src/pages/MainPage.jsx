import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Card from "../components/Card";
import styles from "./MainPage.module.css";
import loading from "../assets/loading.json";

function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [sortBy, setSortBy] = useState("stars");
  const [finalSearchQuery, setFinalSearchQuery] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFinalSearchQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchRepos() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${finalSearchQuery}&sort=${sortBy}&per_page=100}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching data from GitHub API: ${response.status}`
          );
        }
        const data = await response.json();
        setRepos(data.items);
      } catch (error) {
        console.error("Error fetching data from GitHub API:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (finalSearchQuery.trim() !== "") {
      fetchRepos();
    }
  }, [finalSearchQuery, sortBy]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Github Repository Search</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search a repository..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.dropdown}
        >
          <option value="stars">Stars</option>
          <option value="watchers">Watchers</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created">Created At</option>
          <option value="updated">Updated At</option>
        </select>
      </div>
      {isLoading && searchQuery ? (
        <div className={styles.loadingContainer}>
          <Lottie
            className={styles.lottie}
            animationData={loading}
            loop={true}
          />
        </div>
      ) : (
        <div className={styles.repoList}>
          {repos.map((repo, index) => (
            <Card
              key={index}
              link={repo.clone_url}
              avatar={repo.owner.avatar_url}
              name={repo.name}
              stars={repo.stargazers_count}
              desc={repo.description}
              lang={repo.language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
