import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHomeControlNavigation } from '../../../redux/action';
import Caro from '../game/game';
// import Caro from '../trade/liquidity';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <Caro />
            </div>
        );
    }
}

const styles = (theme) => ({
    root: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
    },
});

export default connect(
    (state) => {
        return {
            lang: state.lang,
            contentHome: state.homeControl.content,
        };
    },
    {
        onHomeControlNavigation,
    },
)(withStyles(styles)(withTheme(Home)));
