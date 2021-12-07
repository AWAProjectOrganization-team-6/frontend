import styles from '../styles/CreateAccount.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function CreateAccount() {
    var accountType = (
        <div className={styles.userType}>
            <label className={styles.font}> Manager </label>
            <input type="radio" name="accountType" value="ADMIN"></input>
            <label className={styles.font}> Customer </label>
            <input type="radio" name="accountType" value="USER"></input>
        </div>
    );

    return (
        <>
            <Topbar />
            <div className={styles.createAccount}>
                <div className={cx(styles.logo, styles.font)}>Account Creation</div>
                <div className={styles.textFields}>
                    <input type="text" className="form-control" placeholder="First name" />
                    <input type="text" className="form-control" placeholder="Last name" />
                    <input type="text" className="form-control" placeholder="Street address" />
                    <input type="text" className="form-control" placeholder="Phone number" />
                    <input type="text" className="form-control" placeholder="Email address" />
                    <input type="text" className="form-control" placeholder="Password" />
                    <input type="text" className="form-control" placeholder="Repeat password" />
                </div>

                {accountType}

                <button className={cx(styles.button, styles.font)}> Create Account </button>
            </div>
            <Footer />
        </>
    );
}
