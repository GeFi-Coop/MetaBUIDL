import { CONTENT_NAVIGATION } from '../type';

const hashAction = {
    [CONTENT_NAVIGATION]: (state, value) => contentNavigation(state, value),
};

const defaultState = {
    content: 'home',
};

const contentNavigationReducer = (state = defaultState, action) => {
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

const contentNavigation = (state, value) => {
    return {
        content: value,
    };
};

export default contentNavigationReducer;
