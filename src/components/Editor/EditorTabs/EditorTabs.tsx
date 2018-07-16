import * as React from 'react'

import './EditorTabs.css'

export default class EditorTabs extends React.PureComponent<{
  files: object
  handlerAdd: (path: string, value: string) => void
  handlerRemove: (path: string) => void
  handlerCurrentFile: (path: string) => void
  currentFile: string
}> {
  state = { fileName: '' }

  render() {
    const { currentFile } = this.props

    return (
      <div className="tabs-container">
        <a className={'active'}>{ currentFile }</a>
        ))}
      </div>
    )
  }
}
