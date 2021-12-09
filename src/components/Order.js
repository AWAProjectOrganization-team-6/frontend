import react from "react";
import styles from "../styles/Order.module.scss";

export default function Order(props) {
    let counter = 0;
    var orderStatus;
    // let orderStatus = ['Recieved', 'Preparing', 'Ready for delivery', 'Delivering', 'Delivered'];


    function changeOrderStatus(orderStatus) {
        counter++;
        console.log(counter);

        switch(counter) {
            case 1:
                orderStatus = 'Recieved';
                break;
            case 2:
                orderStatus = 'Preparing';
                break;
            case 3:
                orderStatus = 'Ready for delivery';
                break;
            case 4:
                orderStatus = 'Delivering';
                break;
            case 5:
                orderStatus = 'Delivered';
                break;
            case 6:
                orderStatus = '';
                break;
        }

        if (counter === 6) {
            counter = 0;
        }

        return console.log(orderStatus);
        
    }




    var statusButton = (
        <></>
    );
    
    if (props.user?.type === 'ADMIN' || counter === 0)
        statusButton = (
            <div name='status' className={styles.orderStatus}>
                <div>Status: {orderStatus} </div>
                <button className={styles.statusButton} onClick={changeOrderStatus}>Change status</button>
            </div>
        );

    if (props.user?.type === 'USER')
        statusButton = (
            <div name='status' className={styles.orderStatus}>
                <div>Status: {orderStatus}</div>
            </div>
        );    

    return(
        <>
            <div className={styles.orderStatusContent} >
                <div>Order ID:</div>
                {statusButton}
                <div name='estTimeOfDelivery'>Estimated Time of Delivery: </div>
            </div>
        </>
    ); 
}