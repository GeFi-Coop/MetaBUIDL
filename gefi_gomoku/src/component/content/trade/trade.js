import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHomeControlNavigation } from '../../../redux/action';
import Exchange from './exchange';
import Liquidity from './liquidity';

class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderContent = () => {
        try {
            const { contentHome } = this.props;
            switch (contentHome) {
                case 'exchange':
                    return <Exchange />;
                case 'liquidity':
                    return <Liquidity />;

                default:
                    return <Exchange />;
            }
        } catch {}
    };

    render() {
        const { classes, theme } = this.props;
        return <div className={classes.root}>{this.renderContent?.()}</div>;
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
)(withStyles(styles)(withTheme(Trade)));
