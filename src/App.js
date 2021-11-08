import Topbar from './components/Topbar';
import './App.scss';
import { Component } from 'react';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };

        this.onMenuClicked = this.onMenuClicked.bind(this);
    }

    closeMenuListenner = (event) => {
        if (!event.target.closest('[data-menu]')) {
            this.onMenuClicked();
        }
    }

    onMenuClicked() {
        if (!this.state.menuOpen) {
            this.setState({ menuOpen: !this.state.menuOpen });
            document.addEventListener('click', this.closeMenuListenner);
        } else {
            document.removeEventListener('click', this.closeMenuListenner);
            this.setState({ menuOpen: !this.state.menuOpen });
        }
    }

    render() {
        return (
            <>
                <Topbar onClick={this.onMenuClicked} userType='ADMIN' />
            </>
        );
    }
    
}

export default App;

