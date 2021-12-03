import styles from '../styles/CreateRestaurant.module.scss';
import Topbar from '../components/Topbar';
import cx from 'classnames';
import { Component } from 'react';
import OperatingHours from '../components/OperatingHours';
import Category from '../components/FoodCategory';
import axios from 'axios';
import FileUploader from '../components/FileUploader';
import { apiAddress } from '../config.json';

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
                priceLevel: 0,
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
                restaurantData.priceLevel = parseInt(event.target.value, 10);
                break;
            case 'type':
                restaurantData.type = event.target.value;
                break;
            case 'addCategory':
                this.setState({ categoryName: event.target.value });
                break;
            case 'picture':
                restaurantData.picture = URL.createObjectURL(event.target.files[0]);
                restaurantData.pictureFile = event.target.files[0];
                break;
        }

        this.setState({ restaurantData });
    }

    addOperatingHour() {
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.operatingHours.push({ id: ++this.operatingHourIndex });
        this.setState({ restaurantData });
    }

    setOperatingHours(id, _case, value) {
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

    addFoodToCategory(category, foodName, price, desc, picFile) {
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.categories.find((value) => value.id === category.id).foods.push({ name: foodName, price, id: ++this.foodIndex, description: desc, pictureFile: picFile});
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

    submit(e) {
        e.preventDefault();
        let _state = { ...this.state };
        let operatingHours = [];
        let products = [];
        let productImageFiles = [];
        let restaurantData = { ...this.state.restaurantData };
        restaurantData.picture = '';
        delete restaurantData.categories;
        delete restaurantData.operatingHours;
        delete restaurantData.pictureFile;
        console.log(restaurantData);

        productImageFiles = _state.restaurantData.categories.map((category) => category.foods.map((food) => {
            return food.pictureFile;         
        }));

        productImageFiles = productImageFiles.flat();
        console.log(productImageFiles);

        products = _state.restaurantData.categories.map((category) => category.foods.map((food) => {
            let item = food;
            delete item.id;
            item.type = category.name;
            item.picture = food.pictureFile.name;
            delete item.pictureFile;
            return item;
        }));

        products = products.flat();

        for (let index = 0; index < _state.restaurantData.operatingHours.length; index++) {
            let startIndex = this.state.days.findIndex((val) => val === _state.restaurantData.operatingHours[index].fromDay);
            let endIndex = this.state.days.findIndex((val) => val === _state.restaurantData.operatingHours[index].toDay);
            if (startIndex > endIndex) [startIndex, endIndex] = [endIndex, startIndex];
            let result = _state.shortDays.slice(startIndex, endIndex + 1);
            result.join(',');
            let temp = { opening_time: '', closing_time: '', kitchen_closing_time: '', days: '' };
            temp.opening_time = _state.restaurantData.operatingHours[index].fromHour;
            temp.closing_time = _state.restaurantData.operatingHours[index].toHour;
            temp.days = result;
            operatingHours.push(temp);
        }

        let authorization = {'Authorization': 'bearer ' + this.props.token};
        
        console.log(products);

        axios.post(apiAddress + 'restaurant', restaurantData, {headers: authorization})
            .then((res) => {

                let picture = new FormData();
                picture.append('restaurant', res.data.restaurant_id);
                picture.append('image', _state.restaurantData.pictureFile);
                operatingHours.forEach(val => val.restaurant_id = res.data.restaurant_id);
                products.forEach(val => val.restaurant_id = res.data.restaurant_id);

                let productImages = new FormData();
                productImages.append('restaurant', res.data.restaurant_id);
                for (let i = 0; i < productImageFiles.length; i++) {
                    productImages.append('productImages', productImageFiles[i]);                    
                }

                axios.post(apiAddress + 'restaurant/operating-hours', operatingHours, {headers: authorization})
                    .then((res) => {

                    });

                axios.post(apiAddress + 'products', products, {headers: authorization})
                    .then((res) => {

                    });

                axios.post(apiAddress + 'products/upload', productImages, {headers: {'content-type': 'multipart/form-data', ...authorization}})
                    .then((res) => {

                    });

                axios.post(apiAddress + 'restaurant/upload', picture, {headers: {'content-type': 'multipart/form-data', ...authorization}})
                    .then((res) => {

                    });
            });


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
                        <FileUploader selected={this.onChange} style={styles.fileInput}/>
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
                            <div className={styles.text}>
                                Setup Menu
                            </div>
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
                            <option value={1}>€</option>
                            <option value={2}>€€</option>
                            <option value={3}>€€€</option>
                            <option value={4}>€€€€</option>
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
                    <img src={this.state.restaurantData.picture} className={styles.image} />
                </div>
            </>
        );
    }
}

export default CreateRestaurant;