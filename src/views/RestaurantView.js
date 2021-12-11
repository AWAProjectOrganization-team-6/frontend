import styles from '../styles/RestaurantView.module.scss';
import cx from 'classnames';
import RestaurantMenuPopUp from '../components/RestaurantMenuPopUp';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APIAddress } from '../config.json';

export default function RestaurantView(props) {
    const {id} = useParams();
    const restaurantId = id;


    useEffect(async () => {
        try {
            const res = await axios.get(APIAddress + 'restaurant');
            console.log(res);
            // setRestaurant(res.data.find((val) => val.restaurant_id === restaurantId));
        } catch (err) {
            if (err) console.log(err);
        }
    }, [restaurantId]);

    
    var restaurantPicture = (
        <div className = {styles.pictureStyle}>Picture</div>
    );

    var restaurantInfoText = (
        <div className={cx(styles.restInfo, styles.font)}>
            <div className = {styles.name}>Name</div>
            <div className = {styles.address}>Address</div>
            <div className = {styles.restInfoBottom}>
                <div className = {styles.operatingHours}>
                    <div>Operating Hours</div>
                    <div>Mon-Thu:</div>
                    <div>Fri-Sat:</div>
                </div>
                <div className = {styles.typePriceRating}>
                    <div className = {styles.type}>Type:</div>
                    <div className = {styles.priceLevel}>Price Level:</div>
                    <div className = {styles.rating}>Rating:</div>
                </div>
            </div>
        </div>
    );

    var restaurantInfo = (
        <div className= {styles.restaurantInfoStyle}>
            <div>{restaurantPicture}</div>
            <div>{restaurantInfoText}</div>
        </div>
    );

    var restaurantMenu = (
        <div className={cx(styles.restaurantMenuStyle, styles.font)}>
            <div className= {styles.menuTitle}>Menu</div>
            <div className= {styles.categoryData}>
                <div className= {styles.categoryName}>Category Name</div>
                <div className= {styles.categoryProducts}>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={1}/>
                    </div>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={2}/>
                    </div>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={3}/>
                    </div>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={4}/>
                    </div>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={5}/>
                    </div>
                    <div className= {styles.product}>
                        <RestaurantMenuPopUp index={6}/>
                    </div>
                </div>      
            </div>
        </div>
    );



    return (
        <>
            <div className = { styles.content }>
                <div>{restaurantInfo}</div>
                <div>{restaurantMenu}</div>
            </div>
        </>
    );
}