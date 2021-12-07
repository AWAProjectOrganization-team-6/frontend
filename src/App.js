import './App.scss';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { APIAddress } from './config.json';
import axios from 'axios';
import Topbar from './components/Topbar';
import CreateAccount from './views/CreateAccount';
import Footer from './components/Footer';
import Redirect from './components/Redirect';

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
                                success: true,
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
                <Redirect user={this.state.user} />
                <Topbar onLogin={this.onLogin} onLogout={this.onLogout} user={this.state.user} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                MAIN PAGE
                                <Footer styles={{ position: 'fixed', bottom: 0 }} />
                            </div>
                        }
                    />
                    <Route path="/create/account" element={<CreateAccount />} />
                    <Route path="/create/restaurant" element={<div> RESTAURANT CREATION </div>} />
                    <Route path="/account" element={<div> ACCOUNT INFO </div>} />
                    <Route path="/status" element={<div> ORDER STATUS </div>} />
                    <Route path="/cart" element={<div> SHOPPING CART </div>} />
                    <Route path="/restaurants" element={<div> RESTAURANTS </div>} />
                    <Route path="/restaurants/:id" element={<div> RESTAURANT 12 </div>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
