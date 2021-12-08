import { Component } from 'react';
import SpecialOffers from '../components/SpecialOffers';
import RestaurantList from '../components/RestaurantList';
import { APIAddress } from '../config.json';
import axios from 'axios';
import { capitalize } from '../utility/string';
import Footer from '../components/Footer';
import UsercityList from '../components/UsercityList';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: {},
            specialOffers: [],
            userCity: '',
        };

        this.MainPageContent = () =>
            Object.entries(this.state.cities).map(([city, restaurants], index) => {
                return <RestaurantList key={index} city={capitalize(city)} restaurants={restaurants} />;
            });

        if (this.props.user?.type === 'USER') {
            this.MainPageContent = () => <UsercityList userCity={this.state.cities[this.state.userCity]} city={capitalize(this.state.userCity)} />;
        }
    }
    componentDidMount() {
        axios.get(APIAddress + 'restaurant').then((res) => {
            var oulu = res.data.filter((val) => val.address.split(', ')[2]?.toLowerCase() === 'oulu');
            var turku = res.data.filter((val) => val.address.split(', ')[2]?.toLowerCase() === 'turku');
            var tampere = res.data.filter((val) => val.address.split(', ')[2]?.toLowerCase() === 'tampere');
            let cities = {
                oulu,
                turku,
                tampere,
            };
            this.setState({
                cities,
                restaurants: res.data,
            });

            axios
                .get(APIAddress + 'users/@me/address', {
                    headers: { authorization: 'bearer ' + this.props.token },
                })
                .then((res) => {
                    let userCity = '';
                    for (let key in cities) {
                        if (key === res.data[0].city.toLowerCase()) {
                            userCity = key;
                            break;
                        }
                    }
                    this.setState({
                        userCity,
                    });
                });
        });

        axios.get(APIAddress + 'products/special-offers').then((res) => {
            var requests = [];
            requests.push(axios.get(APIAddress + 'products'));
            if (!this.state.restaurants) requests.push(axios.get(APIAddress + 'restaurant'));
            Promise.all(requests).then((resArray) => {
                if (resArray.length === 2) {
                    this.setState({
                        specialOffers: res.data,
                        products: resArray[0].data,
                        restaurants: resArray[1].data,
                    });
                } else {
                    this.setState({
                        specialOffers: res.data,
                        products: resArray[0].data,
                    });
                }
            });
        });
    }

    render() {
        console.log(APIAddress);
        return (
            <>
                <SpecialOffers products={this.state.products} restaurants={this.state.restaurants} specialOffers={this.state.specialOffers} />

                <this.MainPageContent />

                <Footer />
            </>
        );
    }
}

export default MainPage;
