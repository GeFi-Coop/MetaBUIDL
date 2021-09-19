import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onUpdateModal, onContentChildNavigation } from '../../../../redux/action';
import { onCaroUpdateCurrentMatch } from '../../../../redux/actions/caro';
import ModalCreateMatch from './modalcreatematch';
import Modal from '../../../common/modal';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';

class Main extends React.Component {
    data = [];
    constructor(props) {
        super(props);
        this.state = {
            mode: 'all',
            page: 0,
            rowsPerPage: 10,
        };
    }

    componentDidMount() {
        const { contract, wallet } = this.props.near;
        const accountId = wallet.getAccountId();
        contract
            .getMatchs({
                page: 1,
            })
            .then((matchs) => {
                if (matchs) {
                    this.data = [...matchs.data];
                    this.data = this.data.filter((x) => x.owner !== accountId);
                    this.setState({
                        isUpdateView: !this.state.isUpdateView,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    dateTimeConverted = (nanoSeconds) => {
        const milisecond = nanoSeconds / 1000000;
        const date = new Date(milisecond);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month < 10 && (month = `0${month}`);
        let day = date.getDate();
        day < 10 && (day = `0${day}`);

        let hours = date.getHours();
        hours < 10 && (hours = `0${hours}`);

        let minutes = date.getMinutes();
        minutes < 10 && (minutes = `0${minutes}`);

        let seconds = date.getSeconds();
        seconds < 10 && (seconds = `0${seconds}`);

        return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
    };

    mode = [
        { id: 'all', label: this.props.lang.all },
        // { id: 'normal', label: this.props.lang.normal },
        // { id: 'rank', label: this.props.lang.rank },
        // { id: 'bet', label: this.props.lang.bet },
        // { id: 'tournament', label: this.props.lang.tournament },
    ];

    tableProps = {
        column: {
            match: {
                title: 'Match',
                field: 'id',
                render: (rowData) => {
                    return rowData.tableData.id + 1;
                },
                headerStyle: {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: this.props.theme.color.textColor,
                    borderBottom: '1px solid ' + this.props.theme.color.borderColor,
                    background: this.props.theme.color.tableHeadColor,
                },
                cellStyle: {},
            },
            time: {
                title: 'Time',
                field: 'created',
                render: (rowData) => {
                    return this.dateTimeConverted(rowData.created);
                },
                headerStyle: {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: this.props.theme.color.textColor,
                    borderBottom: '1px solid ' + this.props.theme.color.borderColor,
                    background: this.props.theme.color.tableHeadColor,
                },
                cellStyle: {},
            },
            host: {
                title: 'Host',
                field: 'owner',
                headerStyle: {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: this.props.theme.color.textColor,
                    borderBottom: '1px solid ' + this.props.theme.color.borderColor,
                    background: this.props.theme.color.tableHeadColor,
                },
                cellStyle: {},
            },

            // mode: {
            //     title: 'Mode',
            //     field: 'mode',
            //     headerStyle: {
            //         textAlign: 'left',
            //         fontWeight: 'bold',
            //         color: this.props.theme.color.textColor,
            //         borderBottom: '1px solid ' + this.props.theme.color.borderColor,
            //         background: this.props.theme.color.tableHeadColor,
            //     },
            //     cellStyle: {},
            // },
            bettings: {
                title: 'Bettings',
                field: 'bet',
                headerStyle: {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: this.props.theme.color.textColor,
                    borderBottom: '1px solid ' + this.props.theme.color.borderColor,
                    background: this.props.theme.color.tableHeadColor,
                },
                cellStyle: {},
            },

            actions: {
                title: 'Actions',
                field: 'actions',
                headerStyle: {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: this.props.theme.color.textColor,
                    borderBottom: '1px solid ' + this.props.theme.color.borderColor,
                    background: this.props.theme.color.tableHeadColor,
                },
                cellStyle: {},
            },
        },
        options: {
            rowStyle: (x) => {
                if (x.tableData.id % 2) {
                    // return { background: this.props.theme.color.backgroundColor };
                }
            },
            paging: false,
            draggable: false,
            sorting: false,
            pageSize: 50,
            showFirstLastPageButtons: false,
            search: false,
            showTitle: true,
            toolbar: true,
            emptyRowsWhenPaging: false,
            headerStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                color: this.props.theme.color.textColor,
                boxSizing: 'border-box',
            },
            actionsColumnIndex: -1,
            actionsCellStyle: {
                color: '#3c8dbc',
                textAlign: 'center',
            },
            pageSizeOptions: [20, 40, 50, 100, 200],
            maxBodyHeight: 'calc(100vh - 385px)',
        },
    };

    selectMode = (item) => {
        try {
            this.setState({ mode: item.id });
        } catch {}
    };

    renderModal = () => {
        try {
            const { modal } = this.props;
            switch (modal) {
                case 'creatematch':
                    return <ModalCreateMatch mode={this.mode} />;

                default:
                    break;
            }
        } catch {}
    };

    renderTitle = () => {
        try {
            const { lang, modal } = this.props;
            switch (modal) {
                case 'creatematch':
                    return lang.createMatch;

                default:
                    break;
            }
        } catch {}
    };

    closeModal = () => {
        try {
            this.props.onUpdateModal?.('');
        } catch {}
    };

    onCreateMatchClicked = () => {
        try {
            this.props.onUpdateModal?.('creatematch');
        } catch {}
    };

    onJoinMatchClicked = (rowData) => {
        try {
            const { contract } = this.props.near;
            contract
                .joinMatch({
                    id: rowData.id,
                })
                .then((res) => {
                    if (res === rowData.id) {
                        this.props.onCaroUpdateCurrentMatch?.({ ...rowData });
                        this.props.onContentChildNavigation?.('detailmatch');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch {}
    };

    renderActions = (rowData) => {
        const { classes, lang } = this.props;
        return (
            <div className={classes.actions}>
                <button className={classes.actionJoin} onClick={() => this.onJoinMatchClicked(rowData)}>
                    {lang.join}
                </button>
                <button className={classes.actionBet}>{lang.bet}</button>
            </div>
        );
    };

    handleChangePage = (event, newPage) => {
        try {
            this.setState({ page: newPage });
        } catch {}
    };

    handleChangeRowsPerPage = (event) => {
        try {
            this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
        } catch {}
    };

    render() {
        const { classes, theme, lang } = this.props;
        const { mode, page, rowsPerPage } = this.state;
        return (
            <div className={classes.root}>
                <button className={classes.button} style={{ alignSelf: 'center', border: '2px solid ' + theme.color.borderColor }}>
                    {lang.questRewards}
                </button>
                <div className={classes.row}>
                    <div className={classes.half}>
                        <button className={classes.button + ' ' + classes.rsMarginL} onClick={this.onCreateMatchClicked}>
                            {lang.createMatch}
                        </button>
                        {/* <button className={classes.button}>{lang.autoMatch}</button> */}
                    </div>
                    <div className={classes.half + ' ' + classes.end}>
                        <button className={classes.button}>{lang.history}</button>
                        <button className={classes.button + ' ' + classes.rsMarginR}>{lang.topRank}</button>
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.text}>{lang.mode}</div>
                    {this.mode?.map?.((item, index) => {
                        return (
                            <button key={index} className={mode === item.id ? classes.buttonA : classes.button} onClick={() => this.selectMode?.(item)}>
                                {item.label}
                            </button>
                        );
                    })}
                </div>
                <div className={classes.tablez}>
                    <MaterialTable
                        columns={[
                            { ...this.tableProps.column.match },
                            { ...this.tableProps.column.time },
                            { ...this.tableProps.column.host },
                            // { ...this.tableProps.column.mode },
                            { ...this.tableProps.column.bettings },
                            { ...this.tableProps.column.actions, render: this.renderActions },
                        ]}
                        options={this.tableProps.options}
                        data={this.data}
                        title='List match'
                        style={{
                            height: 'calc(100vh - 320px)',
                            color: theme.color.textColor,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}
                    />
                    <div className={classes.pagination}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component='div'
                            count={this.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                    </div>
                </div>
                <Modal title={this.renderTitle?.()} closeModal={this.closeModal}>
                    {this.renderModal?.()}
                </Modal>
            </div>
        );
    }
}

const styles = (theme) => ({
    pagination: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& .MuiTablePagination-root, & .MuiTablePagination-selectIcon': {
            color: theme.color.textColor,
        },
    },
    rsMarginR: {
        marginRight: '0 !important',
    },
    rsMarginL: {
        marginLeft: '0 !important',
    },
    actionBet: {
        color: theme.color.colorBtn,
        background: theme.color.backgroundColor,
        padding: '5px 15px',
        marginLeft: 5,
        borderRadius: 15,
    },
    actionJoin: {
        color: theme.color.colorBtn,
        background: theme.color.backgroundColor,
        padding: '5px 15px',
        marginRight: 5,
        borderRadius: 15,
    },
    actions: {
        display: 'flex',
    },
    table: {
        width: '100%',
        borderSpacing: 0,
        '& th': {
            textAlign: 'left',
            padding: '15px 20px',
            borderBottom: '1px solid ' + theme.color.borderColor,
        },
        '& td': {
            textAlign: 'left',
            padding: '10px 20px',
        },
        '& tr:hover td': {
            background: theme.color.backgroundColor,
        },
    },
    tablez: {
        width: '100%',
        flex: 1,
        background: theme.color.backgroundColor,
        borderRadius: 15,
        margin: '16px 0',
        backdropFilter: 'blur(5px)',
    },
    text: {
        fontSize: 16,
        lineHeight: 1.2,
        marginRight: 10,
        padding: '0 20px',
    },
    end: {
        justifyContent: 'flex-end',
    },
    half: {
        flex: 1,
        display: 'flex',
    },
    row: {
        width: '100%',
        display: 'flex',
        margin: '10px 0',
        alignItems: 'center',
    },
    buttonA: {
        width: 'fit-content',
        height: 40,
        color: theme.color.colorBtnActive,
        background: theme.color.colorLinearGradient,
        padding: '0 20px',
        borderRadius: 15,
        cursor: 'pointer',
        fontSize: 16,
        margin: '0 10px',
        minWidth: 100,
    },
    button: {
        width: 'fit-content',
        height: 40,
        color: theme.color.colorBtn,
        background: theme.color.backgroundColor,
        padding: '0 20px',
        borderRadius: 15,
        cursor: 'pointer',
        fontSize: 16,
        margin: '0 10px',
        minWidth: 100,
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: theme.color.textColor,
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            contentHome: state.homeControl.content,
            modal: state.homeControl.modal,
            near: state.near,
        };
    },
    {
        onUpdateModal,
        onCaroUpdateCurrentMatch,
        onContentChildNavigation,
    },
)(withStyles(styles)(withTheme(Main)));
