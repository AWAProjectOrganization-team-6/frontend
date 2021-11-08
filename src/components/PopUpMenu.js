import { Component } from 'react';
import styles from '../styles/PopUpMenu.module.scss';
import { HiOutlineMenu } from 'react-icons/hi';
import cx from 'classnames';

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
                <HiOutlineMenu className={styles.menuIcon} onClick={this.onMenuClicked} data-menu></HiOutlineMenu>
                <div className={cx(styles.menu, styles.font, this.state.shown ? styles.on : undefined)} data-menu>
                    <div className={cx(styles.title, styles.menuItem)}>James Bond</div>
                    <div className={styles.menuItem}>Order history</div>
                    <div className={styles.menuItem}>Order status</div>
                    <div className={styles.menuSettings}>
                        <div className={styles.menuItem}>Account info</div>
                        <div className={styles.menuItem}>Logout</div>
                    </div>
                </div>
            </>
        );
    }
}
