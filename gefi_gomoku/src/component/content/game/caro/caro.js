import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';
import Main from './main';
import DetailMatch from './detailmatch';

class Caro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderContent = () => {
        try {
            const { contentChild } = this.props;
            switch (contentChild) {
                case 'main':
                    return <Main />;
                case 'detailmatch':
                    return <DetailMatch />;

                default:
                    return <Main />;
            }
        } catch {}
    };

    render() {
        return this.renderContent?.();
    }
}

const styles = (theme) => ({
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
            contentChild: state.homeControl.contentChild,
        };
    }
)(withStyles(styles)(withTheme(Caro)));
