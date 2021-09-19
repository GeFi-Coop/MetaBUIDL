import React from 'react';
import withStyles, { withTheme } from 'react-jss';
import { connect } from 'react-redux';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
        };
    }
    timeOut = -1;

    componentWillUnmount() {
        try {
            if (this.timeOut !== -1) {
                clearTimeout(this.timeOut);
            }
        } catch {}
    }

    closeModal = () => {
        try {
            this.setState({ hide: true }, () => {
                this.timeOut = setTimeout(() => {
                    this.props.closeModal?.();
                    this.setState({ hide: false });
                }, 200);
            });
        } catch {}
    };

    render() {
        const { classes, theme, title } = this.props;
        if (typeof this.props.children !== 'undefined') {
            return (
                <div className={classes.modal}>
                    <div
                        className={classes.bgModal}
                        style={this.state.hide ? { animation: 'opacityOut .2s linear', opacity: 0 } : null}
                        onClick={this.closeModal}
                    />
                    <div className={classes.content} style={this.state.hide ? { animation: 'scaleOutCenter .2s linear', transform: 'scaleY(0)' } : null}>
                        <div className={classes.header}>
                            <div className={classes.title}>{title}</div>
                            <img src={theme.images.close} className={classes.icon} onClick={this.closeModal} alt='' />
                        </div>
                        {React.cloneElement(this.props.children, { onCloseAnimate: this.closeModal })}
                    </div>
                </div>
            );
        }
        return null;
    }
}

const styles = (theme) => ({
    title: {
        fontSize: 18,
        color: theme.color.textColor,
    },
    icon: {
        width: 16,
        height: 16,
        cursor: 'pointer',
    },
    header: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid ' + theme.color.borderColor,
        marginBottom: 10,
    },
    content: (props) => {
        return {
            width: 'max-content',
            height: 'max-content',
            background: theme.color.backgroundColor,
            borderRadius: 30,
            padding: '8px 24px',
            transition: 'width 0.3s',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            animation: 'scaleCenter .2s linear',
            ...props.style,
        };
    },
    bgModal: {
        width: '100%',
        height: '100%',
        background: theme.color.bgModal,
        backdropFilter: 'blur(15px)',
        position: 'absolute',
        zIndex: 1,
        animation: 'opacityIn .2s linear',
    },
    modal: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect((state) => {
    return {
        lang: state.lang,
    };
})(withStyles(styles)(withTheme(Modal)));
