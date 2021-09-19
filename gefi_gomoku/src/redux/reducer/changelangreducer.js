import { CHANGE_LANG } from '../type';
import vi from '../../lang/vi.json';
import en from '../../lang/en.json';

const hashAction = {
    [CHANGE_LANG]: (value) => changeLang(value),
};

const changeLangReducer = (state = en, action) => {
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

const changeLang = (value) => {
    switch (value) {
        case 'vi':
            return vi;
        default:
            return en;
    }
};

export default changeLangReducer;
