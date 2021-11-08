import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PopUpMenu.module.scss';
import cx from 'classnames';

export default class MenuItem extends Component {
    render() {
        return (
            <div className={cx(styles.menuItem, styles.button)} onClick={this.props.onClick}>
                {this.props.text}
            </div>
        );
    }
}

MenuItem.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
};

MenuItem.defaultProps = {
    text: '',
    onClick: () => console.log('Button clicked')
};
