import React, { Fragment } from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onContentNavigation, onHideContentNavigation, onHomeControlNavigation } from '../../redux/action';

class Navigation extends React.Component {
    data = [];
    constructor(props) {
        super(props);
        this.state = {
            subMenuA: null,
            openSubMenu: null,
            isUpdateView: false,
        };
    }

    componentDidMount() {
        const { theme, lang } = this.props;
        const menu = [
            {
                iconA: theme.images.homeA,
                icon: theme.images.home,
                label: lang.home,
                key: 'home',
                subMenu: [],
            },
            {
                iconA: theme.images.transferA,
                icon: theme.images.transfer,
                label: lang.trade,
                key: 'trade',
                subMenu: [
                    {
                        iconA: theme.images.dotSildeActive,
                        icon: theme.images.dotSlideDeactive,
                        label: lang.exchange,
                        key: 'exchange',
                        subMenu: [],
                    },
                    {
                        iconA: theme.images.dotSildeActive,
                        icon: theme.images.dotSlideDeactive,
                        label: lang.liquidity,
                        key: 'liquidity',
                        subMenu: [],
                    },
                ],
            },
            {
                iconA: theme.images.gameA,
                icon: theme.images.game,
                label: lang.chess,
                key: 'chess',
                subMenu: [
                    {
                        iconA: theme.images.dotSildeActive,
                        icon: theme.images.dotSlideDeactive,
                        label: 'Caro',
                        key: 'caro',
                        subMenu: [],
                    },
                ],
            },
            {
                iconA: theme.images.userA,
                icon: theme.images.user,
                label: lang.yourProfile,
                key: 'profile',
                subMenu: [],
            },
        ];

        this.data = [...menu];
        this.onHomeControlClicked?.(this.data[0]);
        this.setState({ isUpdateView: !this.state.isUpdateView });
    }

    componentDidUpdate(prevProps) {
        try {
            const { hideNavigation } = this.props;
            const { subMenuA } = this.state;
            if (prevProps.hideNavigation !== hideNavigation && hideNavigation) {
                this.setState({ openSubMenu: null });
            }
            if (prevProps.hideNavigation !== hideNavigation && !hideNavigation && subMenuA) {
                const newStr = subMenuA.substring?.(0, subMenuA.length - 7);
                this.setState({ openSubMenu: newStr + 'open' });
            }
        } catch {}
    }

    onHomeControlClicked = (item, index) => {
        try {
            if (item && typeof item !== 'undefined') {
                if (item.subMenu && item.subMenu.length > 0) {
                    this.props.onHideContentNavigation?.(false);
                    this.setState({ openSubMenu: this.state.openSubMenu === item.key + 'open' ? null : item.key + 'open', mainMenuIndex: index });
                } else {
                    this.setState({ subMenuA: null, openSubMenu: null });
                    this.props.onContentNavigation(item.key);
                    this.props.onHomeControlNavigation(null);
                }
            }
        } catch {}
    };

    onSubMenuClicked = (item, subMenu) => {
        try {
            this.setState({ openSubMenu: item.key + 'open', subMenuA: item.key + 'subMenu' });
            this.props.onContentNavigation(item.key);
            this.props.onHomeControlNavigation(subMenu.key);
        } catch {}
    };

    render() {
        const { classes, hideNavigation, theme, content, contentHome, contentChild } = this.props;
        return (
            <div
                className={classes.root}
                style={{
                    width: hideNavigation ? 70 : 200,
                    pointerEvents: contentHome === 'caro' && contentChild === 'detailmatch' ? 'none' : null,
                    opacity: contentHome === 'caro' && contentChild === 'detailmatch' ? 0.6 : 1,
                }}>
                <div className={classes.layoutLogo}>
                    <img src={theme.images.logo} className={classes.logo} alt='' />
                </div>
                <div className={classes.nav}>
                    <div className={classes.content}>
                        {this.data &&
                            this.data.length !== 0 &&
                            this.data.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className={classes.row} onClick={() => this.onHomeControlClicked(item, index)}>
                                            <div
                                                className={classes.bgRow}
                                                style={
                                                    content === item.key || this.state.subMenuA === item.key + 'subMenu'
                                                        ? {
                                                              width: hideNavigation ? 50 : '100%',
                                                              background: theme.color.backgroundColor,
                                                          }
                                                        : {
                                                              width: hideNavigation ? 50 : '100%',
                                                          }
                                                }>
                                                <div
                                                    className={classes.iconz}
                                                    style={
                                                        content === item.key || this.state.subMenuA === item.key + 'subMenu'
                                                            ? { background: theme.color.colorLinearGradient }
                                                            : { background: theme.color.backgroundColor }
                                                    }>
                                                    <img
                                                        src={content === item.key || this.state.subMenuA === item.key + 'subMenu' ? item.iconA : item.icon}
                                                        className={classes.icon}
                                                        alt=''
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        content === item.key || this.state.subMenuA === item.key + 'subMenu' ? classes.textA : classes.text
                                                    }>
                                                    {item && item.label}
                                                </div>
                                            </div>
                                            {item.subMenu && item.subMenu.length > 0 && (
                                                <div
                                                    className={classes.iconRight}
                                                    style={{ transform: this.state.openSubMenu === item.key + 'open' ? 'rotateZ(90deg)' : 'rotateZ(0deg)' }}>
                                                    <img src={theme.images.right} className={classes.iconArrow} alt='' />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={classes.itemz}
                                            style={{
                                                height:
                                                    item.subMenu && item.subMenu.length > 0 && this.state.openSubMenu === item.key + 'open'
                                                        ? item.subMenu.length * 60
                                                        : 0,
                                            }}>
                                            <div className={classes.lineVertical} />
                                            {item.subMenu.map((subMenu, ind) => {
                                                return (
                                                    <NavigationItems
                                                        subMenu={subMenu}
                                                        key={ind}
                                                        content={content}
                                                        item={item}
                                                        onSubMenuClicked={this.onSubMenuClicked}
                                                        isShowSubNav={this.state.mainMenuIndex === index}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </Fragment>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

class NavigationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, theme, item, subMenu, contentHome } = this.props;
        return (
            <Fragment>
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 0, animation: 'slideBottom 0.3s' }}>
                    <div
                        className={classes.row}
                        onClick={() => {
                            this.setState({ isShowSubMenu: !this.state.isShowSubMenu });
                            this.props.onSubMenuClicked(item, subMenu);
                        }}>
                        <div
                            style={{
                                background: contentHome === subMenu.key ? theme.color.colorLinearGradient : theme.color.textColorInactive,
                                marginLeft: 30,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                            }}
                        />
                        <div className={contentHome === subMenu.key ? classes.subTextA : classes.subText}>{subMenu && subMenu.label}</div>
                    </div>
                    {(this.state.isShowSubMenu || this.props.isShowSubMenu) &&
                        typeof subMenu.subMenu !== 'undefined' &&
                        subMenu.subMenu.length > 0 &&
                        subMenu.subMenu.map((subMenu, index) => {
                            return (
                                <NavigationItems
                                    key={index}
                                    contentHome={contentHome}
                                    subMenu={subMenu}
                                    item={item}
                                    onSubMenuClicked={this.props.onSubMenuClicked}
                                />
                            );
                        })}
                </div>
            </Fragment>
        );
    }
}

const styles = (theme) => ({
    bgRow: {
        height: '100%',
        position: 'absolute',
        left: 0,
        zIndex: -1,
        borderRadius: 15,
        transition: 'width 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    itemz: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
    },
    iconArrow: {
        width: 12,
        height: 12,
    },
    iconz: {
        width: 30,
        height: 30,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 10px',
        minWidth: 30,
    },
    lineVertical: {
        width: 2,
        height: '80%',
        background: theme.color.colorLinearGradient,
        position: 'absolute',
        top: '10%',
        left: 10,
        borderRadius: 2,
        opacity: 0.8,
    },
    iconRight: {
        position: 'absolute',
        right: 10,
        transition: 'transform 0.5s',
    },
    dot: {
        width: 12,
        height: 12,
        marginLeft: 30,
    },
    subText: {
        fontSize: 14,
        lineHeight: '18px',
        color: theme.color.textColorInactive,
        marginLeft: 8,
    },
    subTextA: {
        fontSize: 14,
        lineHeight: '18px',
        color: theme.color.textColor,
        marginLeft: 8,
        fontFamily: theme.font.fontMedium,
    },
    text: {
        fontSize: 16,
        lineHeight: '20px',
        color: theme.color.textColorInactive,
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    textA: {
        fontSize: 16,
        lineHeight: '20px',
        color: theme.color.textColor,
        fontFamily: theme.font.fontMedium,
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    icon: {
        width: 16,
        height: 16,
    },
    line: {
        width: 5,
        height: '100%',
    },
    lineA: {
        width: 10,
        height: '100%',
        background: theme.color.colorLinearGradient,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    row: {
        width: '100%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            // background: theme.color.backgroundColor,
        },
        '&:hover div': {
            color: theme.color.textColor,
        },
        margin: '5px 0',
        borderRadius: 15,
        userSelect: 'none',
        overflow: 'hidden',
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '5%',
    },
    logo: {
        width: 40,
        height: 40,
    },
    layoutLogo: {
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.5s',
        overflow: 'hidden',
    },
    logOut: {
        width: 180,
        height: 60,
        color: theme.color.textColor,
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    nav: {
        flex: 1,
        width: 180,
        margin: '0 10px',
    },
    root: {
        height: 'inherit',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.color.backgroundColor,
        transition: 'width 0.5s',
        overflow: 'hidden',
        zIndex: 2,
        backdropFilter: 'blur(5px)',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        position: 'absolute',
        left: 0,
        top: 0,
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            hideNavigation: state.homeControl.hideNavigation,
            content: state.contentNavigation.content,
            contentHome: state.homeControl.content,
            contentChild: state.homeControl.contentChild,
        };
    },
    {
        onContentNavigation,
        onHideContentNavigation,
        onHomeControlNavigation,
    },
)(withStyles(styles)(withTheme(Navigation)));

const NavigationItems = connect((state) => {
    return {
        contentHome: state.homeControl.content,
    };
})(withStyles(styles)(withTheme(NavigationItem)));
