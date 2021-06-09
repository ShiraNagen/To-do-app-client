
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header'
import Users from './users/Users'
import Tasks from './tasks/Tasks'


function App() {


  const styleContent = {  display: 'grid',
                          gridTemplateColumns: '1fr',
                          gridTemplateRows: '60px calc(100vh - 60px)'
                        }

  return (
    <div style={{display: 'grid'}}>
      <Header />
      <div style={styleContent}>

      <Router>
        <Switch>
          <Route path='/users' component={Users} />
          <Route path='/tasks' component={Tasks} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
