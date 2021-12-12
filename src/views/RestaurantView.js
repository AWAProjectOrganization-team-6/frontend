import styles from '../styles/RestaurantView.module.scss';
import cx from 'classnames';
import RestaurantMenuPopUp from '../components/RestaurantMenuPopUp';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIAddress } from '../config.json';
import { CloudinaryContext, Image } from 'cloudinary-react';

export default function RestaurantView(props) {
    const {id} = useParams();
    const restaurantId = id;
    const [restaurant, setRestaurant] = useState({});

    useEffect(async () => {
        try {
            const res = await axios.get(APIAddress + 'restaurant');
            console.log(res);
            let restaurant = res.data.find((val) => val.restaurant_id == restaurantId) ?? {};
            setRestaurant(restaurant);
        } catch (err) {
            if (err) console.log(err);
        }
    }, [restaurantId]);

    
    var restaurantPicture = (
            <CloudinaryContext cloudName="ramppasamppa" className = {styles.pictureStyle}>
                    <Image publicId={restaurant.picture} className={styles.pictureStyleSize}/>
            </CloudinaryContext>
    );
    
    var restaurantInfoText = (
        <div className={cx(styles.restInfo, styles.font)}>
            <div className = {styles.name}>{restaurant.name}</div>
            <div className = {styles.address}>{restaurant.address}</div>
            <div className = {styles.restInfoBottom}>
                <div className = {styles.operatingHours}>
                    <div>Operating Hours</div>
                    <div>Mon-Thu:</div>
                    <div>Fri-Sat:</div>
                </div>
                <div className = {styles.typePriceRating}>
                    <div className = {styles.type}>Type: {restaurant.type}</div>
                    <div className = {styles.priceLevel}>Price Level: {restaurant.price_level}</div>
                    <div className = {styles.rating}>Rating: {restaurant.star_rating}</div>
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