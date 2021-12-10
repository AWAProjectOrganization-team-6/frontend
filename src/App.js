import './App.scss';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { APIAddress } from './config.json';
import axios from 'axios';
import Topbar from './components/Topbar';
import CreateAccount from './views/CreateAccount';
import Redirect from './components/Redirect';
import MainPage from './views/MainPage';
import ShoppingCart from './views/ShoppingCart';
import Footer from './components/Footer';

class InitialState {
    constructor() {
        this.loginToken = '';
        this.user = {
            user_id: -1,
            username: '',
            type: undefined,
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
        };
        this.orderRestaurantId = 2;
        this.shoppingCart = [
            {
                id: 1,
                name: 'Pizza',
                count: 3,
                price: 7.5,
            },
            {
                id: 3,
                name: 'Kokis',
                count: 6,
                price: 2.0,
            },
            {
                id: 2,
                name: 'Salatti',
                count: 1,
                price: 4.5,
            },
            {
                id: 7,
                name: 'Jaffa',
                count: 1,
                price: 2.0,
            },
        ];
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = new InitialState();
        this.state.loginToken = localStorage.getItem('token') ?? this.state.loginToken;
        this.state.user.type = localStorage.getItem('userType') ?? this.state.user.type;

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    /**
     * Process login request and save credentials to state
     * and local storage if successful.
     * @param {Promise<import('axios').AxiosResponse<any, any>} loginRequest
     * @memberof App
     */
    onLogin(loginRequest) {
        loginRequest.then(
            (res) => {
                this.setState({ loginToken: res.data.token }, () => {
                    localStorage.setItem('token', this.state.loginToken);
                });

                /** @type {import('axios').AxiosRequestConfig} */
                const conf = { headers: { Authorization: `bearer ${res.data.token}` } };

                axios.get(APIAddress + 'users/@me', conf).then(
                    (res) => {
                        this.setState(
                            {
                                user: res.data,
                            },
                            () => {
                                localStorage.setItem('userType', this.state.user.type);
                            }
                        );
                    },
                    () => {
                        this.setState(new InitialState());
                        localStorage.removeItem('token');
                    }
                );
            },
            (err) => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                } else if (err.request) console.log(err.request);
                else console.log('error', err.message);
            }
        );
    }

    /**
     * Remove user credentials from state and local storage.
     * @memberof App
     */
    onLogout() {
        this.setState(new InitialState());
        localStorage.clear();
    }

    /**
     * Get user info if user was logged in earlier.
     * @memberof App
     */
    componentDidMount() {
        if (this.state.loginToken !== '') {
            /** @type {import('axios').AxiosRequestConfig} */
            const conf = { headers: { Authorization: `bearer ${this.state.loginToken}` } };

            axios.get(APIAddress + 'users/@me', conf).then(
                (res) => {
                    this.setState({
                        user: res.data,
                    });
                },
                (err) => {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                    } else if (err.request) console.log(err.request);
                    else console.log(err);

                    this.setState(new InitialState());
                    localStorage.clear();
                }
            );
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Redirect onChange={this.state.user} replace={true} />
                <Topbar onLogin={this.onLogin} onLogout={this.onLogout} user={this.state.user} cart={this.state.shoppingCart} />
                <Routes>
                    <Route path="/" element={<MainPage user={this.state.user} token={this.state.loginToken} />} />
                    <Route path="/create/account" element={<CreateAccount />} />
                    <Route path="/create/restaurant" element={<div> RESTAURANT CREATION </div>} />
                    <Route path="/account" element={<div> ACCOUNT INFO </div>} />
                    <Route path="/status" element={<div> ORDER STATUS </div>} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/restaurants" element={<div> RESTAURANTS </div>} />
                    <Route path="/restaurants/:id" element={<div> RESTAURANT 12 </div>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
