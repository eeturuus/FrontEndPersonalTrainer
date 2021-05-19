import './App.css';
import React, { useState, useEffect } from 'react';
import Traininglist from './components/Traininglist';
import Customers from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import TrainingCalendar from './components/TrainingCalendar';


function App() {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabs = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
              Personal Trainer
            </Typography>
            <Tabs value={selectedTab}
          onChange={handleTabs}
          aria-label="simple tabs example">
            <Tab label="Trainings" />
            <Tab label="Customers" />
            <Tab label="Training Calendar" />
          </Tabs>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <Traininglist /> }
      {selectedTab === 1 && <Customerlist />}
      {selectedTab === 2 && <TrainingCalendar />}
    </div>
  );
}

export default App;
