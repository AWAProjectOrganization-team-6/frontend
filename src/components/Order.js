import react from "react";
import styles from "../styles/Order.module.scss";
import {useState} from 'react';

export default function Order(props) {
    // var counter = 0;
    // console.log(counter);
    // orderStatus = '';
    let a = 0;
    var counter = 0;
    const [status, setStatus] = useState('');
    // let orderStatus = ['Recieved', 'Preparing', 'Ready for delivery', 'Delivering', 'Delivered'];


    const changeStatus = ()=> {
        counter++;

        switch(counter) {
            case 1:
                var status1 = 'Recieved';
                console.log(counter);
                setStatus(status1);
                break;
            case 2:
                var status2 = 'Preparing';
                // console.log(orderStatus);
                console.log(counter);
                setStatus(status2);
                break;
            case 3:
                var status3 = 'Ready for delivery';
                // console.log(orderStatus);
                console.log(counter);
                setStatus(status3);
                break;
            case 4:
                var status4 = 'Delivering';
                // console.log(orderStatus);
                console.log(counter);
                setStatus(status4);
                break;
            case 5:
                var status5 = 'Delivered';
                // console.log(orderStatus);
                console.log(counter);
                setStatus(status5);
                break;
            case 6:
                var status6 = '';
                // console.log(orderStatus);
                console.log(counter);
                setStatus(status6);
                break;
        }

        if (counter === 6) {
            counter = 0;
        }
        // return orderStatus;

        // if (counter === 1) {
        //     var status1 = 'Recieved';
        //     // console.log(orderStatus);
        //     setStatus(status1);
        // } else if (counter === 2) {
        //     var status2 = 'Preparing';
        //     // console.log(orderStatus);
        //     setStatus(status2);
        // } else if (counter === 3) {
        //     var status3 = 'Ready for delivery';
        //     // console.log(orderStatus);
        //     setStatus(status3);
        // } else if (counter === 4) {
        //     var status4 = 'Delivering';
        //     // console.log(orderStatus);
        //     setStatus(status4);
        // } else if (counter === 5) {
        //     var status5 = 'Delivered';
        //     // console.log(orderStatus);
        //     setStatus(status5);
        // } else if (counter === 6) {
        //     var status6 = '';
        //     // console.log(orderStatus);
        //     setStatus(status6);
        //     counter = 0;
        // }
        
    };




    var statusButton = (
        <></>
    );
    
    if (props.user?.type === 'ADMIN' || a === 0)
        statusButton = (
            <div name='status' className={styles.orderStatus}>
                <div>Status: {status} </div>
                <button className={styles.statusButton} onClick={changeStatus}>Change status</button>
            </div>
        );

    if (props.user?.type === 'USER')
        statusButton = (
            <div name='status' className={styles.orderStatus}>
                <div>Status: {status} </div>
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