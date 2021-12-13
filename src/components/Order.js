import react from "react";
import styles from "../styles/Order.module.scss";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { APIAddress } from '../config.json';
import {useParams} from 'react-router-dom';

// function Timer() {
//   let [_timer, setTimer] = useState(true);
//   let [seconds, setSeconds] = useState(6);
//   let [minutes, setMinutes] = useState(3);

//   useEffect(() => {
//     if (_timer) {
//       let secondsTimer = setInterval(() => {
//         setSeconds(seconds - 1);
//       }, 1000);
//       return () => {
//         clearInterval(secondsTimer);
//       };
//     }
//   });
//     return <span>{minutes}:{seconds}</span>;
// }

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

  const {id} = useParams();
  const userId = id;
  const [user, setUser] = useState({});

  useEffect(async () => {
    try {
        const res = await axios.get(APIAddress + 'users/@me');
        // console.log('@me');
        // let user = res.data.find((val) => val.user_id == userId) ?? {};
        // setUser(user);
    } catch (err) {
        if (err) console.log(err);
    }
  }, [userId]);

  var statusButton = null;

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
          {/* Estimated Time of Delivery: <Timer/> */}
        </div>
      </div>
    </>
  );
}
