import React from 'react';
import { connect } from 'react-redux';
import withStyles, { withTheme } from 'react-jss';
import { onUpdateUser, onUpdatePageNavigation } from '../../../redux/action';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            bio: '',
            avatar: '',
            imgSelected: '',
        };
        this.fileInput = React.createRef();
    }

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

    onChangeAvatar = (e) => {
        const files = e.target.files;

        const filesArr = Array.prototype.slice.call(files);
        this.setState({ imgSelected: this.fileInput?.current?.files[0]?.name });
    };

    render() {
        const { classes, lang, theme, near } = this.props;
        const { imgSelected } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.form}>
                    <div className={classes.layoutLogo}>
                        <img src={theme.images.logo} className={classes.logo} alt='' />
                    </div>
                    <div className={classes.user}>{near?.wallet?.getAccountId()}</div>
                    <input className={classes.input} placeholder={'Nick name'} value={this.state.alias} onChange={this.onAliasChange} />
                    <input className={classes.input} placeholder={'Bio'} value={this.state.bio} onChange={this.onBioChange} />
                    <label className={classes.input + ' ' + classes.inputz} htmlFor='inputProfile'>
                        <input
                            type='file'
                            id='inputProfile'
                            className={classes.inputFile}
                            aria-label='File browser'
                            ref={this.fileInput}
                            onChange={this.onChangeAvatar}
                        />
                        <span className={classes.text}>{imgSelected ? imgSelected : 'Select an image...'}</span>
                        <span className={classes.browser}>Browse</span>
                    </label>
                    <button className={classes.button} onClick={this.onRegisterBtnClicked}>
                        {lang.register}
                    </button>
                </div>
            </div>
        );
    }
}

const styles = (theme) => ({
    user: {
        color: theme.color.textColor,
    },
    browser: {
        fontSize: 14,
        fontFamily: theme.font.fontMedium,
        color: theme.color.textColorInactive,
        paddingLeft: 15,
        borderLeft: '1px solid ' + theme.color.textColorInactive,
    },
    text: {
        fontSize: 14,
        fontFamily: theme.font.fontLight,
        color: theme.color.textColorInactive,
        fontStyle: 'italic',
        marginRight: 15,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFile: {
        visibility: 'hidden',
        display: 'none',
    },
    inputz: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        margin: 10,
        padding: '0 15px',
        background: theme.color.backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover span': {
            color: theme.color.textColor,
        },
    },
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
        margin: '10px 0',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        margin: 10,
        padding: '0 15px',
        color: theme.color.textColor,
        background: theme.color.backgroundColor,
    },
    form: {
        width: 400,
        height: 400,
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
        flex: 1,
        paddingBottom: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            near: state.near,
        };
    },
    {
        onUpdateUser,
        onUpdatePageNavigation,
    },
)(withStyles(styles)(withTheme(Profile)));
