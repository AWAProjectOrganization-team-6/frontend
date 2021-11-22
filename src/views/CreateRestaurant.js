import styles from '../styles/CreateRestaurant.module.scss';
import Topbar from '../components/Topbar';
import cx from 'classnames';
import {Component} from 'react';
import OperatingHours from '../components/OperatingHours';
import Category from '../components/FoodCategory';


class CreateRestaurant extends Component{

    constructor(props){
        super(props);
        this.state={
            restaurantData: {
                name: '',
                address:'',
                type: '',
                priceLevel:'',
            },

            Categories: [
                
            ],

            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            times: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00', '07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00',
                '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00', '24.00',]
        };
        
        this.addCategory = this.addCategory.bind(this);
        this.handleOperatingHours = this.handleOperatingHours.bind(this);
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
            case 'addCategory':
                break;
        }

        this.setState({ restaurantData });
        console.log(this.state);
    }

    handleOperatingHours (childData) {
        let operatingHours = childData;
        this.setState({operatingHours});
    }

    
    addCategory () {
        if (this.state.Categories.length < 8) {
            this.setState({Categories: [...this.state.Categories,{id: this.state.Categories.length + 1}]});
        }
        
    }

    render() {
        return (
            <>
                <Topbar userType='ADMIN'/>
                <div className={styles.contentArea}>
                    <div className={styles.inputFields}>
                        <div className={cx(styles.logo, styles.font)}>
                            Account Creation
                        </div>
                        <button className={cx(styles.addpicture, styles.font)}>
                                + Add Picture 
                        </button>
                        <input className={styles.input} onChange={this.onChange} name='name' type='text' placeholder='Name'/>
                        <input className={styles.input} onChange={this.onChange} name='address' type='text' placeholder='Address'/>
                        <OperatingHours days={this.state.days} times={this.state.times} parentCallBack={this.handleOperatingHours}/>
                        <div className={styles.setupMenu}>
                            <Category name={this.state.Categories} parentCallBack={this.handleCategories}/> 
                            <input name='addCategory' onChange={this.onChange}/>                       
                            <button className={styles.button} onClick={this.addCategory}>
                                + Add Category
                            </button>
                        </div>
                        <select className={styles.select} name='pricelevel' onChange={this.onChange} defaultValue='default'>
                            <option value='default' disabled hidden>
                                Select pricelevel
                            </option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                        </select>
                        <select className={styles.select} name='type' onChange={this.onChange} defaultValue='default'>
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

                    </div>
                    <div className={styles.image}>
                        <img/>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateRestaurant;