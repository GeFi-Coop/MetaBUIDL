import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHomeControlNavigation, onUpdateModal } from '../../../redux/action';
import Modal from '../../common/modal';
import { utils } from 'near-api-js';

const GAS_AMOUNT = 300000000000000;
const GEFI_NEAR_RATE = 1000000;
class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    onExchangeClicked = () => {
        try {
            const { contract } = this.props.near;
            let attachedDeposit = utils.format.parseNearAmount((Number(this.state.value) / GEFI_NEAR_RATE).toString());
            contract.deposit({}, GAS_AMOUNT, attachedDeposit)
                .then(() => {
                    console.log("Deposited");
                })
                .catch((err) => { console.log(err); });
            this.props.onUpdateModal?.('confirmswap');
        } catch (err) {
            console.log("E:/Work/GEFI/amm/src/component/content/trade/exchange.js: onExchangeClicked => ", err);
        }
    };

    onChangeSwapAmount = (event) => {
        try {
            console.log('=> ', event.target.value);
            let newAmount = Number(event.target.value) * GEFI_NEAR_RATE;
            this.setState({ value: newAmount });
        }
        catch { }
    }

    renderModal = () => {
        try {
            const { modal } = this.props;
            switch (modal) {
                case 'confirmswap':
                    return this.renderConfirmSwap?.();

                default:
                    break;
            }
        } catch {}
    };

    renderTitle = () => {
        try {
            const { modal } = this.props;
            switch (modal) {
                case 'confirmswap':
                    return 'Confirm swap';

                default:
                    break;
            }
        } catch {}
    };

    renderConfirmSwap = () => {
        try {
            const { classes, theme } = this.props;
            return (
                <>
                    <div className={classes.rowz}>
                        <img src={theme.images.logo} className={classes.iconz} />
                        <div className={classes.textSwap} style={{ flex: 1 }}>
                            10
                        </div>
                        <div className={classes.textSwap}>NEAR</div>
                    </div>
                    <img src={theme.images.arrowDown} className={classes.arrowDownz} />
                    <div className={classes.rowz}>
                        <img src={theme.images.logo} className={classes.iconz} />
                        <div className={classes.textSwap} style={{ flex: 1 }}>
                            20
                        </div>
                        <div className={classes.textSwap}>OCT</div>
                    </div>
                    <div className={classes.label}>Output is estimated. You will receive at least 20 OCT</div>
                    <div className={classes.fromTo} style={{ marginTop: 16 }}>
                        <div className={classes.rowx}>
                            <div className={classes.textx}>Price</div>
                            <div className={classes.textx}>2 OCT / NEAR</div>
                        </div>
                        <div className={classes.rowx}>
                            <div className={classes.textx}>Minimum received</div>
                            <div className={classes.textx}>20 OCT</div>
                        </div>
                        <div className={classes.rowx}>
                            <div className={classes.textx}>Price impact</div>
                            <div className={classes.textx}>{'<'}0.01%</div>
                        </div>
                        <div className={classes.rowx}>
                            <div className={classes.textx}>Liquidity Provider Fee</div>
                            <div className={classes.textx}>0.05 NEAR</div>
                        </div>
                    </div>
                    <button className={classes.button} onClick={this.onConfirmSwapClicked}>
                        Confirm swap
                    </button>
                </>
            );
        } catch {}
    };

    onConfirmSwapClicked = () => {
        try {
            this.props.onUpdateModal?.('');
        } catch {}
    };

    closeModal = () => {
        try {
            this.props.onUpdateModal?.('');
        } catch {}
    };

    render() {
        const { classes, theme, lang } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.form}>
                    <div className={classes.header}>
                        <div className={classes.textz}>
                            <div className={classes.title}>Exchange</div>
                            <div className={classes.label}>Trade tokens in an instant</div>
                        </div>
                        <img src={theme.images.recent} className={classes.icon} />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.fromTo}>
                            <div className={classes.rowHead}>
                                <div className={classes.text}>From</div>
                                <div className={classes.text}>Balance: 1000</div>
                            </div>
                            <div className={classes.row}>
                                <input className={classes.input} onChange={this.onChangeSwapAmount} placeholder='0.0' />
                                <select className={classes.select}>
                                    {/* <option>Bitcoin</option> */}
                                    <option>NEAR</option>
                                    {/* <option>OCT</option> */}
                                </select>
                            </div>
                        </div>
                        <img src={theme.images.arrowDown} className={classes.arrowDown} />
                        <div className={classes.fromTo}>
                            <div className={classes.rowHead}>
                                <div className={classes.text}>To</div>
                                <div className={classes.text}>Balance: 1000</div>
                            </div>
                            <div className={classes.row}>
                                <input className={classes.input} readOnly={true} value={this.state.value} placeholder='0.0' />
                                <select className={classes.select}>
                                    {/* <option>NEAR</option> */}
                                    {/* <option>Bitcoin</option> */}
                                    {/* <option>OCT</option> */}
                                    <option>GEFI Tokens</option>
                                </select>
                            </div>
                        </div>
                        <button className={classes.button} onClick={() => this.onExchangeClicked()}>
                            {lang.swap}
                        </button>
                    </div>
                </div>
                <Modal title={this.renderTitle?.()} style={{ width: 500, height: 'max-content' }} closeModal={this.closeModal}>
                    {this.renderModal?.()}
                </Modal>
            </div>
        );
    }
}

const styles = (theme) => ({
    rowHead: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    textx: {
        fontSize: 13,
        lineHeight: 1.2,
        color: theme.color.textColor,
    },
    rowx: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 24,
    },
    iconz: {
        width: 24,
        height: 24,
        marginRight: 5,
    },
    textSwap: {
        fontSize: 18,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
    },
    rowz: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '12px 0',
        height: 36,
    },
    arrowDownz: {
        width: 14,
        height: 14,
        margin: '6px 0',
        cursor: 'pointer',
    },
    button: {
        width: 140,
        height: 40,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        fontSize: 16,
        margin: '24px auto 10px',
    },
    select: {
        background: theme.color.backgroundColor,
        outline: 'none',
        color: theme.color.textColor,
        border: 'none',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: 8,
    },
    arrowDown: {
        width: 20,
        height: 20,
        margin: '24px 0',
        alignSelf: 'center',
        cursor: 'pointer',
    },
    input: {
        background: 'none',
        height: 24,
        padding: 0,
        flex: 1,
        color: theme.color.textColor,
        '&:focus': {
            boxShadow: 'none',
        },
    },
    row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 12,
    },
    text: {
        fontSize: 15,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
    },
    fromTo: {
        width: '100%',
        borderRadius: 16,
        padding: '12px 16px',
        background: theme.color.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        width: 24,
        height: 24,
        cursor: 'pointer',
    },
    label: {
        fontSize: 14,
        lineHeight: 1.2,
        color: theme.color.textColorInactive,
    },
    title: {
        fontSize: 20,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
        marginBottom: 8,
    },
    textz: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 24,
        borderBottom: '1px solid ' + theme.color.borderColor,
    },
    content: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
    },
    form: {
        width: 450,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.color.backgroundColor,
        borderRadius: 24,
        backdropFilter: 'blur(5px)',
    },
    root: {
        width: '100%',
        flex: 1,
        paddingBottom: '15%',
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
            contentHome: state.homeControl.content,
            modal: state.homeControl.modal,
            near: state.near
        };
    },
    {
        onHomeControlNavigation,
        onUpdateModal,
    },
)(withStyles(styles)(withTheme(Exchange)));
