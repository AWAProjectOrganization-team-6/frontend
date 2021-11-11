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
                <RestaurantList city="Turku"/>
                <RestaurantList city="Oulu"/>
                <RestaurantList city="Tampere"/>
            </>
            
        );
    }

}

export default MainPage;

