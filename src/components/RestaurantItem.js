import styles from '../styles/RestaurantItem.module.scss';

export default function RestaurantItem() {
    return (
        <div className={styles.restaurantitem}>
            <img src="images/cat.jpg" alt="" />

            <div className={styles.itemInfo}>
                <div className={styles.font}>Restaurant</div>
                <div className={styles.font}>Type</div>
                <div className={styles.font}>Star rating, price level</div>
            </div>
        </div>
    );
}
