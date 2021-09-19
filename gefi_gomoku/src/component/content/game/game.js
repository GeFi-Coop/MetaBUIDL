import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import { onHomeControlNavigation } from '../../../redux/action';
import Caro from './caro/caro';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderContent = () => {
        try {
            const { contentHome } = this.props;
            switch (contentHome) {
                case 'caro':
                    return <Caro />;

                default:
                    break;
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
        height: '100%',
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
)(withStyles(styles)(withTheme(Game)));
