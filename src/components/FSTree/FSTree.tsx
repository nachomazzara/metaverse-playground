import * as React from 'react'
import Tree from 'react-ui-tree'

import { IProps } from './types'
import './FSTree.css'

class FSTree extends React.PureComponent<IProps> {
  // componentDidUpdate () {
  //
  // }
  renderNode(node) {
    const { changeCurrentFile, handlerAddFile } = this.props
    const isDirectory = !!node.children
    return (
      <React.Fragment>
        {isDirectory && <i className={'down'} />}
        <span className={''} onClick={() => (!isDirectory ? changeCurrentFile(node.module) : null)}>
          {node.module}
        </span>
        {isDirectory && (
          <button onClick={() => handlerAddFile('untitled', '')} className={'add-file'}>
            {'+'}
          </button>
        )}
      </React.Fragment>
    )
  }

  render() {
    const { filesTree } = this.props
    return (
      <div className={'tree-wrapper'}>
        <Tree paddingLeft={20} tree={filesTree} renderNode={this.renderNode.bind(this)} />
      </div>
    )
  }
}

export default FSTree
