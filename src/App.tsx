import * as React from 'react'
import PanelGroup from 'react-panelgroup'
import './App.css'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <PanelGroup borderColor="grey">
          <div>{'panel 1'}</div>
          <div>{'panel 2'}</div>
        </PanelGroup>
      </div>
    )
  }
}

export default App
