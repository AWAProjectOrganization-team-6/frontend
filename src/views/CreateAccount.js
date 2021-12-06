import styles from '../styles/CreateAccount.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import React from 'react';
import axios from 'axios';
import apiAddress from '../config.json';

export default function CreateAccount(props) {

    const [Password, setPassword] = React.useState();

    const [account, setAccount] = React.useState({
        username: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        type: ''
    });

    const [address, setAddress] = React.useState({
        street_address: '',
        city: '',
        postcode: ''
    });

    const handleInputs = (event) => {

        const newAccount = account;
        const newAddress = address;
        var newPassword = Password;

        switch (event.target.name) {
            case 'fName':
                newAccount.first_name = event.target.value;
                break;

            case 'lName':
                newAccount.last_name = event.target.value;
                break;

            case 'pNumb':
                newAccount.phone = event.target.value;
                break;

            case 'eAdrs':
                newAccount.email = event.target.value;
                break;

            case 'sAdrs':
                newAddress.street_address = event.target.value;
                break;

            case 'city':
                newAddress.city = event.target.value;
                break;

            case 'postcode':
                newAddress.postcode = event.target.value;
                break;

            case 'user':
                newAccount.username = event.target.value;
                break;

            case 'password':
                newAccount.password = event.target.value;
                break;

            case 'repeatPassword':
                newPassword = event.target.value;
                break;

            case 'accountType':
                newAccount.type = event.target.value;
                break;
        }
        setAddress(newAddress);
        setAccount(newAccount);
        setPassword(newPassword);
    };


    const authorization = { 'Authorization': 'bearer ' + props.token };

    const onSubmit = (event) => {
        event.preventDefault();

        if (Password === account.password) {

            console.log(account);
            console.log(address);
            // axios.post(apiAddress + 'users', account, { headers: authorization })
            //     .then((res) => {

            //         axios.post(apiAddress + '/users/@me/address', address, { headers: authorization })
            //             .then((res) => {

            //             });
            //     });
        } else {
            console.log('Passwords dont match!');
        }

    };




    const accountType = (
        <div className={styles.userType}>
            <label className={styles.font}> Manager </label>
            <input type='radio' name='accountType' onChange={handleInputs} value='ADMIN'>
            </input>
            <label className={styles.font}> Customer </label>
            <input type='radio' name='accountType' onChange={handleInputs} value='USER'>
            </input>
        </div>
    );


    return (
        <>
            <Topbar />
            <div className={styles.createAccount}>
                <div className={cx(styles.logo, styles.font)}>
                    Account Creation
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.textFields}>
                        <input type="text" required name='fName' placeholder="First name" onChange={handleInputs} />
                        <input type="text" required name='lName' placeholder="Last name" onChange={handleInputs} />
                        <input type="text" required name='sAdrs' placeholder="Address" onChange={handleInputs} />
                        <input type="text" required name='city' placeholder="City" onChange={handleInputs} />
                        <input type="text" required name='postcode' placeholder="Postcode" onChange={handleInputs} />
                        <input type="text" required name='pNumb' placeholder="Phone number" onChange={handleInputs} />
                        <input type="text" required name='eAdrs' placeholder="Email address" onChange={handleInputs} />
                        <input type="text" required name='user' placeholder="Username" onChange={handleInputs} />
                        <input type="text" required name='password' placeholder="Password" onChange={handleInputs} />
                        <input type="text" required name='repeatPassword' placeholder="Repeat password" onChange={handleInputs} />
                    </div>

                    {accountType}

                    <button className={cx(styles.button, styles.font)} type='submit'> Create Account </button>
                </form>
            </div>
            <Footer />
        </>
    );
}