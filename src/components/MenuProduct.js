import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PopUpMenu.module.scss';
import cx from 'classnames';

export default class MenuProduct extends Component {
    render() {
        /** @type {string} */
        let text = this.props.text;

        let result = text;
        if (text.includes('\\n'))
            result = (
                <>
                    {text.split('\\n').map((text, index) => {
                        if (index != 0)
                            return (
                                <>
                                    <br />
                                    {text}
                                </>
                            );
                        return text;
                    })}
                </>
            );

        return (
            <div className={cx(styles.menuItem, styles.button, styles.elem)} onClick={this.props.onClick}>
                {result}
            </div>
        );
    }
}

MenuProduct.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

MenuProduct.defaultProps = {
    text: '',
    onClick: () => console.log('Button clicked'),
};