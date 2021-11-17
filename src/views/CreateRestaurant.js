import styles from '../styles/CreateRestaurant.module.scss';
import Topbar from '../components/Topbar';
import cx from 'classnames';
import {Component} from 'react';

class CreateRestaurant extends Component{

    constructor(props){
        super(props);
        this.state={
            restaurantData: {
                name: '',
                address:'',
                type: '',
                priceLevel:''
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let restaurantData = {...this.state.restaurantData};

        switch (event.target.name) {
            case 'name':
                restaurantData.name = event.target.value;
                break;
            case 'address':
                restaurantData.address = event.target.value;
                break;
            case 'pricelevel':
                restaurantData.priceLevel = event.target.value;
                break;
            case 'type':
                restaurantData.type = event.target.value;
                break;
        }

        this.setState({ restaurantData });
        console.log(this.state);
    }


    render() {
        return (
            <>
                <Topbar userType='ADMIN'/>
                <div className={styles.contentArea}>
                    <form className={styles.inputFields}>
                        <div className={cx(styles.logo, styles.font)}>
                            Account Creation
                        </div>
                        <button className={cx(styles.addpicture, styles.font)}>
                                + Add Picture 
                        </button>
                        <input onChange={this.onChange} name='name' type='text' placeholder='Name'/>
                        <input onChange={this.onChange} name='address' type='text' placeholder='Address'/>
                        <div className={styles.operatingHours}>
                            <div className={styles.text}>
                                Operating Hours
                            </div>
                            <select name='days'>
                                <option> Days</option>
                            </select>
                            <select name='openingTime'>
                                <option> Hours</option>
                            </select>
                            <select name='closingTime'>
                                <option> Hours</option>
                            </select>
                        </div>
                        <div className={styles.setupMenu}>
                            <div className={styles.text}>
                                Set up Menu
                            </div>
                            <button className={styles.font} >
                                + Add Category
                            </button>
                        </div>
                        <select name='pricelevel' onChange={this.onChange} defaultValue='default'>
                            <option value='default' disabled hidden>
                                Select pricelevel
                            </option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                        </select>
                        <select name='type' onChange={this.onChange} defaultValue='default'>
                            <option value='default' disabled hidden>
                                Select restaurant type
                            </option>
                            <option value='Buffet'>Buffet</option>
                            <option value='Fast Food'>Fast Food</option>
                            <option value='Fast Casual'>Fast Casual</option>
                            <option value='Casual dining'>Casual dining</option>
                            <option value='Fine dining'>Fine dining</option>
                        </select>
                        <button className={cx(styles.create, styles.font)}>
                                Create
                        </button>

                    </form>
                    <div className={styles.image}>
                        <img/>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateRestaurant;