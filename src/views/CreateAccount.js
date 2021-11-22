import styles from '../styles/CreateAccount.module.scss';
import cx from 'classnames';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import React from 'react';


export default function CreateAccount() {

    const accountInfo = [
        {
            firstName: '',
            lastName: '',
            streetAddress: '',
            phoneNumber: '',
            emailAddress: '',
            password: '',
            type: ''
        }   
    ];

    const [list, setList] = React.useState(accountInfo);

    const handleInputs = (event) => {

        const newList = list;

        switch (event.target.name) {
            case 'fName':
                newList.firstName = event.target.value;
                break;
        
            case 'lName':
                newList.lastName = event.target.value;
                break;
            
            case 'sAdrs':
                newList.streetAddress = event.target.value;
                break;

            case 'pNumb':
                newList.phoneNumber = event.target.value;
                break;

            case 'eAdrs':
                newList.emailAddress = event.target.value;
                break;
            
            case 'password':
                newList.password = event.target.value;
                break;

            case 'repeatPassword':
                break;
            
            case 'accountType':
                newList.type = event.target.value;
                break;
        }
        setList(newList);
    };



    const handleCreation = () => {
        console.log(accountInfo);
    };




    const accountType = (
        <div className = { styles.userType }>
            <label className = { styles.font }> Manager </label>
            <input type='radio' name='accountType' onChange={handleInputs} value='ADMIN'>
            </input>
            <label className = { styles.font }> Customer </label>
            <input type='radio' name='accountType' onChange={handleInputs} value='USER'>
            </input>
        </div>
    );


    return (
        <>
            <Topbar/>
            <div className = { styles.createAccount }>
                <div className={cx(styles.logo, styles.font)}>
                    Account Creation
                </div>
                <div className = { styles.textFields}>
                    <input type="text" name='fName' placeholder="First name" onChange={handleInputs}/>
                    <input type="text" name='lName' placeholder="Last name" onChange={handleInputs}/>
                    <input type="text" name='sAdrs' placeholder="Street address" onChange={handleInputs}/>
                    <input type="text" name='pNumb' placeholder="Phone number" onChange={handleInputs}/>
                    <input type="text" name='eAdrs' placeholder="Email address" onChange={handleInputs}/>
                    <input type="text" name='password' placeholder="Password" onChange={handleInputs}/>
                    <input type="text" name='repeatPassword' placeholder="Repeat password" onChange={handleInputs}/>
                </div>

                {accountType}

                <button className = {cx(styles.button, styles.font)} onClick={handleCreation}> Create Account </button>
            </div>
            <Footer/>
        </>
    );
}