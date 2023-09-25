import styles from "./Card.module.css";

function Card({ link, avatar, name, stars, desc, lang }) {
  return (
    <a href={link}>
      <div className={styles.repoCard}>
        <img src={avatar} alt={name} />
        <h3>{name}</h3>
        <p>⭐ {stars}</p>
        <p>{desc ? desc : "N/A"}</p>
        <p>Language: {lang ? lang : "N/A"}</p>
      </div>
    </a>
  );
}

export default Card;
