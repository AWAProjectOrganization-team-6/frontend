import styles from '../styles/Topbar.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { HiOutlineMenu } from 'react-icons/hi';

export default function Topbar(props) {
    var buttons = (
        <div className={styles.buttons}>
            <button className={cx(styles.button, styles.font)}> Login </button>
            <button className={cx(styles.button, styles.font)}> Register </button>
        </div>
    );

    if (props.userType === 'ADMIN') buttons = (
        <div className={styles.buttons}>
            <HiOutlineMenu className={styles.menu}/>
        </div>
    );



    return (
        <div className={styles.topbar}>
            <div className={cx(styles.logo, styles.font)}>
                DR D. E. Livery
            </div>
            <input className={styles.searchbar} placeholder='Search' />
            {buttons}
        </div>
    );
}

Topbar.propTypes = {
    userType: PropTypes.string.isRequired
};