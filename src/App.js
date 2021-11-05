import Topbar from './components/Topbar';
import './App.scss';
import { Component } from 'react';


class App extends Component {
    render() {

        return (
            <>
                <Topbar userType='GUEST'/>
            </>
        );
    }

}

export default App;
