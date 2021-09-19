import React from 'react';
import { connect } from 'react-redux';
import withStyles, { withTheme } from 'react-jss';
import { onUpdateUser, onUpdatePageNavigation } from '../../../redux/action';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            bio: '',
        };
    }

    componentDidMount() {}

    onAliasChange = (e) => {
        this.setState({
            alias: e.target.value,
        });
    };

    onBioChange = (e) => {
        this.setState({
            bio: e.target.value,
        });
    };

    onRegisterBtnClicked = () => {
        const { wallet, contract } = this.props.near;
        const { alias, bio, avatar } = this.state;
        contract
            .createUser({
                alias,
                bio,
                avatar: '',
            })
            .then((result) => {
                this.props.onUpdateUser?.(result);
                this.props.onUpdatePageNavigation?.('content');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { classes, theme, lang, near } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.form}>
                    <div className={classes.layoutLogo}>
                        <img src={theme.images.logo} className={classes.logo} alt='' />
                    </div>
                    <div>{near?.wallet?.getAccountId()}</div>
                    <input className={classes.input} placeholder={'Nick name'} value={this.state.alias} onChange={this.onAliasChange} />
                    <input className={classes.input} placeholder={'Bio'} value={this.state.bio} onChange={this.onBioChange} />
                    <button className={classes.button} onClick={this.onRegisterBtnClicked}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}

const styles = (theme) => ({
    logo: {
        width: 60,
        height: 60,
    },
    layoutLogo: {
        width: '100%',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 140,
        height: 50,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        fontSize: 16,
        margin: '20px 0',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        margin: 10,
        color: theme.color.textColor,
        background: theme.color.backgroundColor,
    },
    form: {
        width: 400,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.color.backgroundColor,
        borderRadius: 50,
        backdropFilter: 'blur(5px)',
        padding: '20px 30px',
    },
    root: {
        width: '100%',
        height: '100vh',
        paddingBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(
    (state) => {
        return {
            near: state.near,
        };
    },
    {
        onUpdateUser,
        onUpdatePageNavigation,
    },
)(withStyles(styles)(withTheme(Register)));
