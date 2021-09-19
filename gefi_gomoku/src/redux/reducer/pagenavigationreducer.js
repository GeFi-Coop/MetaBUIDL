import { UPDATE_PAGE_NAVIGATION } from '../type';

const hashAction = {
    [UPDATE_PAGE_NAVIGATION]: (state, value) => updatePageNavigation(state, value),
};

const defaultState = 'register';

const pageNavigationReducer = (state = 'register', action) => {
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

const updatePageNavigation = (state, value) => {
    return value;
};

export default pageNavigationReducer;
