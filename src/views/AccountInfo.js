import styles from '../styles/AccountInfo.module.scss';
import cx from 'classnames';
import { Component } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

let a = 0;
var paymentOption = (
    <></>
);

if (a === 0) 
    paymentOption = (
        <>
            <div className={styles.rows}>
                <input 
                    type='text' 
                    className={styles.mediumPaymentInput}
                    placeholder='First Name'
                />
                <input 
                    type='text' 
                    className={styles.mediumPaymentInput}
                    placeholder='Last Name'
                />
                <input 
                    type='text' 
                    className={styles.mediumPaymentInput}
                    placeholder='City'
                />
            </div>
            <div className={styles.rows}>
                <input 
                    type='text' 
                    className={styles.longPaymentInput}
                    placeholder='Billing Address'
                />
                <input 
                    type='text' 
                    className={styles.mediumPaymentInput}
                    placeholder='Postcode'
                />
            </div>
            <div className={styles.rows}>
                <input 
                    type='text' 
                    className={styles.longPaymentInput}
                    placeholder='Card Number'
                    maxLength='16'
                />
                <input 
                    type='text' 
                    className={styles.exDateCvv}
                    placeholder='xx/xx'
                    maxLength='5'
                />
                <input 
                    type='password' 
                    className={styles.exDateCvv}
                    placeholder='CVV'
                    maxLength='3'
                />
            </div>
            <div className={styles.checkbox}>
                <input type='checkbox'/> Save billing information
            </div>
        </>
    );

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountData: {
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: '',
                paymentOption: {
                    
                }
            }
        };

        // this.paymentSelector = this.paymentSelector.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    // onChange(event) {
    //     let accountData = { ...this.state.accountData };

    //     switch (event.target.name) {
    //         case 'firstName':
    //             accountData.firstName = event.target.value;
    //             break;
    //         case 'lastName':
    //             accountData.lastName = event.target.value;
    //             break;
    //         case 'address':
    //             accountData.address = event.target.value;
    //             break;
    //         case 'phoneNumber':
    //             accountData.phoneNumber = event.target.value;
    //             break;
    //         case 'email':
    //             accountData.email = event.target.value;
    //             break;
    //         case 'paymentOption':
    //             this.setState({ paymentOption: event.target.value });
    //             break;
    //     }

    //     this.setState({ accountData });
    //     console.log(this.state);
    // }

    render() {
        return (
            <>
                <Topbar/>
                <div className = {cx(styles.infoField, styles.font)}>
                    <div>
                        <div className = { styles.title }>Account Information</div>
                        <div className = { styles.infoBoxes }>
                            <input 
                                className = { styles.inputs } 
                                name='firstName' 
                                placeholder='First name' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='lastName' 
                                placeholder='Last name' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='address' 
                                placeholder='Address' 
                                type='text' 
                                onChange={this.onChange}
                            />
                            <input 
                                className = { styles.inputs } 
                                name='phoneNumber' 
                                placeholder='Phone number' 
                                type='text' 
                                onChange={this.onChange}/>
                            <input 
                                className = { styles.inputs } 
                                name='email' 
                                placeholder='Email' 
                                type='email' 
                                onChange={this.onChange}
                            />
                        </div>
                        <div className = { styles.buttons }>
                            <button className = { styles.cancelButton }>Cancel</button>
                            <button className = { styles.confirmButton }>Confirm</button>
                        </div>
                    </div>
                    <div className = { styles.paymentSystem}>
                        <div className = { styles.title}>Select payment option</div>
                        <select className = { styles.paymentSelector }>
                            <option className = { styles.paymentOption }>Debit card</option>
                            <option className = { styles.paymentOption }>PayPal</option>
                        </select>
                        <div className = { styles.paymentField}>
                            {paymentOption}
                        </div>
                    </div>  
                </div>
                <Footer/>
            </>
        );
    }
}

export default AccountInfo;