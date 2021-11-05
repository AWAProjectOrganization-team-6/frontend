import styles from '../styles/SpecialOffersItem.module.scss';

export default function SpecialOffersItem() {
    return (
        <div className={styles.specialoffersitem}>
            <img src="images/thumb.jpg" alt="" />
            <div className={styles.offerInfo}>
                <div>
                    <div className={styles.font}>Product</div>
                    <div className={styles.font}>Restaurant</div>
                </div>

                <div className={styles.font}>Offer</div>
            </div>
        </div>
    );
}
