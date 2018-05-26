import { connect } from 'react-redux'

import { default as Editor } from './Editor'
import {getCurrentFile, getFiles} from 'src/modules/file/selectors'
import { createFileRequest, removeFileRequest, changeFileRequest, writeFileRequest } from 'src/modules/file/actions'
import { IProps } from './types'

const mapState = state => ({
  files: getFiles(state),
  currentFile: getCurrentFile(state)
})

const mapDispatch = (dispatch, ownProps: IProps) => ({
  addFiles: name => dispatch(createFileRequest(name)),
  removeFiles: name => dispatch(removeFileRequest(name)),
  changeCurrentFile: name => dispatch(changeFileRequest(name)),
  onChange: (name, content) => dispatch(writeFileRequest(name, content))
})

export default connect(mapState, mapDispatch)(Editor)
