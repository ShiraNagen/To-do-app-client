import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function Header(props) {
    const [value] = useState(() => {
        return (window.location.pathname === '/tasks') ? 0 :
            (window.location.pathname === '/users') ? 1 :
            -1
    });

    // const handleChange =
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Things to do:
                    </Typography>
                    <Tabs value={value}>
                        <Tab label="Tasks" onClick={() => window.location = '/tasks'} />
                        <Tab label="Users" onClick={() => window.location = '/users'} />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;