import styles from "@/styles/Home.module.css";

function ErrorMessage({ message }) {
  return (
    <div className={styles.error}>
      <h2>Oops! Something went wrong</h2>
      <p>{message || "Unable to load launch data. Please try again later."}</p>
      <button onClick={() => window.location.reload()} className={styles.error__button}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorMessage;
