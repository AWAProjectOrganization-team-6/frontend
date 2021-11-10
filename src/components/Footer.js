import styles from '../styles/Footer.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={cx(styles.title, styles.font)}>
                DR D. E. Livery
            </div>
            <div className={cx(styles.font)}>
                <div>Created by:</div>
                <div>Thomas Grönroos</div>
                <div>Konsta Alajärvi</div>
                <div>Samuli Ikäläinen</div>
                <div>Andreas Avetisian</div>
            </div>
            <div className={cx(styles.font)}>
                <div>Sponsored by:</div>
                <div>Ramppasamppa Corporation</div>
            </div>  
        </div>
    );
}

Footer.propTypes = {
    userType: PropTypes.string.isRequired
};