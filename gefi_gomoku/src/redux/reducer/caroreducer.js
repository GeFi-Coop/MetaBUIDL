import { CARO_UPDATE_CONTENT, CARO_UPDATE_MATCH, CARO_UPDATE_CURRENT_MATCH } from '../type';

const hashAction = {
    [CARO_UPDATE_CONTENT]: (state, value) => caroNavigation(state, value),
    [CARO_UPDATE_MATCH]: (state, value) => updateMatch(state, value),
    [CARO_UPDATE_CURRENT_MATCH]: (state, value) => updateCurrentMatch(state, value),
};

const defaultState = {
    content: 'listMatch',
    match: {},
    cMatch: {
        owner: 'mtoan2111.testnet',
        competitor: null,
        created: '1630684203770464730',
        state: 0,
        id: 'qCsqqzSCyFzHgKCED2yfi7NDBDA4pAP8CeU8cnui6a86p5YJB',
        bet: '0',
        mode: 0,
    },
};

const caroReducer = (state = defaultState, action) => {
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

const caroNavigation = (state, value) => {
    return { state, content: value };
};

const updateCurrentMatch = (state, value) => {
    return { state, cMatch: { ...value } };
};

export default caroReducer;
