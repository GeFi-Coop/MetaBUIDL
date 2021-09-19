import { HOME_CONTROL_NAVIGATION, CONTENT_MODAL, CONTENT_CHILD_NAVIGATION, HIDE_CONTENT_NATIGATION } from '../type';

const hashAction = {
    [HOME_CONTROL_NAVIGATION]: (state, value) => homeControlNavigation(state, value),
    [CONTENT_MODAL]: (state, value) => changemodal(state, value),
    [CONTENT_CHILD_NAVIGATION]: (state, value) => contentChildNavigation(state, value),
    [HIDE_CONTENT_NATIGATION]: (state, value) => hideContentNavigation(state, value),
};

const defaultState = {
    content: null,
    modal: '',
    contentChild: null,
};

const homeControlNavigationReducer = (state = defaultState, action) => {
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

const homeControlNavigation = (state, value) => {
    return {
        ...state,
        content: value,
    };
};

const changemodal = (state, value) => {
    return {
        ...state,
        modal: value,
    };
};

const contentChildNavigation = (state, value) => {
    return {
        ...state,
        contentChild: value,
    };
};

const hideContentNavigation = (state, value) => {
    return {
        ...state,
        hideNavigation: value,
    };
};

export default homeControlNavigationReducer;
