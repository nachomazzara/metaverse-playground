import * as React from 'react'
import { connect } from 'react-redux'

import Editor, { EditorLanguage } from './components/Editor'
import Preview from './components/Preview'
import PanelGroup from 'react-panelgroup'
import './App.css'
import { getFilesTree } from './modules/file/selectors'
import Tree from 'react-ui-tree'
import {changeFileRequest} from './modules/file/actions'

class App extends React.Component<{ filesTree: any, changeCurrentFile: (path: string) => void }> {

  constructor(props: any) {
    super(props)
  }

  handleResize = () => {
    // check Monaco component for more info
    window.dispatchEvent(new Event('FORCE_MONACO_UPDATE'))
  }

  render() {
    return (
      <div className="App">
        <PanelGroup borderColor="grey" onUpdate={this.handleResize}>
          <Tree
            paddingLeft={20}              // left padding for children nodes in pixels
            tree={this.props.filesTree}        // tree object
            renderNode={node => {
              return (
                <span
                  className={''}
                  onClick={e => this.props.changeCurrentFile(node.module)}
                >
        {node.module}
      </span>
              )
            }}
          />
          <Editor language={EditorLanguage.TS} />
          <Preview />
        </PanelGroup>
      </div>
    )
  }
}

const mapState = state => ({
  filesTree: getFilesTree(state),
})

const mapDispatch = (dispatch) => ({
  changeCurrentFile: path => dispatch(changeFileRequest(path)),
})

export default connect(mapState, mapDispatch)(App)

