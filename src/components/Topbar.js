import styles from '../styles/Topbar.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PopUpMenu from './PopUpMenu';

export default function Topbar(props) {
    var buttons = (
        <div className={styles.buttons}>
            <button className={cx(styles.button, styles.font)}> Login </button>
            <button className={cx(styles.button, styles.font)}> Register </button>
        </div>
    );

    if (props.userType === 'ADMIN') buttons = (
        <div className={styles.buttons}>
            <PopUpMenu open={true}></PopUpMenu>
        </div>
    );

    return (
        <div className={styles.topbar}>
            <div className={cx(styles.logo, styles.logoFont)}>
                DR D. E. Livery
            </div>
            <input className={styles.searchbar} placeholder='Search' />
            {buttons}
        </div>
    );
}

Topbar.propTypes = {
    userType: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
