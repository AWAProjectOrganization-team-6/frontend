import styles from '../styles/CreateRestaurant.module.scss';
import Topbar from '../components/Topbar';
import cx from 'classnames';
import { Component } from 'react';
import OperatingHours from '../components/OperatingHours';
import Category from '../components/FoodCategory';
import axios from 'axios';

class CreateRestaurant extends Component {

    categoryIndex = 0;
    foodIndex = 0;
    operatingHourIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            restaurantData: {
                name: '',
                address: '',
                type: '',
                priceLevel: '',
                picture: {

                },

                operatingHours: [


                ],

                categories: [

                ]
            },

            categoryName: '',
            shortDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        };

        this.addCategory = this.addCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addFoodToCategory = this.addFoodToCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.deleteFoodFromCategory = this.deleteFoodFromCategory.bind(this);
        this.addOperatingHour = this.addOperatingHour.bind(this);
        this.deleteOperatingHour = this.deleteOperatingHour.bind(this);
        this.setOperatingHours = this.setOperatingHours.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(event) {
        let restaurantData = { ...this.state.restaurantData };

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
                this.setState({ categoryName: event.target.value });
                break;
            case 'picture':
                restaurantData.picture = event.target.value;
                break;
        }

        this.setState({ restaurantData });
        console.log(this.state);
    }

    addOperatingHour() {
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.operatingHours.push({ id: ++this.operatingHourIndex });
        this.setState({ restaurantData });
    }

    setOperatingHours(id, _case, value, target) {
        let restaurantData = { ...this.state.restaurantData };
        let index = restaurantData.operatingHours.findIndex((value) => value.id === id);

        switch (_case) {
            case 'fromDay':
                restaurantData.operatingHours[index].fromDay = value;
                break;

            case 'toDay':
                restaurantData.operatingHours[index].toDay = value;
                break;

            case 'fromHour': {
                let values = value.split(':');
                let time = new Date();
                time.setHours(Number(values[0]), Number(values[1]), 0, 0);
                restaurantData.operatingHours[index].fromHour = time;
                break;
            }

            case 'toHour': {
                let values = value.split(':');
                let time = new Date();
                time.setHours(Number(values[0]), Number(values[1]), 0, 0);
                restaurantData.operatingHours[index].toHour = time;
                break;
            }
        }


        this.setState({ restaurantData });
    }

    deleteOperatingHour(id) {
        let restaurantData = { ...this.state.restaurantData };
        let index = restaurantData.operatingHours.findIndex((value) => value.id === id);
        restaurantData.operatingHours.splice(index, 1);
        this.setState({ restaurantData });
    }


    addCategory() {
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.categories.push({ id: ++this.categoryIndex, name: this.state.categoryName, foods: [] });
        this.setState({ restaurantData });

    }

    addFoodToCategory(category, foodName, price) {
        console.log(category);
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.categories.find((value) => value.id === category.id).foods.push({ name: foodName, price, id: ++this.foodIndex });
        this.setState({ restaurantData });
    }

    deleteCategory(id) {
        let restaurantData = { ...this.state.restaurantData };
        let index = restaurantData.categories.findIndex((value) => value.id === id);
        restaurantData.categories.splice(index, 1);
        this.setState({ restaurantData });
    }

    deleteFoodFromCategory(cId, fId) {
        let restaurantData = { ...this.state.restaurantData };
        let index = restaurantData.categories.find((value) => value.id === cId).foods.findIndex((value) => value.id === fId);
        restaurantData.categories.find((value) => value.id === cId).foods.splice(index, 1);
        this.setState({ restaurantData });
    }

    submit (e) {
        e.preventDefault();
        let _state = {...this.state};
        let startIndex = this.state.days.findIndex((val) => val === _state.restaurantData.operatingHours.fromDay);
        let endIndex = this.state.days.findIndex((val) => val === _state.restaurantData.operatingHours.toDay);
        if (startIndex > endIndex) [startIndex, endIndex] = [endIndex, startIndex];
        let result = _state.days.slice(startIndex, endIndex);
        result.join(',');
        console.log(_state.restaurantData);
    }

    render() {
        return (
            <>
                <Topbar userType='ADMIN' />
                <div className={styles.contentArea}>
                    <div className={styles.inputFields}>
                        <div className={cx(styles.logo, styles.font)}>
                            Account Creation
                        </div>
                        <input name='picture' type='file' className={cx(styles.addpicture, styles.font)} onChange={this.onChange}placeholder='+ Add picture'>
                        </input>
                        <input className={styles.input} onChange={this.onChange} name='name' type='text' placeholder='Name' />
                        <input className={styles.input} onChange={this.onChange} name='address' type='text' placeholder='Address' />
                        <div className={styles.operatingHours}>
                            <div className={styles.text}>
                                Operating Hours
                            </div>
                            {this.state.restaurantData.operatingHours.map((operatingHour) => <OperatingHours key={operatingHour.id} operatingHour={operatingHour} delete={this.deleteOperatingHour} days={this.state.days} set={this.setOperatingHours} />)}
                            <button onClick={this.addOperatingHour} className={styles.button}> + Add operatingHour</button>
                        </div>
                        <div className={styles.setupMenu}>
                            {this.state.restaurantData.categories.map((category) => <Category key={category.id} category={category} addFood={this.addFoodToCategory} deleteCategory={this.deleteCategory} deleteFood={this.deleteFoodFromCategory} />)}
                            <input className={styles.input} name='addCategory' onChange={this.onChange} placeholder={'Category name'} />
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
                        <button onClick={this.submit} className={cx(styles.create, styles.font)}>
                            Create
                        </button>

                    </div>
                    <div className={styles.image}>
                        <img src={this.state.restaurantData.picture}/>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateRestaurant;
