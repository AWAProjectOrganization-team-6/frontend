import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function AccountInfo() {
    return (
        <>
            <Topbar/>
            <div className = { styles.infoField }>
                <div className = { styles.title }>Account Information</div>
                <div className = { styles.infoBoxes }>
                    <input className = { styles.inputs } placeholder='First name' />

                    <input className = { styles.inputs }placeholder='Last name' />

                    <input className = { styles.inputs } placeholder='Address' />

                    <input className = { styles.inputs } placeholder='Phone number' />

                    <input className = { styles.inputs } placeholder='Email' />
                </div>
                <div className = { styles.buttons }>
                    <div className = { styles.cancelButton }>Cancel</div>
                    <div className = { styles.confirmButton }>Confirm</div>
                </div>
            </div>
            <Footer/>
        </>
    );
}