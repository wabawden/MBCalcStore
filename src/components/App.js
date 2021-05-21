import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'


import StandardCalculator from './StandardCalculator';
import SideMenu from './SideMenu';
import CalcShow from './CalcShow';



const App = () => {
  return (
    <div>

        
      <BrowserRouter>
                <div className="d-flex">
                  <div className="side-menu">
                    <h1>MBCalcStore</h1>
                    <SideMenu />
                  </div>
            <div className="right-content">
                <Route path="/" exact component={StandardCalculator} />
                <Route path="/standard/:id" exact component={CalcShow} />
            </div>
          </div>
      </BrowserRouter>
        

    </div>
  );
}

export default App;