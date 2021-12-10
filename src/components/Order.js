import react from "react";
import styles from "../styles/Order.module.scss";
import React, { useState, useEffect } from 'react';

export default function Order(props) {

    const [status, setStatus] = useState('');
    let [count, setCount] = useState(1);
    let kaka = 0;
    let [_timer, setTimer] = useState(false);
    let [timeOfDelivery, setTimeOfDelivery] = useState(59);
        
    
    useEffect(()=>{
        if (_timer) {
            let timer = setInterval(()=>{
                setTimeOfDelivery(timeOfDelivery-1);
            }, 1000);
        
            return () => {
                clearInterval(timer);
            };
        } 
    });

    let changeStatus = () => {
        setCount(count + 1);
        if (count === 7) {
            count = 0;
        }
        // count++;
        // console.log(count);

        switch(count) {
            case 1:
                var recieved = 'Recieved';
                console.log(count);
                setStatus(recieved);
                break;
            case 2:
                var preparing = 'Preparing';
                console.log(count);
                setStatus(preparing);
                break;
            case 3:
                var readyForDelivery = 'Ready for delivery';
                console.log(count);
                setStatus(readyForDelivery);
                break;
            case 4:
                var delivering = 'Delivering';
                console.log(count);
                setStatus(delivering);
                break;
            case 5:
                var delivered = 'Delivered';
                console.log(count);
                setStatus(delivered);
                break;
            case 6:
                var status6 = '';
                console.log(count);
                setStatus(status6);
                break;
        }
    };

    var statusButton = (
        <></>
    );
    
    if (kaka === 0)
        statusButton = (
            <div name='status' className={styles.orderStatus}>
                <div>Status: {status} </div>
                <button className={styles.statusButton} onClick={changeStatus}>Change status</button>
            </div>
        );
        
    if (kaka === 1)
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
                    <div name='estTimeOfDelivery'>Estimated Time of Delivery: 0:{timeOfDelivery}</div>
                </div>
                <div>
                    <button id='btn' onClick={()=> setTimer(true)}>Start</button>
                    <button onClick={()=> setTimer(false)}>Stop</button>
                </div>
            </>
        ); 
}
