import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHomeControlNavigation, onContentNavigation } from '../../redux/action';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUser: false,
        };
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        const { target } = event;
        if (this.state.showUser && !this.wrapperRef?.current?.contains?.(target)) {
            this.setState({ showUser: false });
        }
    };

    onConnectWalletClicked = () => {
        try {
        } catch {}
    };

    onUserClicked = () => {
        try {
            this.setState({ showUser: !this.state.showUser });
        } catch {}
    };

    onTransactionsClicked = () => {
        try {
            this.props.onContentNavigation?.('trade');
            this.props.onHomeControlNavigation?.('exchange');
        } catch {}
    };

    onMakeProfileClicked = () => {
        try {
            this.setState({ showUser: false });
            this.props.onContentNavigation?.('profile');
        } catch {}
    };

    onLogout = () => {
        try {
        } catch {}
    };

    render() {
        const { classes, theme, lang, user, near } = this.props;
        return (
            <div className={classes.root}>
                {near?.wallet?.isSignedIn?.() ? (
                    <>
                        <div className={classes.tokens}>
                            {user?.token} <span className={classes.textLight}>tokens</span>
                        </div>
                        <div className={classes.btnz} ref={this.wrapperRef}>
                            <button className={classes.btnConnect} onClick={this.onUserClicked}>
                                {user?.id}
                            </button>
                            <div className={classes.user} style={{ height: this.state.showUser ? 124 : 0 }}>
                                <div className={classes.text} style={{ marginTop: 8 }} onClick={this.onTransactionsClicked}>
                                    {lang.walletTransactions}
                                </div>
                                <div className={classes.text} onClick={this.onMakeProfileClicked}>
                                    {lang.makeProfile}
                                </div>
                                <div className={classes.text} style={{ marginBottom: 8 }} onClick={this.onLogout}>
                                    <img src={theme.images.logout} className={classes.icon} alt='' />
                                    <span style={{ marginLeft: 10, color: theme.color.textColor, fontFamily: theme.font.fontMedium }}>{lang.disconnect}</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <button className={classes.btnConnect} onClick={this.onConnectWalletClicked}>
                        {lang.connectWallet}
                    </button>
                )}
            </div>
        );
    }
}

const styles = (theme) => ({
    textLight: {
        fontFamily: theme.font.fontLight,
        marginLeft: 5,
    },
    tokens: {
        padding: '5px 10px',
        margin: '0 8px',
        borderRadius: 15,
        fontSize: 15,
        color: theme.color.textColor,
        border: '1px solid ' + theme.color.borderColor,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 16,
        height: 16,
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        color: theme.color.textColor,
        padding: 8,
        borderRadius: 8,
        fontSize: 15,
        lineHeight: '20px',
        cursor: 'pointer',
        fontFamily: theme.font.fontLight,
        '&:hover': {
            background: theme.color.backgroundColor,
        },
    },
    user: {
        width: 180,
        background: theme.color.backgroundColor,
        borderRadius: 15,
        position: 'absolute',
        top: 50,
        right: 16,
        padding: '0 8px',
        transition: 'height 0.3s',
        overflow: 'hidden',
        zIndex: 10,
        backdropFilter: 'blur(20px)',
    },
    btnz: {
        position: 'relative',
    },
    btnConnect: {
        height: 40,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        margin: '0 16px',
        borderRadius: 15,
        fontSize: 16,
        '&:hover': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
    root: {
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            contentHome: state.homeControl.content,
            user: state.user,
            near: state.near,
        };
    },
    {
        onHomeControlNavigation,
        onContentNavigation,
    },
)(withStyles(styles)(withTheme(Header)));
