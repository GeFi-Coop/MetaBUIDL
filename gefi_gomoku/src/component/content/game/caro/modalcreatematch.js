import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onContentChildNavigation } from '../../../../redux/action';
import { onCaroUpdateCurrentMatch } from '../../../../redux/actions/caro';
import Switch from '../../../common/switch';

class ModalCreateMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
            mode: 'normal',
            time: '',
            bet: true,
            betValue: 5,
            rulesSwap: true,
            rulesReturn: true,
        };
    }

    mode = [
        { id: 'normal', label: this.props.lang.normal },
        // { id: 'rank', label: this.props.lang.rank },
        // { id: 'tournament', label: this.props.lang.tournament },
    ];

    selectMode = (item) => {
        try {
            this.setState({ mode: item.id });
        } catch {}
    };

    onChangeTime = (e) => {
        try {
            this.setState({ time: e.target.value });
        } catch {}
    };

    onChangeBet = (value) => {
        try {
            this.setState({ bet: value });
        } catch {}
    };

    onChangeBetValue = (e) => {
        try {
            this.setState({ betValue: e.target.value });
        } catch {}
    };

    onCreateMatchClicked = () => {
        try {
            const { contract } = this.props.near;
            const { betValue } = this.state;

            contract
                .createMatch(
                    {
                        mode: 0,
                        bet: `${betValue}`,
                    },
                    100000000000000,
                )
                .then((res) => {
                    if (res) {
                        this.props.onCaroUpdateCurrentMatch?.({
                            ...res,
                        });
                        this.props.onCloseAnimate?.();
                        setTimeout(() => {
                            this.props.onContentChildNavigation?.('detailmatch');
                        }, 300);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch {}
    };

    onChangeSwap = (value) => {
        try {
            this.setState({ rulesSwap: value });
        } catch {}
    };

    onChangReturn = (value) => {
        try {
            this.setState({ rulesReturn: value });
        } catch {}
    };

    render() {
        const { classes, theme, lang } = this.props;
        const { bet, betValue, rulesSwap, rulesReturn } = this.state;
        return (
            <>
                <div className={classes.row}>
                    <div className={classes.text}>{lang.mode}</div>
                    {this.mode?.map?.((item, index) => {
                        if (item.id === 'all') return;
                        return (
                            <button
                                key={index}
                                className={classes.button}
                                style={
                                    this.state.mode === item.id
                                        ? {
                                              color: theme.color.colorBtnActive,
                                              background: theme.color.colorLinearGradient,
                                          }
                                        : null
                                }
                                onClick={() => this.selectMode?.(item)}>
                                {item.label}
                            </button>
                        );
                    })}
                </div>
                {/* <div className={classes.row}>
                    <div className={classes.text}>{lang.time}</div>
                    <select className={classes.button} onChange={this.onChangeTime}>
                        <option>5 {lang.min}</option>
                        <option>10 {lang.min}</option>
                        <option>15 {lang.min}</option>
                    </select>
                </div> */}
                <div className={classes.row}>
                    <div className={classes.text}>{lang.bet}</div>
                    {/* <Switch active={bet} onChange={this.onChangeBet} style={{ margin: '0 10px', height: 20 }} /> */}
                    {bet ? (
                        <label className={classes.betz}>
                            <input value={betValue} onChange={this.onChangeBetValue} className={classes.betinput} /> tokens
                        </label>
                    ) : (
                        <div style={{ height: 60 }} />
                    )}
                </div>
                {/* <div className={classes.row}>
                    <div className={classes.text}>{lang.rules}</div>
                    <div className={classes.label}>{lang.swap}</div>
                    <Switch active={rulesSwap} onChange={this.onChangeSwap} style={{ margin: '0 10px', height: 20 }} />
                    <div className={classes.label}>{lang.return}</div>
                    <Switch active={rulesReturn} onChange={this.onChangReturn} style={{ margin: '0 10px', height: 20 }} />
                </div> */}
                <button className={classes.buttonSubmit} onClick={this.onCreateMatchClicked}>
                    {lang.createMatch}
                </button>
            </>
        );
    }
}

const styles = (theme) => ({
    betinput: {
        background: 'none',
        width: 50,
        padding: 0,
        marginRight: 10,
        '&:focus': {
            boxShadow: 'none',
        },
        color: theme.color.textColor,
    },
    betz: {
        width: 'fit-content',
        height: 40,
        padding: '0 20px',
        borderRadius: 15,
        cursor: 'pointer',
        fontSize: 15,
        margin: 10,
        minWidth: 100,
        color: theme.color.colorBtn,
        background: theme.color.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSubmit: {
        width: 140,
        height: 50,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        fontSize: 16,
        margin: 20,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        lineHeight: 1.2,
        fontFamily: theme.font.fontLight,
        margin: '10px 0 10px 50px',
        color: theme.color.textColor,
    },
    text: {
        fontSize: 16,
        lineHeight: 1.2,
        marginRight: 10,
        color: theme.color.textColor,
    },
    row: {
        width: '100%',
        display: 'flex',
        margin: '10px 0',
        alignItems: 'center',
    },
    button: {
        width: 'fit-content',
        height: 40,
        padding: '0 20px',
        borderRadius: 15,
        cursor: 'pointer',
        fontSize: 15,
        margin: 10,
        minWidth: 100,
        color: theme.color.colorBtn,
        background: theme.color.backgroundColor,
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            contentHome: state.homeControl.content,
            near: state.near,
        };
    },
    {
        onContentChildNavigation,
        onCaroUpdateCurrentMatch,
    },
)(withStyles(styles)(withTheme(ModalCreateMatch)));
