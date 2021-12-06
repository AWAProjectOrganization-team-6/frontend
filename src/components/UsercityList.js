import styles from '../styles/UsercityList.module.scss';
import RestaurantItem from './RestaurantItem';

export default function UsercityList(props) {
    return (
        <div className={styles.userCityStyle}>
            <div className={styles.font}>{props.city}</div>
            <div className={styles.itemPlacement}>
                {props.userCity.map((restaurant) => {
                    console.log(props.userCity);
                    return (
                        <RestaurantItem
                            key={restaurant.restaurant_id}
                            restaurant={restaurant}
                        />
                    );
                })}
            </div>
        </div>
    );
}
