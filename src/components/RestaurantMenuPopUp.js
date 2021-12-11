import { Component } from 'react';
import styles from '../styles/RestaurantMenuPopUp.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MenuProduct from './MenuProduct';

export default class RestaurantMenuPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = { shown: false };

        this.onMenuClicked = this.onMenuClicked.bind(this);
    }

    closeMenuListenner = (event) => {
        if (!event.target.closest(`[data-menu${this.props.index}]`)) {
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

    menu = {[`data-menu${this.props.index}`] : true}
    render() {
        return (
            <>
                <div className={styles.menuIcon} onClick={this.onMenuClicked} {...this.menu}>Something</div>
                <div className={cx(styles.menu, styles.font, this.state.shown ? styles.on : undefined)} {...this.menu}>
                    <div className={styles.pictureNamePrice}>
                        <div className={styles.productPicture}>Picture</div>
                        <div className={styles.nameAndPrice}>
                            <MenuProduct text="Name"></MenuProduct>
                            <MenuProduct text="Price + possible offer"></MenuProduct>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <MenuProduct text="Description"></MenuProduct>
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

RestaurantMenuPopUp.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};