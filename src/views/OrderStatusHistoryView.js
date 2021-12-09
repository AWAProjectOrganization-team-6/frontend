import styles from '../styles/OrderStatusHistoryView.module.scss';
import cx from 'classnames';
// import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Order from '../components/Order';
import {  Component } from 'react';

var orderStatus = (
    <div className={cx( styles.orderStatusContent, styles.fonts, styles.font)} >
        <div className={styles.orderStatusTitle}>Order Status</div>
        <Order/>
        {/* <Order/> */}
        <div name='managerPhoneNumber'>Manager phone number: </div>
    </div>
);

var picture = (
    <div>
        <img src=""/>
    </div>
);

var historyView = (
    <div className={cx(styles.historyViewContent, styles.fonts, styles.font)} >
        <div>Order History</div>
        <div name='orderHistory'></div>
    </div>
);


class OrderStatusHistoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatusHistoryView: {
                status: '',
                estTimeOfDelivery: '',
                managerPhoneNumber: '',
                orderHistory: {

                }
            }
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let orderStatusHistoryView = { ...this.state.orderStatusHistoryView };

        switch (event.target.name) {
            case 'status':
                orderStatusHistoryView.status = event.target.value;
                break;
            case 'estTimeOfDelivery':
                orderStatusHistoryView.estTimeOfDelivery = event.target.value;
                break;
            case 'managerPhoneNumber':
                orderStatusHistoryView.managerPhoneNumber = event.target.value;
                break;
            case 'orderHistory':
                orderStatusHistoryView.orderHistory = event.target.value;
                break;
        }

        this.setState({ orderStatusHistoryView });
        // console.log(this.state);
    }


    render() {
        return (
            <>
                {/* <Topbar/> */}
                <div className = { styles.mainDiv}>
                    <div className = { styles.orderStatusStyle }> {orderStatus} </div>
                    <div className = { styles.pictureStyle}> {picture} </div>
                    <div className = { styles.historyViewStyle}> {historyView} </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default OrderStatusHistoryView;