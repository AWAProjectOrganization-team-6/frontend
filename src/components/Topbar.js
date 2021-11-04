import styles from '../styles/Topbar.module.scss';
export default function Topbar() {

    return (
        <div className={styles.background}>
            <div className={styles.logo}>
                DR D. E. Livery
            </div>
            <div>
                <input className={styles.searchbar} placeholder='Search' />
            </div>
            <div className={styles.buttons}>
                <button className={styles.loginbutton}> Login </button>
                <button className={styles.registerbutton}> Register </button>
            </div>
        </div>
    );
}