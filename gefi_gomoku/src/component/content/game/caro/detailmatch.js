import React, { Fragment } from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onContentChildNavigation } from '../../../../redux/action';
import Switch from '../../../common/switch';
import { io } from 'socket.io-client';

class DetailMatch extends React.Component {
    GRID = 20;
    maxtrixBoard = Array(this.GRID)
        .fill(0)
        .map(() => Array(this.GRID).fill(0));
    step = 0;
    playBoard = [];
    value = 1;
    type = 1;
    socket;
    player = [];
    isLocking = true;
    countInt = -1;
    loadTimer = -1;
    constructor(props) {
        super(props);
        this.state = {
            tab: 'move',
            bet: true,
            betValue: 5,
            rulesSwap: true,
            rulesReturn: true,
            startGame: false,
            status: 'Waiting for player!',
            showNotify: true,
            loading: true,
            count: undefined,
        };
    }

    componentDidMount() {
        const { cMatch, near } = this.props;
        const { wallet } = near;
        const accountId = wallet.getAccountId();

        if (cMatch.owner === accountId) {
            this.type = 1;
        } else {
            this.type = 2;
        }

        this.initSocket()
            .then(() => {
                let event = 'match::create';
                if (this.type === 2) {
                    event = 'match::join';
                }

                this.socket.emit(event, {
                    accountId,
                    matchId: cMatch?.id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentWillUnmount() {
        if (this.countInt !== -1) {
            clearInterval(this.countInt);
        }
        if (this.loadTimer !== -1) {
            clearTimeout(this.loadTimer);
        }
    }

    initSocket = () => {
        this.socket = io('http://localhost:7000', {
            transports: ['websocket'],
            rejectUnauthorized: false,
        });

        this.socket.on('error', (data) => {
            console.log('error', data);
        });

        this.socket.on('response', (response) => {
            const { resource, message, data } = response;
            this.handleServerMessage(resource, message, data);
        });

        return new Promise((resolve) => {
            this.socket.on('connect', () => {
                resolve();
            });
        });
    };

    handleServerMessage = (resource, message, data) => {
        const { accountId } = this.props.near.currentUser;
        switch (resource) {
            case 'match::create':
                break;
            case 'match::start':
                this.onHandlerMatchStart(data);
                break;
            case 'match::join':
                this.onHandlerPlayerJoinMatch(data);
                break;
            case 'match::play':
                this.onCompetitorPlay(data);
                break;
            case 'match::finish':
                this.onHandlerMatchFinish(data);
                break;
            case 'match::complete':
                this.onHandlerMatchComplete(data);
                break;
            default:
                break;
        }
    };

    tab = [
        { id: 'move', label: this.props.lang.move },
        { id: 'member', label: this.props.lang.member },
        { id: 'rules', label: this.props.lang.rules },
    ];

    mode = [
        { id: 'normal', label: this.props.lang.normal },
        { id: 'rank', label: this.props.lang.rank },
        { id: 'tournament', label: this.props.lang.tournament },
    ];

    onTabClicked = (tab) => {
        try {
            this.setState({ tab });
        } catch {}
    };

    onLeaveGameClicked = () => {
        try {
            if (this.state.startGame) {
                //Modal alert có muốn thoát game khi đang chơi => Xử thua
            }
            this.props.onContentChildNavigation?.('main');
        } catch {}
    };

    renderTable = () => {
        try {
            const { tab } = this.state;
            switch (tab) {
                case 'move':
                    return this.renderTableMove?.();
                case 'member':
                    return this.renderTableMember?.();
                case 'rules':
                    return this.renderTableRules?.();

                default:
                    return this.renderTableMove?.();
            }
        } catch {}
    };

    renderTableMove = () => {
        try {
            const { classes } = this.props;
            return (
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>g1</td>
                            <td>h3</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>e8</td>
                            <td>d5</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>i3</td>
                            <td>h1</td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch {}
    };

    renderTableMember = () => {
        try {
            const { classes, lang } = this.props;
            return (
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            <th>{lang.player}</th>
                            <th>{lang.rank}</th>
                            <th>{lang.action}</th>
                        </tr>
                        <tr>
                            <td>Player 2 (key)</td>
                            <td>45</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Player 1</td>
                            <td>67</td>
                            <td>{lang.remove}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>i3</td>
                            <td>{lang.remove}</td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch {}
    };

    renderTableRules = () => {
        try {
            const { classes, lang } = this.props;
            const { bet, betValue, rulesSwap, rulesReturn } = this.state;
            return (
                <>
                    <div className={classes.rowz}>
                        <div className={classes.text}>{lang.mode}</div>
                        <select className={classes.button}>
                            {this.mode?.map?.((item, index) => {
                                return <option key={index}>{item.label}</option>;
                            })}
                        </select>
                    </div>
                    <div className={classes.rowz}>
                        <div className={classes.text}>{lang.bet}</div>
                        <Switch active={bet} onChange={this.onChangeBet} style={{ margin: '0 10px', height: 20 }} />
                        {bet ? (
                            <label className={classes.betRule}>
                                <input value={betValue} onChange={this.onChangeBetValue} className={classes.betinput} /> NEAR
                            </label>
                        ) : (
                            <div style={{ height: 60 }} />
                        )}
                    </div>
                    <div className={classes.rowz}>
                        <div className={classes.text}>{lang.swap}</div>
                        <Switch active={rulesSwap} onChange={this.onChangeSwap} style={{ margin: '0 10px', height: 20 }} />
                    </div>
                    <div className={classes.rowz}>
                        <div className={classes.text}>{lang.return}</div>
                        <Switch active={rulesReturn} onChange={this.onChangReturn} style={{ margin: '0 10px', height: 20 }} />
                    </div>
                </>
            );
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

    onHandlerMatchStart = (data) => {
        try {
            const { cMatch, near } = this.props;
            const { wallet, contract } = near;
            const { player, first } = data;
            const accountId = wallet.getAccountId();

            this.player = [...player];
            if (player?.includes(accountId)) {
                accountId === first && (this.isLocking = false);
                // this.setState({
                //     startGame: canStart,
                // });

                let count = 3;
                this.countInt = setInterval(() => {
                    if (count >= 0) {
                        this.setState({ count });
                        count--;
                    } else {
                        this.setState({ count: undefined });
                        clearInterval(this.countInt);
                    }
                }, 1000);
                this.loadTimer = setTimeout(() => {
                    this.setState({ loading: false, showNotify: false }, () => {
                        if (data.first === accountId) {
                            this.setState({ showNotify: true, status: 'Your turn!' });
                        } else {
                            this.setState({ showNotify: true, status: 'Waiting your competitor!' });
                        }
                    });
                }, 4000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    onHandlerMatchFinish = async (data) => {
        try {
            const { reason, winner } = data;
            const { cMatch, near } = this.props;
            const { wallet, contract } = near;
            const accountId = wallet.getAccountId();
            this.isLocking = true;
            this.setState({
                status: accountId === winner ? 'You win, waiting for your reward' : 'You lose',
            });
            if (accountId === winner) {
                while (1) {
                    try {
                        console.log(123);
                        const ret = await contract.finishMatch(
                            {
                                id: cMatch.id,
                                result: 2,
                                winner,
                            },
                            300000000000000,
                        );
                        console.log(ret);
                        if (ret === cMatch.id) {
                            this.socket.emit('match::complete', {
                                matchId: cMatch.id,
                            });
                            break;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        } catch {}
    };

    onHandlerPlayerJoinMatch = async (data) => {
        try {
            const { cMatch, near } = this.props;
            const { wallet, contract } = near;
            this.setState({
                status: 'A player has joined game. The Match will be starting soon!! Please take a while',
            });
            let ret = false;
            if (this.type === 1) {
                while (1) {
                    try {
                        const matchId = await contract.startMatch(
                            {
                                id: cMatch.id,
                            },
                            300000000000000,
                        );
                        if (matchId === cMatch.id) {
                            ret = true;
                            break;
                        }
                        ret = false;
                        break;
                    } catch {}
                }
            }

            if (ret) {
                this.socket.emit('match::start', {
                    matchId: cMatch.id,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    onCompetitorPlay = (item) => {
        const { player, coordinate } = item;
        const { wallet } = this.props.near;
        const accountId = wallet.getAccountId();
        const isCompetitor = !(accountId === player);
        if (isCompetitor) {
            this.isLocking = false;
            this.maxtrixBoard[coordinate.x][coordinate.y] = this.type === 1 ? 2 : 1;
            this.setState({
                status: 'Your Turn!',
            });
        } else {
            this.maxtrixBoard[coordinate.x][coordinate.y] = this.type;
            this.setState({
                status: 'Waiting your competitor!',
            });
        }
        let result = this.victoryCheck(this.maxtrixBoard);
        if (result) {
            this.onMatchResult(result);
        }
        this.setState({ isUpdateView: !this.isUpdateView });
    };

    onPlayerTap = (item) => {
        // if (this.state.showNotify) {
        //     this.setState({ showNotify: false });
        // }

        if (this.maxtrixBoard[item.x][item.y] === 0 && !this.isLocking) {
            this.setState({
                status: 'Waiting your competitor!',
            });
            this.maxtrixBoard[item.x][item.y] = this.type;
            const { cMatch, near } = this.props;
            const { wallet } = near;
            const accountId = wallet.getAccountId();

            this.socket.emit('match::play', {
                accountId,
                matchId: cMatch?.id,
                x: item.x,
                y: item.y,
            });
            this.isLocking = true;
            this.setState({ isUpdateView: !this.isUpdateView });
        }
    };

    onMatchResult(result) {
        const { cMatch } = this.props;
        let ret = 'WINNING';
        if (result === 3) {
            ret = 'TIE';
        }
        this.type === 1 && this.onBroadcastMatchFinish(cMatch.id, ret, this.player?.[result - 1]);
    }

    onHandlerMatchComplete = () => {
        this.props.onContentChildNavigation?.('main');
    };

    onBroadcastMatchFinish = (matchId, reason, winner) => {
        try {
            this.socket.emit('match::finish', {
                matchId,
                reason,
                winner,
            });
        } catch {}
    };

    onRenderBoard = () => {
        const { classes, theme } = this.props;
        this.playBoard = [];
        for (let i = 0; i < this.GRID; i++) {
            let vertical = [];
            for (let j = 0; j < this.GRID; j++) {
                let item = {
                    x: i,
                    y: j,
                };
                vertical.push(item);
            }
            this.playBoard.push(
                <div style={{ display: 'flex', width: '100%' }}>
                    {vertical.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {
                                    <button
                                        className={classes.caro}
                                        onClick={() => this.onPlayerTap(item)}
                                        style={{
                                            borderTop: index >= 0 && index <= 19 && item.x === 0 ? '1px solid ' + theme.color.borderColor : 'none',
                                            borderLeft: item.y >= 0 && item.y <= 19 && index === 0 ? '1px solid ' + theme.color.borderColor : 'none',
                                            color:
                                                this.maxtrixBoard[item.x][item.y] !== 0
                                                    ? this.maxtrixBoard[item.x][item.y] === 1
                                                        ? '#d60f0f'
                                                        : '#0086f4'
                                                    : 'unset',
                                        }}>
                                        {this.maxtrixBoard[item.x][item.y] !== 0 && (
                                            <img src={this.maxtrixBoard[item.x][item.y] === 1 ? theme.images.x : theme.images.o} className={classes.iconXO} />
                                        )}
                                    </button>
                                }
                            </Fragment>
                        );
                    })}
                </div>,
            );
        }

        return (
            <Fragment>
                {this.playBoard?.map?.((item, index) => {
                    return <Fragment key={index}>{item}</Fragment>;
                })}
            </Fragment>
        );
    };

    notification = () => {
        const { classes, theme } = this.props;
        const { status, loading, showNotify } = this.state;
        return (
            <aside
                className={classes.notifyz}
                style={
                    showNotify
                        ? { animation: 'notifyIn ease-in-out 0.5s', transform: 'translateY(0em)' }
                        : { animation: 'notifyOut ease-in-out 0.5s 5s', transform: 'translateY(-10em)' }
                }>
                <div className={classes.notify}>
                    <span className={classes.text}>{status}</span>
                    {loading && <img src={theme.images.loading} className={classes.iconLoading} />}
                </div>
            </aside>
        );
    };

    victoryCheck(grid) {
        let SEQUENCE_SIZE = 5;
        let PLAYER_1 = 1;
        let PLAYER_2 = 2;
        let isDraw = 1;
        for (var i = 0; i < this.GRID; i++) {
            for (var j = 0; j < this.GRID; j++) {
                isDraw = isDraw && grid[i][j];
                if (grid[i][j] == 1) {
                    for (var k = 1; k < SEQUENCE_SIZE && j + k < this.GRID && grid[i][j + k] == 1; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_1;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && grid[i + k][j] == 1; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_1;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && j - k >= 0 && grid[i + k][j - k] == 1; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_1;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && j + k < this.GRID && grid[i + k][j + k] == 1; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_1;
                        }
                    }
                } else if (grid[i][j] == 2) {
                    for (var k = 1; k < SEQUENCE_SIZE && j + k < this.GRID && grid[i][j + k] == 2; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_2;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && grid[i + k][j] == 2; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_2;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && j - k >= 0 && grid[i + k][j - k] == 2; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_2;
                        }
                    }
                    for (var k = 1; k < SEQUENCE_SIZE && i + k < this.GRID && j + k < this.GRID && grid[i + k][j + k] == 2; k++) {
                        if (k == SEQUENCE_SIZE - 1) {
                            return PLAYER_2;
                        }
                    }
                }
            }
        }
        if (isDraw === 1) {
            return 3;
        }
    }

    render() {
        const { classes, lang, theme } = this.props;
        const { tab, showNotify, loading, count } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.chessz}>
                    {/* <div className={classes.row}>
                        <div className={classes.betz}>
                            <button className={classes.button}>Bet for Player 1</button>
                            <div className={classes.text}>1000 NEAR</div>
                        </div>
                        <div className={classes.line} />
                        <div className={classes.betz} style={{ justifyContent: 'flex-end' }}>
                            <div className={classes.text}>1000 NEAR</div>
                            <button className={classes.button}>Bet for Player 2</button>
                        </div>
                    </div> */}
                    <div className={classes.game}>
                        {showNotify && this.notification?.()}
                        <div style={loading ? { pointerEvents: 'none', opacity: 0.6 } : null}>{this.onRenderBoard?.()}</div>
                        {typeof count !== 'undefined' && <div className={classes.count}>{count}</div>}
                    </div>
                </div>
                <div className={classes.infoz}>
                    <div className={classes.row} style={{ justifyContent: 'flex-end' }}>
                        <div className={classes.leave} onClick={this.onLeaveGameClicked}>
                            {lang.leaveGame}
                        </div>
                    </div>
                    <div className={classes.reward}>{lang.rewardWinner}: 7.5 NEAR</div>
                    {/* <div className={classes.reward}>Match 1 : 5 {lang.min}</div> */}
                    <div className={classes.rule}>
                        <button className={classes.button}>{lang.draw}</button>
                        <button className={classes.button}>Surrender</button>
                    </div>
                    {/* <div className={classes.tabz}>
                        {this.tab?.map?.((item, index) => {
                            return (
                                <div
                                    className={tab === item.id ? classes.tabA : classes.tab}
                                    style={index !== 0 ? { borderLeft: '1px solid ' + theme.color.borderColor } : null}
                                    onClick={() => this.onTabClicked(item.id)}
                                    key={index}>
                                    {item.label}
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.tablez}>{this.renderTable?.()}</div> */}
                </div>
            </div>
        );
    }
}

const styles = (theme) => ({
    count: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '5rem',
        color: theme.color.textColor,
    },
    iconLoading: {
        width: 32,
        height: 32,
    },
    notify: {
        background: theme.color.backgroundColor,
        borderRadius: 15,
        fontSize: 16,
        margin: '1em',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
    },
    notifyz: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1,
    },
    iconXO: {
        width: 24,
        height: 24,
    },
    caro: {
        width: 36,
        height: 36,
        borderRadius: 0,
        borderRight: '1px solid ' + theme.color.borderColor,
        borderBottom: '1px solid ' + theme.color.borderColor,
        backgroundColor: theme.color.backgroundColor,
        padding: 0,
        fontSize: 22,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    betinput: {
        background: 'none',
        width: 40,
        padding: 0,
        marginRight: 10,
        '&:focus': {
            boxShadow: 'none',
        },
        color: theme.color.textColor,
    },
    betRule: {
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
        color: theme.color.textColor,
    },
    rowz: {
        width: '100%',
        height: 60,
        display: 'flex',
        padding: '10px 0',
        alignItems: 'center',
    },
    table: {
        width: '100%',
        borderSpacing: 0,
        padding: '5px 10px',
        '& th': {
            textAlign: 'left',
            padding: '15px 5px',
            borderBottom: '1px solid ' + theme.color.borderColor,
        },
        '& td': {
            textAlign: 'left',
            padding: '10px 5px',
        },
        color: theme.color.textColor,
        fontSize: 14,
    },
    tablez: {
        width: '100%',
        flex: 1,
        background: theme.color.backgroundColor,
        borderRadius: 15,
        margin: '10px 0',
        backdropFilter: 'blur(5px)',
    },
    tabA: {
        flex: 1,
        fontSize: 15,
        lineHeight: 1.2,
        margin: '10px 0',
        color: theme.color.textColor,
        textAlign: 'center',
        fontFamily: theme.font.fontBold,
        cursor: 'pointer',
    },
    tab: {
        flex: 1,
        fontSize: 15,
        lineHeight: 1.2,
        margin: '10px 0',
        color: theme.color.textColor,
        textAlign: 'center',
        cursor: 'pointer',
    },
    tabz: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 15,
        border: '1px solid ' + theme.color.borderColor,
        fontFamily: theme.font.fontLight,
        margin: '10px 0',
    },
    rule: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    reward: {
        fontSize: 16,
        lineHeight: 1.2,
        margin: '10px 0',
        color: theme.color.textColor,
    },
    game: {
        width: '100%',
        flex: 1,
        marginBottom: 10,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        marginTop: 20,
    },
    leave: {
        fontSize: 16,
        lineHeight: 1.2,
        color: theme.color.linkColor,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    text: {
        fontSize: 16,
        lineHeight: 1.2,
        margin: '0 10px',
        color: theme.color.textColor,
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
    line: {
        width: 1,
        height: 30,
        background: theme.color.textColor,
    },
    betz: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        display: 'flex',
        margin: '10px 0',
        alignItems: 'center',
        height: 60,
        marginBottom: 20,
    },
    infoz: {
        flex: 1,
        height: '100%',
        minWidth: 300,
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 16,
    },
    chessz: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            contentHome: state.homeControl.content,
            cMatch: state.caro.cMatch,
            near: state.near,
        };
    },
    {
        onContentChildNavigation,
    },
)(withStyles(styles)(withTheme(DetailMatch)));
