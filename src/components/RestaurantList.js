import styles from '../styles/RestaurantList.module.scss';
import RestaurantItem from './RestaurantItem';

export default function RestaurantList(props) {
    return (
        <div className={styles.restaurantlist}>
            <div className={styles.font}>{props.city}</div>
            <div className={styles.itemPlacement}>
                {props.restaurants.map(restaurant,index=>)
                
                }
            </div>
        </div>
    );
}
