import { UPDATE_USER } from '../type';

const hashAction = {
    [UPDATE_USER]: (state, value) => updateUser(state, value),
};

const defaultState = {
    id: undefined,
    alias: undefined,
    token: undefined,
    win: undefined,
    lose: undefined,
    token: undefined,
    avatar: undefined,
};

const userReducer = (state = defaultState, action) => {
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

const updateUser = (state, value) => {
    return { ...value };
};

export default userReducer;
