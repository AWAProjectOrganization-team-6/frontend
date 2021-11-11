import styles from '../styles/SpecialOffers.module.scss';
import SpecialOffersItem from './SpecialOffersItem';


export default function SpecialOffers() {
    return (
        <div className={styles.specialoffers}>
            <div className={styles.font}>
                 Special Offers
            </div> 
            <div className={styles.offerPlacement}>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                <SpecialOffersItem/>
                
               
               
            </div>    
        </div>
    );
}

