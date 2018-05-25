import * as React from 'react'

export default class EditorTabs extends React.PureComponent<{
  files: object
  handlerAdd: Function
  handlerRemove: Function
}> {
  render() {
    const { files, handlerRemove } = this.props

    return (
      <div>
        {Object.keys(files).map(key => (
          <a onClick={() => handlerRemove(files[key].name)} key={files[key].name}>
            {files[key].name}
          </a>
        ))}
      </div>
    )
  }
}
