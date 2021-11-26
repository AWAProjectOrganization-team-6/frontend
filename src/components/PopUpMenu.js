import { Component } from 'react';
import styles from '../styles/PopUpMenu.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MenuItem from './MenuItem';

export default class PopUpMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { shown: false };

        this.onMenuClicked = this.onMenuClicked.bind(this);
    }

    closeMenuListenner = (event) => {
        if (!event.target.closest('[data-menu]')) {
            this.onMenuClicked();
        }
    }

    onMenuClicked() {
        if (!this.state.shown) {
            this.setState({ shown: !this.state.shown });
            document.addEventListener('click', this.closeMenuListenner);
        } else {
            document.removeEventListener('click', this.closeMenuListenner);
            this.setState({ shown: !this.state.shown });
        }
    }

    render() {
        return (
            <>
                <div className={styles.menuIcon} onClick={this.onMenuClicked} data-menu>Something</div>
                <div className={cx(styles.menu, styles.font, this.state.shown ? styles.on : undefined)} data-menu>
                    <div className={styles.pictureNamePrice}>
                        <div className={styles.productPicture}>Picture</div>
                        <div className={styles.nameAndPrice}>
                            <MenuItem text="Name"></MenuItem>
                            <MenuItem text="Price + possible offer"></MenuItem>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <MenuItem text="Description"></MenuItem>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={this.onMenuClicked} className={cx(styles.closeButton, styles.font)}>Close</button>
                        <button className={cx(styles.addToCartButton, styles.font)}>Add to cart</button>
                    </div>
                </div>
            </>
        );
    }
}

PopUpMenu.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};