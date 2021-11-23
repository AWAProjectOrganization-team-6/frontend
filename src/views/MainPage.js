import Topbar from '../components/Topbar';
import { Component } from 'react';
import SpecialOffers from '../components/SpecialOffers';
import RestaurantList from '../components/RestaurantList';
import { APIAddress } from '../config.json';
import axios from 'axios';
import { capitalize } from '../utility/string';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: {},
        };
    }
    componentDidMount() {
        axios.get(APIAddress + 'restaurant').then((res) => {
            var oulu = res.data.map((val) => {
                if (val.address.split(', ')[2].toLowerCase() === 'oulu') {
                    return val;
                }
            });
            var turku = res.data.map((val) => {
                if (val.address.split(', ')[2].toLowerCase() === 'turku') {
                    return val;
                }
            });
            var tampere = res.data.map((val) => {
                if (val.address.split(', ')[2].toLowerCase() === 'tampere') {
                    return val;
                }
            });
            this.setState({
                cities: {
                    oulu,
                    turku,
                    tampere,
                },
            });
        });
    }

    render() {
        console.log(APIAddress);
        return (
            <>
                <Topbar userType="GUEST" />
                <SpecialOffers />
                {Object.entries(this.state.cities).map(
                    ([city, restaurants], index) => {
                        return (
                            <RestaurantList
                                key={index}
                                city={capitalize(city)}
                                restaurants={restaurants}
                            />
                        );
                    }
                )}
            </>
        );
    }
}

export default MainPage;
