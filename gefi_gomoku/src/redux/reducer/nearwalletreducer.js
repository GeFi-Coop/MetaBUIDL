import { UPDATE_NEAR_WALLET } from '../type';

const hashAction = {
    [UPDATE_NEAR_WALLET]: (state, value) => nearWallet(state, value),
};

const defaultState = {
    contract: undefined,
    currentUser: undefined,
    nearConfig: undefined,
    wallet: undefined,
};

const nearWalletReducer = (state = defaultState, action) => {
    try {
        const handler = hashAction?.[action?.type];
        if (typeof handler === 'undefined') {
            return state;
        }
        return handler?.(state, action.value);
    } catch (err) {
        return state;
    }
};

const nearWallet = (state, value) => {
    return { ...value };
};

export default nearWalletReducer;
