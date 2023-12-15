import styles from "./Results.module.css";

export function Results({ title, price, backgroundColor }){
    return(
        <div className={styles.resultsContent}>
            <h5> {title} </h5>
            <div style={{ background: backgroundColor}} className={styles.price}>
            <p> $ {price} </p>
            </div>
        </div>
    )
}