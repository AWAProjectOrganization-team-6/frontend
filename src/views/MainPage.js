import Topbar from '../components/Topbar';
import { Component } from 'react';
import SpecialOffers from '../components/SpecialOffers';
import RestaurantList from '../components/RestaurantList';


class MainPage extends Component {
    render() {

        return (
            <>
                <Topbar userType='GUEST'/>
                <SpecialOffers/>
                <RestaurantList/>
            </>
            
        );
    }

}

export default MainPage;

