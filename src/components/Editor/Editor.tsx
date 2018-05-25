import * as React from 'react'
import { IProps } from './types'
import { Monaco } from 'src/components'
import './Editor.css'

class Editor extends React.PureComponent<IProps> {
  render() {
    return <Monaco className="editor-wrapper" />
  }
}

export default Editor
