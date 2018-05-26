import * as React from 'react'
import Editor, { EditorLanguage } from './components/Editor'
import Preview from './components/Preview'
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
          <Editor content="asd" language={EditorLanguage.TS} />
          <Preview />
        </PanelGroup>
      </div>
    )
  }
}

export default App
