import { THEME_SELECTION } from '../type';

const hashAction = {
    [THEME_SELECTION]: (state, value) => themeSelection(state, value),
};

const themeSelectionReducer = (state = 'default', action) => {
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

const themeSelection = (state, value) => {
    return value;
};

export default themeSelectionReducer;
