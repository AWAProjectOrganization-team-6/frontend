import styles from "../styles/RestaurantItem.module.scss";
import { CloudinaryContext, Image } from "cloudinary-react";

export default function RestaurantItem() {
    return (
        <div className={styles.restaurantitem}>
            <CloudinaryContext cloudName="ramppasamppa">
                <div>
                    <Image publicId="CremeBrulee_poayhr"/>
                </div>
               
            </CloudinaryContext>

            <div className={styles.itemInfo}>
                <div className={styles.font}>Restaurant</div>
                <div className={styles.font}>Type</div>
                <div className={styles.font}>Star rating, price level</div>
            </div>
        </div>
    );
}
