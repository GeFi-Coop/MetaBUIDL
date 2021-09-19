import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import getConfig from './config';
import * as nearAPI from 'near-api-js';

const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

export async function initContract() {
    const near = await nearAPI.connect({
        deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        },
        ...nearConfig,
    });

    const walletConnection = new nearAPI.WalletConnection(near);

    let currentUser;

    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount,
        };
    }

    const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
        viewMethods: ['getMatch', 'getUsers', 'getUser', 'getHistory', 'getMatchs'],
        changeMethods: ['createMatch', 'joinMatch', 'updateMatch', 'deposit', 'withDraw', 'createUser', 'startMatch', 'finishMatch'],
        sender: walletConnection.getAccountId(),
    });

    return { contract, currentUser, nearConfig, walletConnection };
}

export const logout = () => {
    window.walletConnection.signOut();
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
};
