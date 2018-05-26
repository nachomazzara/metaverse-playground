import * as React from 'react'
import { IProps } from './types'
import Monaco from 'src/components/Monaco'
import EditorTabs from './EditorTabs'
import './Editor.css'

class Editor extends React.PureComponent<IProps> {
  render() {
    const { files, addFiles, removeFiles, changeCurrentFile } = this.props

    return (
      <React.Fragment>
        <EditorTabs files={files} handlerAdd={addFiles} handlerRemove={removeFiles} handlerCurrentFile={changeCurrentFile} />
        <Monaco className="editor-wrapper"  />
      </React.Fragment>
    )
  }
}

export default Editor
