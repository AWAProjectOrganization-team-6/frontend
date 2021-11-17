import styles from '../styles/OperatingHours.module.scss';
import cx from 'classnames';

export default function operatingHours (props) {

    const listOfTimes = props.times.map((time, i) =>
        <option key={i}>{time}</option>
    );


    const listOfDays = props.days.map((day, i) =>
        <li key={i}>
            <label className={styles.labels}>{day}</label>  
            <select name='opening' defaultValue='default' className={styles.select}>
                <option value='default' disabled hidden>
                    Opening
                </option>
                {listOfTimes}
            </select>           
            <select name='closing' className={cx(styles.dash,styles.select)} defaultValue='default'>
                <option value='default' disabled hidden>
                    Closing
                </option>
                {listOfTimes}
            </select>
            <input name='kitchenClosing' type='number' min='0' max='120'>
            </input>
        </li>
    );

    return (
        <div className={styles.operatingHoursList}>
            <div className={styles.text}>
                Operating Hours
            </div>
            {listOfDays}
        </div>
    );
}
