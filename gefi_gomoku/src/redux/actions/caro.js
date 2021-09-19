import { CARO_UPDATE_CONTENT, CARO_UPDATE_MATCH, CARO_UPDATE_CURRENT_MATCH } from '../type';

export const onCaroUpdateContent = (data) => {
    return {
        type: CARO_UPDATE_CONTENT,
        value: data,
    };
};

export const onCaroUpdateMatch = (data) => {
    return {
        type: CARO_UPDATE_MATCH,
        value: data,
    };
};

export const onCaroUpdateCurrentMatch = (data) => {
    return {
        type: CARO_UPDATE_CURRENT_MATCH,
        value: data,
    };
};
