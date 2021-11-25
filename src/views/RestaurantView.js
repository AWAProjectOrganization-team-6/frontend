import styles from '../styles/RestaurantView.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PopUpMenu from '../components/PopUpMenu';
import MenuItem from '../components/MenuItem';

export default function RestaurantView() {

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
                    <PopUpMenu title="Name"></PopUpMenu>
                    </div>
                    <div className= {styles.product}>Something</div>
                    <div className= {styles.product}>Something</div>
                    <div className= {styles.product}>Something</div>
                    <div className= {styles.product}>Something</div>
                    <div className= {styles.product}>Something</div>
                </div>      
            </div>
        </div>
    );



    return (
        <>
            <Topbar/>
            <div className = { styles.content }>
                <div>{restaurantInfo}</div>
                <div>{restaurantMenu}</div>
            </div>
            <Footer/>
        </>
    );
}