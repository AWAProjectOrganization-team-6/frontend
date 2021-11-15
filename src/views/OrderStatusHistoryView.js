import styles from '../styles/OrderStatusHistoryView.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function OrderStatusHistoryView() {

    var orderStatus = (
        <div className={cx(styles.fonts, styles.font)} >
            <div>Order Status</div>
            <div>Status: something</div>
            <div>Estimated Time of Delivery: something</div>
            <div>Manager phone number: something</div>
        </div>
    );

    var picture = (
        <div>
            Some picture
        </div>
    );

    var historyView = (
        <div className={cx(styles.fonts, styles.font)} >
            <div>Order History</div>
            <div>something</div>
        </div>
    );



    return (
        <>
            <Topbar/>
            <div className = { styles.mainDiv}>
                <div className = { styles.orderStatusStyle }> {orderStatus} </div>
                <div className = { styles.pictureStyle}> {picture} </div>
                <div className = { styles.historyViewStyle}> {historyView} </div>
            </div>
            <Footer/>
        </>
    );
}