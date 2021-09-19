import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onContentChildNavigation, onUpdateModal } from '../../../redux/action';
import Modal from '../../common/modal';

class Liquidity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    aLiquidity = [
        { from: 'NEAR', to: 'OCT', poolFrom: 1103.08, poolTo: 1.96428, poolTokens: 46.35, poolShare: '2.90%' },
        { from: 'APE', to: 'BNB', poolFrom: 1103.08, poolTo: 1.96428, poolTokens: 46.35, poolShare: '2.90%' },
    ];

    renderContent = () => {
        try {
            const { contentChild } = this.props;
            switch (contentChild) {
                case 'main':
                    return this.renderMain?.();
                case 'addliquidity':
                    return this.renderAddLiquidity?.();

                default:
                    return this.renderMain?.();
            }
        } catch {}
    };

    onAddLiquidityClicked = () => {
        try {
            this.props.onContentChildNavigation?.('addliquidity');
        } catch {}
    };

    goBack = () => {
        try {
            this.props.onContentChildNavigation?.('main');
        } catch {}
    };

    liquidityItemClicked = (item) => {
        try {
            item.open = !item.open;
            this.setState({ updateView: !this.state.updateView });
        } catch {}
    };

    renderMain = () => {
        try {
            const { classes, theme } = this.props;
            return (
                <div className={classes.form}>
                    <div className={classes.header}>
                        <div className={classes.row}>
                            <div className={classes.textz}>
                                <div className={classes.title}>Liquidity</div>
                                <div className={classes.label}>Add liquidity to receive LP tokens</div>
                            </div>
                            <img src={theme.images.recent} className={classes.icon} alt='' />
                        </div>
                        <button className={classes.buttonAdd} onClick={this.onAddLiquidityClicked}>
                            Add Liquidity
                        </button>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.text}>Your liquidity</div>
                        {this.aLiquidity?.length > 0 ? (
                            <div style={{ padding: '18px 0' }}>
                                {this.aLiquidity?.map?.((item, index) => {
                                    return (
                                        <div className={classes.liqItemz} style={{ height: item.open ? 180 : 58 }} key={index}>
                                            <div className={classes.liqItem} onClick={() => this.liquidityItemClicked?.(item)}>
                                                <img src={theme.images.logo} className={classes.iconz} />
                                                <div className={classes.textSwap} style={{ flex: 1 }}>
                                                    {item.from} / {item.to}
                                                </div>
                                                <img
                                                    src={theme.images.right}
                                                    className={classes.iconArrow}
                                                    style={{ transform: item.open ? 'rotateZ(90deg)' : 'rotateZ(0deg)' }}
                                                    alt=''
                                                />
                                            </div>
                                            <>
                                                <div className={classes.liqItemRow} style={{ marginTop: 5 }}>
                                                    <div className={classes.textItem}>Pooled {item.from}:</div>
                                                    <div className={classes.textItem}>{item.poolFrom}</div>
                                                </div>
                                                <div className={classes.liqItemRow}>
                                                    <div className={classes.textItem}>Pooled {item.to}:</div>
                                                    <div className={classes.textItem}>{item.poolTo}</div>
                                                </div>
                                                <div className={classes.liqItemRow}>
                                                    <div className={classes.textItem}>Your pool tokens:</div>
                                                    <div className={classes.textItem}>{item.poolTokens}</div>
                                                </div>
                                                <div className={classes.liqItemRow}>
                                                    <div className={classes.textItem}>Your pool share:</div>
                                                    <div className={classes.textItem}>{item.poolShare}</div>
                                                </div>
                                            </>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={classes.textNo}>No liquidity found</div>
                        )}
                        <div className={classes.textSub}>
                            Don't see a pool you joined? <span className={classes.importText}>Import it.</span>
                        </div>
                        <div className={classes.textSub}>Or, if you staked your FLIP tokens in a farm, unstake them to see them here.</div>
                    </div>
                </div>
            );
        } catch {}
    };

    renderAddLiquidity = () => {
        try {
            const { classes, theme, lang } = this.props;
            return (
                <div className={classes.form}>
                    <div className={classes.headerAdd}>
                        <img src={theme.images.arrowDown} className={classes.goback} onClick={this.goBack} />
                        <div className={classes.textz}>
                            <div className={classes.title} style={{ marginBottom: 0 }}>
                                Add Liquidity
                            </div>
                        </div>
                        <img src={theme.images.recent} className={classes.icon} />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.fromTo}>
                            <div className={classes.rowHead}>
                                <div className={classes.text}>Input</div>
                                <div className={classes.text}>Balance: 20.9984</div>
                            </div>
                            <div className={classes.row}>
                                <input className={classes.input} placeholder='0.0' />
                                <div className={classes.max}>MAX</div>
                                <select className={classes.select}>
                                    <option>Bitcoin</option>
                                    <option>NEAR</option>
                                    <option>OCT</option>
                                </select>
                            </div>
                        </div>
                        <img src={theme.images.add} className={classes.arrowDown} />
                        <div className={classes.fromTo}>
                            <div className={classes.rowHead}>
                                <div className={classes.text}>Input</div>
                                <div className={classes.text}>Balance: 1000</div>
                            </div>
                            <div className={classes.row}>
                                <input className={classes.input} placeholder='0.0' />
                                <div className={classes.max}>MAX</div>
                                <select className={classes.select}>
                                    <option>NEAR</option>
                                    <option>Bitcoin</option>
                                    <option>OCT</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.text} style={{ marginTop: 24 }}>
                            Prices and Pool share
                        </div>
                        <div className={classes.poolz}>
                            <div className={classes.poolItem}>
                                <div className={classes.title}>0.4896</div>
                                <div className={classes.label}>NEAR per OCT</div>
                            </div>
                            <div className={classes.poolItem}>
                                <div className={classes.title}>2.1869</div>
                                <div className={classes.label}>OCT per NEAR</div>
                            </div>
                            <div className={classes.poolItem}>
                                <div className={classes.title}>2.5%</div>
                                <div className={classes.label}>Share of Pool</div>
                            </div>
                        </div>
                        <button className={classes.button} onClick={this.onSupplyClicked}>
                            Supply
                        </button>
                    </div>
                </div>
            );
        } catch {}
    };

    onSupplyClicked = () => {
        try {
            this.props.onUpdateModal?.('confirmadd');
        } catch {}
    };

    closeModal = () => {
        try {
            this.props.onUpdateModal?.('');
        } catch {}
    };

    renderModal = () => {
        try {
            const { modal } = this.props;
            switch (modal) {
                case 'confirmadd':
                    return this.renderConfirmAdd?.();

                default:
                    break;
            }
        } catch {}
    };

    renderTitle = () => {
        try {
            const { modal } = this.props;
            switch (modal) {
                case 'confirmadd':
                    return 'Confirm supply';

                default:
                    break;
            }
        } catch {}
    };

    renderConfirmAdd = () => {
        try {
            const { classes } = this.props;
            return (
                <div className={classes.contentModal}>
                    <div className={classes.text}>You will receive</div>
                    <div className={classes.numberReceive}>46.3513</div>
                    <div className={classes.textName}>OCT / NEAR Pool Tokens</div>
                    <div className={classes.textSub}>Output is estimated. If the price changes by more than 1% your transaction will revert</div>
                    <div className={classes.detail}>
                        <div className={classes.liqItemRow}>
                            <div className={classes.textItem}>NEAR deposited:</div>
                            <div className={classes.textItem}>1000</div>
                        </div>
                        <div className={classes.liqItemRow}>
                            <div className={classes.textItem}>OCT deposited:</div>
                            <div className={classes.textItem}>2000</div>
                        </div>
                        <div className={classes.liqItemRow} style={{ alignItems: 'flex-start' }}>
                            <div className={classes.textItem}>Rates:</div>
                            <div className={classes.itemz}>
                                <div className={classes.textItem}>1 NEAR = 2.1450 OCT</div>
                                <div className={classes.textItem} style={{ marginTop: 5 }}>
                                    1 OCT = 0.4895 NEAR
                                </div>
                            </div>
                        </div>
                        <div className={classes.liqItemRow}>
                            <div className={classes.textItem}>Share of pool:</div>
                            <div className={classes.textItem}>2.5%</div>
                        </div>
                    </div>
                    <button className={classes.buttonConfirm} onClick={this.onConfirmSupplyClicked}>
                        Confirm Supply
                    </button>
                </div>
            );
        } catch {}
    };

    onConfirmSupplyClicked = () => {
        try {
            this.props.onUpdateModal?.('');
        } catch {}
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.renderContent?.()}
                <Modal title={this.renderTitle?.()} style={{ width: 500, height: 'max-content' }} closeModal={this.closeModal}>
                    {this.renderModal?.()}
                </Modal>
            </div>
        );
    }
}

const styles = (theme) => ({
    buttonConfirm: {
        width: 160,
        height: 40,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        fontSize: 16,
        margin: '12px auto',
    },
    itemz: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        margin: '24px 0',
        padding: 12,
        borderRadius: 15,
        background: theme.color.backgroundColor,
    },
    textName: {
        fontSize: 24,
        lineHeight: 1.2,
        color: theme.color.textColor,
        margin: '12px 0',
    },
    contentModal: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
    },
    numberReceive: {
        fontSize: 40,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
        margin: '24px 0',
    },
    poolItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    poolz: {
        width: '100%',
        borderRadius: 15,
        padding: '12px 16px',
        border: '1px solid ' + theme.color.borderColor,
        display: 'flex',
        marginTop: 12,
    },
    rowHead: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    max: {
        fontSize: 16,
        lineHeight: 1.2,
        color: theme.color.textColorActive,
        fontFamily: theme.font.fontBold,
        margin: '0 10px',
        cursor: 'pointer',
    },
    goback: {
        width: 20,
        height: 20,
        marginRight: 20,
        transform: ' rotateZ(90deg)',
        cursor: 'pointer',
    },
    textItem: {
        fontSize: 14,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontLight,
    },
    liqItemRow: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
    },
    iconArrow: {
        width: 12,
        height: 12,
        transition: 'transform 0.5s',
    },
    iconz: {
        width: 24,
        height: 24,
        marginRight: 5,
        marginLeft: -5,
    },
    textSwap: {
        fontSize: 16,
        lineHeight: 1.2,
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
    },
    liqItem: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
        cursor: 'pointer',
    },
    liqItemz: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        transition: 'height 0.5s',
        overflow: 'hidden',
        background: theme.color.backgroundColor,
        margin: '10px 0',
        borderRadius: 12,
    },
    importText: {
        color: theme.color.textColorActive,
        fontFamily: theme.font.fontBold,
    },
    textSub: {
        fontSize: 14,
        lineHeight: 1.2,
        color: theme.color.textColor,
        margin: '10px 0',
        fontFamily: theme.font.fontLight,
    },
    textNo: {
        fontSize: 16,
        lineHeight: 1.2,
        color: theme.color.textColorInactive,
        fontFamily: theme.font.fontLight,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAdd: {
        width: 140,
        height: 50,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        fontSize: 16,
        margin: '24px 0 10px',
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
        width: 16,
        height: 16,
        margin: '24px 0',
        alignSelf: 'center',
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
        borderRadius: 15,
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
    headerAdd: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        borderBottom: '1px solid ' + theme.color.borderColor,
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 24px',
        borderBottom: '1px solid ' + theme.color.borderColor,
    },
    content: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
    },
    form: {
        width: 450,
        height: 'max-content',
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
            contentChild: state.homeControl.contentChild,
            modal: state.homeControl.modal,
        };
    },
    {
        onContentChildNavigation,
        onUpdateModal,
    },
)(withStyles(styles)(withTheme(Liquidity)));
