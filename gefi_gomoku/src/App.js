import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './redux/store';
import { ThemeProvider } from 'react-jss';
import DefaultTheme from './theme/default/theme';
import Main from './component/content/main';
import { login, logout } from './utils';
import './global.css';
import getConfig from './config';
import { onUpdateNearWallet } from './redux/action';

const { networkId } = getConfig(process.env.NODE_ENV || 'development');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onLoginBtnClicked = () => {
        const { nearConfig, wallet } = this.props;
        wallet.requestSignIn(nearConfig.contractName);
    };

    renderSignIn = () => {
        return (
            <main>
                <h1>Welcome to NEAR!</h1>
                <p>To make use of the NEAR blockchain, you need to sign in. The button below will sign you in using NEAR Wallet.</p>
                <p>
                    By default, when your app runs in "development" mode, it connects to a test network ("testnet") wallet. This works just like the main
                    network ("mainnet") wallet, but the NEAR Tokens on testnet aren't convertible to other currencies – they're just for testing!
                </p>
                <p>Go ahead and click the button below to try it out:</p>
                <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
                    <button onClick={this.onLoginBtnClicked}>Sign in</button>
                </p>
            </main>
        );
    };

    renderContainer = () => {
        const { contract, currentUser, nearConfig, wallet } = this.props;
        Store.dispatch(onUpdateNearWallet({ contract, currentUser, nearConfig, wallet }));
        return (
            <ThemeProvider theme={DefaultTheme}>
                <Provider store={Store}>
                    <Main />
                </Provider>
            </ThemeProvider>
        );
    };

    siginChecker = () => {
        const { contract, currentUser, nearConfig, wallet } = this.props;
        if (wallet.isSignedIn()) {
            return this.renderContainer();
        } else {
            return this.renderSignIn();
        }
    };

    render() {
        return <div>{this.siginChecker()}</div>;
    }
}
