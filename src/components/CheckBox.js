import styles from '../styles/CheckBox.module.scss';
import PropTypes from 'prop-types';
import { HiCheck } from 'react-icons/hi';
import { useState } from 'react';
import cx from 'classnames';

const CheckBox = (props) => {
    const { getValue } = props;
    const [checked, setChecked] = useState(false);

    return (
        <div
            className={styles.checkBox}
            onClick={() => {
                setChecked(!checked);
                getValue(!checked);
            }}
        >
            <div className={cx(styles.checkMark, checked ? styles.checked : null)}>{checked ? <HiCheck size={30}></HiCheck> : null}</div>
            <div className={styles.text}>Save billing information</div>
        </div>
    );
};

CheckBox.propTypes = {
    getValue: PropTypes.func,
};

CheckBox.defaultProps = {
    getValue: () => {},
};

export default CheckBox;
