import styles from '../styles/CreateRestaurant.module.scss';
import Topbar from '../components/Topbar';
import cx from 'classnames';
import {Component} from 'react';
import OperatingHours from '../components/OperatingHours';
import Category from '../components/FoodCategory';


class CreateRestaurant extends Component{

    categoryIndex = 0;
    foodIndex = 0;

    constructor(props){
        super(props);
        this.state={
            restaurantData: {
                name: '',
                address:'',
                type: '',
                priceLevel:'',
                openingHours: [

                ],

                closingHours: [

                ],

                categories: [
                
                ]
            },
            
            categoryName: '',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            times: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00', '07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00',
                '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00',]
        };
        
        this.addCategory = this.addCategory.bind(this);
        this.handleOperatingHours = this.handleOperatingHours.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addFoodToCategory = this.addFoodToCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.deleteFoodFromCategory = this.deleteFoodFromCategory.bind(this);
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
                this.setState({ categoryName: event.target.value});
                break;
        }

        this.setState({ restaurantData });
        console.log(this.state);
    }

    handleOperatingHours (hour, day, kase) {
        let restaurantData = {...this.state.restaurantData};
        if (kase == 'opening') {
            restaurantData.openingHours.push({day, opening: hour});
        } else {
            restaurantData.closingHours.push({day, closing: hour});
        }

        this.setState({ restaurantData });
    }

    
    addCategory () {
        let restaurantData = {...this.state.restaurantData};
        restaurantData.categories.push({id: ++this.categoryIndex, name: this.state.categoryName, foods: []});
        this.setState({ restaurantData });

    }

    addFoodToCategory (category, foodName, price) {
        console.log(category);
        let restaurantData = {...this.state.restaurantData};
        restaurantData.categories.find((value) => value.id === category.id).foods.push({name: foodName, price, id: ++this.foodIndex});
        this.setState({ restaurantData });
    }

    deleteCategory (id) {
        let restaurantData = {...this.state.restaurantData};
        let index = restaurantData.categories.findIndex((value) => value.id === id);
        restaurantData.categories.splice(index, 1);
        this.setState({ restaurantData });
    }

    deleteFoodFromCategory (cId, fId) {
        let restaurantData = {...this.state.restaurantData};
        let index = restaurantData.categories.find((value) => value.id === cId).foods.findIndex((value) => value.id === fId);
        restaurantData.categories.find((value) => value.id === cId).foods.splice(index, 1);
        this.setState({ restaurantData });
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
                        <input type = 'file' className={cx(styles.addpicture, styles.font)} placeholder='+ Add picture'> 
                        </input>
                        <input className={styles.input} onChange={this.onChange} name='name' type='text' placeholder='Name'/>
                        <input className={styles.input} onChange={this.onChange} name='address' type='text' placeholder='Address'/>
                        <OperatingHours days={this.state.days} times={this.state.times} parentCallBack={this.handleOperatingHours}/>
                        <div className={styles.setupMenu}>
                            {this.state.restaurantData.categories.map((category) => <Category key={category.id} category={category} addFood={this.addFoodToCategory} deleteCategory={this.deleteCategory} deleteFood={this.deleteFoodFromCategory}/>)}
                            <input className={styles.input} name='addCategory' onChange={this.onChange} placeholder={'Category name'}/>                    
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
