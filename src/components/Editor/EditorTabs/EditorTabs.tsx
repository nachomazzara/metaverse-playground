import * as React from 'react'

import './EditorTabs.css'

export default class EditorTabs extends React.PureComponent<{
  files: object
  handlerAdd: (name: string) => void
  handlerRemove: (name: string) => void,
  handlerCurrentFile: (name: string) => void
}> {

  state = { fileName: '' }

  render() {
    const { files, handlerRemove, handlerAdd, handlerCurrentFile } = this.props

    return (
      <div className='tabs-container'>
        {Object.keys(files).map(key => (
          <React.Fragment key={files[key].name}>
            <a onClick={() => handlerCurrentFile(files[key].name)}>
              {files[key].name}
            </a>
            <a onClick={() => handlerRemove(files[key].name)} style={{'display': 'none'}}>
              {'X'}
            </a>
          </React.Fragment>
        ))}
        <input type={'text'} onChange={e => this.setState({ fileName: e.target.value })} value={this.state.fileName}/>
        <a onClick={() => handlerAdd(this.state.fileName)}>
          {'+ Add File'}
        </a>
      </div>
    )
  }
}
