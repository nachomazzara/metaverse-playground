import * as React from 'react'

import './EditorTabs.css'

export default class EditorTabs extends React.PureComponent<{
  files: object
  handlerAdd: (path: string, value: string) => void
  handlerRemove: (path: string) => void
  handlerCurrentFile: (path: string) => void,
  currentFile: string,
}> {
  state = { fileName: '' }

  render() {
    const { files, currentFile, handlerRemove, handlerAdd, handlerCurrentFile } = this.props

    return (
      <div className="tabs-container">
        {Object.keys(files).map(key => (
          <React.Fragment key={files[key].name}>
            <a className={currentFile === key && 'active'}
               onClick={() => handlerCurrentFile(files[key].path)}>{files[key].name}</a>
            <a onClick={() => handlerRemove(files[key].path)} >
              {'X'}
            </a>
          </React.Fragment>
        ))}
        <input type={'text'}
               onChange={e => this.setState({ fileName: e.target.value })}
               value={this.state.fileName}
               />
        <a onClick={() => handlerAdd(this.state.fileName, '')}
           >{'+ Add File'}</a>
      </div>
    )
  }
}
