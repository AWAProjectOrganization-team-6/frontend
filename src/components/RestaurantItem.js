import styles from '../styles/RestaurantItem.module.scss';
import { CloudinaryContext, Image } from 'cloudinary-react';

export default function RestaurantItem(props) {
    return (
        <div className={styles.restaurantitem}>
            <CloudinaryContext cloudName="ramppasamppa">
                <div>
                    <Image publicId={props.restaurant.picture} />
                </div>
            </CloudinaryContext>

            <div className={styles.itemInfo}>
                <div className={styles.font}>{props.restaurant.name}</div>
                <div className={styles.font}>{props.restaurant.type}</div>
                <div className={styles.font}>
                    <span>{props.restaurant.star_rating}</span>{' '}
                    <span>{props.restaurant.price_level}</span>
                </div>
            </div>
        </div>
    );
}
