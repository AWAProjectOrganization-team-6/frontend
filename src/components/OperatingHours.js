import styles from '../styles/OperatingHours.module.scss';
import cx from 'classnames';

export default function operatingHours (props) {

    const listOfTimes = props.times.map((time, i) =>
        <option key={i}>{time}</option>
    );

    const handleOperatingHours = (event) => {
        switch (event.target.name) {
            case 'opening':
                props.parentCallBack(event.target.value);
                break;
        
            case 'closing':
                props.parentCallBack(event.target.value);
                break;

            case 'kitchenClosing':
                props.parentCallBack(event.target.value);
                break;
        }
    };

    const listOfDays = props.days.map((day, i) =>
        <li key={i}>
            <label className={styles.labels}>{day}</label>  
            <select name='opening' defaultValue='default' className={styles.select} onChange={handleOperatingHours}>
                <option value='default' disabled hidden>
                    Opening
                </option>
                {listOfTimes}
            </select>           
            <select name='closing' className={cx(styles.dash,styles.select)} defaultValue='default' onChange={handleOperatingHours}>
                <option value='default' disabled hidden>
                    Closing
                </option>
                {listOfTimes}
            </select>
            <input name='kitchenClosing' type='number' min='0' max='120' onChange={handleOperatingHours}>
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
