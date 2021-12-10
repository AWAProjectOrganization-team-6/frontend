import react from "react";
import styles from "../styles/Order.module.scss";
import React, { useState, useEffect } from "react";

function Timer() {
  let [_timer, setTimer] = useState(true);
  let [timeOfDelivery, setTimeOfDelivery] = useState(59);

  useEffect(() => {
    if (_timer) {
      let timer = setInterval(() => {
        setTimeOfDelivery(timeOfDelivery - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  });
  return <span>{timeOfDelivery}</span>;
}

function Status(props) {
  const [status, setStatus] = useState("");
  let [count, setCount] = useState(1);

  let changeStatus = () => {
    setCount(count + 1);
    if (count === 7) {
      count = 0;
    }
    // count++;
    // console.log(count);

    switch (count) {
      case 1:
        // status = 'Recieved';
        console.log(count);
        setStatus("Recieved");
        break;
      case 2:
        // status = 'Preparing';
        console.log(count);
        setStatus("Preparing");
        break;
      case 3:
        // status = 'Ready for delivery';
        console.log(count);
        setStatus("Ready for delivery");
        break;
      case 4:
        // status = 'Delivering';
        console.log(count);
        setStatus("Delivering");
        break;
      case 5:
        // status = 'Delivered';
        console.log(count);
        setStatus("Delivered");
        break;
      case 6:
        console.log(count);
        setStatus("");
        break;
    }
  };

  return (
    <>
      <div>Status: {status}</div>
      {props.user??<button className={styles.statusButton} onClick={changeStatus}>Change status</button>}
    </>
  );
}

export default function Order(props) {
  var statusButton = <></>;

  if (props.user?.type === 'ADMIN')
    statusButton = (
      <div name="status" className={styles.orderStatus}>
        <Status user={props.user}/>
      </div>
    );

  if (props.user?.type === 'USER')
    statusButton = (
      <div name="status" className={styles.orderStatus}>
        <Status/>
      </div>
    );

  return (
    <>
      <div className={styles.orderStatusContent}>
        <div>Order ID:</div>
        {statusButton}
        <div name="estTimeOfDelivery">
          Estimated Time of Delivery: 0:<Timer/>
        </div>
      </div>
    </>
  );
}
