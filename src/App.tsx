import * as React from 'react'
import { Editor } from './components'
import PanelGroup from 'react-panelgroup'
import './App.css'

class App extends React.Component {
  handleResize = () => {
    // check Monaco component for more info
    window.dispatchEvent(new Event('FORCE_MONACO_UPDATE'))
  }

  render() {
    return (
      <div className="App">
        <PanelGroup borderColor="grey" onUpdate={this.handleResize}>
          <Editor content="asd" />
          <div>{'panel 2'}</div>
        </PanelGroup>
      </div>
    )
  }
}

export default App
