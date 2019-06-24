import React from 'react'
import { Container as Box, AppBar, Toolbar, Slide, Typography } from '@material-ui/core';
import CustomBottomNavigation from '../components/bottomNavigation';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24
    }
}

const HideOnScroll = ({children, window}) => {
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

const Container = (props) => {
    const {children} = props;
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6">해커톤 좋아요</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box style={styles.container} maxWidth="sm">
                {children}
            </Box>
        </React.Fragment>
    )
}

export default Container;