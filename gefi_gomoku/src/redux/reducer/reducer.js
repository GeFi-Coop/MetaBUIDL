import { combineReducers } from 'redux';
import ThemeNavigationReducer from './themeselectionreducer';
import ChangeLangReducer from './changelangreducer';
import HomeControlNavigationReducer from './homecontrolnavigationreducer';
import ContentNavigationReducer from './contentnavigationreducer';
import NearWalletReducer from './nearwalletreducer';
import UserReducer from './userreducer';
import PageNavigationReducer from './pagenavigationreducer';
import CaroReducer from './caroreducer';

const reducer = combineReducers({
    theme: ThemeNavigationReducer,
    lang: ChangeLangReducer,
    contentNavigation: ContentNavigationReducer,
    homeControl: HomeControlNavigationReducer,
    near: NearWalletReducer,
    user: UserReducer,
    page: PageNavigationReducer,
    caro: CaroReducer,
});

export default reducer;
