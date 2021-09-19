import {
    THEME_SELECTION,
    CHANGE_LANG,
    CONTENT_NAVIGATION,
    HOME_CONTROL_NAVIGATION,
    HIDE_CONTENT_NATIGATION,
    UPDATE_NEAR_WALLET,
    UPDATE_USER,
    UPDATE_PAGE_NAVIGATION,
    CONTENT_MODAL,
    CONTENT_CHILD_NAVIGATION,
} from './type';

export const onThemeSelection = (theme) => {
    try {
        return {
            type: THEME_SELECTION,
            value: theme,
        };
    } catch {}
};

export const onChangeLang = (lang) => {
    return {
        type: CHANGE_LANG,
        value: lang,
    };
};

export const onContentNavigation = (data) => {
    return {
        type: CONTENT_NAVIGATION,
        value: data,
    };
};

export const onHomeControlNavigation = (data) => {
    return {
        type: HOME_CONTROL_NAVIGATION,
        value: data,
    };
};

export const onContentChildNavigation = (data) => {
    return {
        type: CONTENT_CHILD_NAVIGATION,
        value: data,
    };
};

export const onUpdateModal = (data) => {
    return {
        type: CONTENT_MODAL,
        value: data,
    };
};

export const onHideContentNavigation = (data) => {
    return {
        type: HIDE_CONTENT_NATIGATION,
        value: data,
    };
};

export const onUpdateNearWallet = (data) => {
    return {
        type: UPDATE_NEAR_WALLET,
        value: data,
    };
};

export const onUpdateUser = (data) => {
    return {
        type: UPDATE_USER,
        value: data,
    };
};

export const onUpdatePageNavigation = (data) => {
    return {
        type: UPDATE_PAGE_NAVIGATION,
        value: data,
    };
};
