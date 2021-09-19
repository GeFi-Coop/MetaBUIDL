import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHideContentNavigation, onUpdatePageNavigation, onUpdateUser } from '../../redux/action';
import Navigation from '../navigation/navigation';
import Header from '../navigation/header';
import Home from './home/home';
import Trade from './trade/trade';
import Game from './game/game';
import Profile from './profile/profile';
import Register from './register/register';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUser: true,
        };
    }

    componentDidMount() {
        const { wallet, contract } = this.props.near;
        contract
            ?.getUser?.({
                id: wallet?.getAccountId?.(),
            })
            .then((ret) => {
                if (ret !== null) {
                    this.props.onUpdateUser({ ...ret });
                    this.props.onUpdatePageNavigation('content');
                    this.setState({
                        loadingUser: false,
                    });
                } else {
                    this.props.onUpdatePageNavigation('register');
                    this.setState({
                        loadingUser: false,
                    });
                }
            })
            .catch((err) => {
                this.props.onUpdatePageNavigation('register');
                this.setState({
                    loadingUser: false,
                });
            });
    }

    onCollapseMenu = () => {
        try {
            const { hideNavigation } = this.props;
            this.props.onHideContentNavigation?.(!hideNavigation);
        } catch {}
    };

    renderContent = () => {
        try {
            const { content } = this.props;
            switch (content) {
                case 'home':
                    return <Home />;
                case 'trade':
                    return <Trade />;
                case 'chess':
                    return <Game />;
                case 'profile':
                    return <Profile />;

                default:
                    break;
            }
        } catch {}
    };

    renderContainer = () => {
        try {
            const { page, classes, theme, hideNavigation } = this.props;
            switch (page) {
                case 'content':
                    return (
                        <div className={classes.root}>
                            <Navigation />
                            <div className={classes.content} style={{ marginLeft: hideNavigation ? 70 : 200 }}>
                                <div
                                    className={classes.menu}
                                    style={{
                                        transform: hideNavigation ? 'rotateZ(-180deg)' : 'rotateZ(0deg)',
                                    }}
                                    onClick={this.onCollapseMenu}>
                                    <img src={theme.images.menu} className={classes.iconMenu} alt='' />
                                </div>
                                <Header />
                                {this.renderContent?.()}
                            </div>
                        </div>
                    );
                default:
                    return <Register />;
            }
        } catch {}
    };

    render() {
        const { classes, hideNavigation, theme } = this.props;
        return <>{!this.state.loadingUser && this.renderContainer()}</>;
    }
}

const styles = (theme) => ({
    iconMenu: {
        width: 16,
        height: 16,
    },
    menu: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 20,
        left: 0,
        cursor: 'pointer',
        transition: 'transform 0.5s',
        color: theme.color.textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        height: 'inherit',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        transition: 'margin-left 0.5s',
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            hideNavigation: state.homeControl.hideNavigation,
            content: state.contentNavigation.content,
            near: state.near,
            page: state.page,
        };
    },
    {
        onHideContentNavigation,
        onUpdatePageNavigation,
        onUpdateUser,
    },
)(withStyles(styles)(withTheme(Main)));
