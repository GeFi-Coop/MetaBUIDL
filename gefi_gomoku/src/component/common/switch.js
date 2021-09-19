import React from 'react';
import withStyles, { withTheme } from 'react-jss';

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onOff: this.props.active,
        };
    }

    onToggle = () => {
        try {
            this.setState({ onOff: !this.state.onOff }, () => {
                this.props.onChange?.(this.state.onOff);
            });
        } catch {}
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={this.state.onOff ? classes.contentActive : classes.content} onClick={this.onToggle}>
                    <div className={this.state.onOff ? classes.switchActive : classes.switch} />
                </div>
            </div>
        );
    }
}

const styles = (theme) => ({
    root: (props) => {
        return {
            width: 50,
            height: 24,
            ...props.style,
        };
    },
    content: {
        width: '100%',
        height: '100%',
        background: theme.color.inactiveColor,
        borderRadius: 12,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '.3s ease all',
    },
    contentActive: {
        width: '100%',
        height: '100%',
        background: '#00cc44',
        borderRadius: 12,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '.3s ease all',
    },
    switch: (props) => {
        return {
            width: props.style?.height - 6 ?? 18,
            height: props.style?.height - 6 ?? 18,
            borderRadius: '50%',
            background: '#fff',
            position: 'absolute',
            left: 3,
            transition: '.3s ease all',
            boxShadow: 'rgb(0 0 0) 0 0 5px 0',
        };
    },
    switchActive: (props) => {
        return {
            width: props.style?.height - 6 ?? 18,
            height: props.style?.height - 6 ?? 18,
            borderRadius: '50%',
            background: '#fff',
            position: 'absolute',
            left: props.style?.height ? `calc(100% - ${props.style?.height - 3}px)` : 'calc(100% - 21px)',
            transition: '.3s ease all',
            boxShadow: 'rgb(0 0 0) 0 0 5px 0',
        };
    },
});

export default withStyles(styles)(withTheme(Switch));
