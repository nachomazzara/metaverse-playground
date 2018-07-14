import { connect } from 'react-redux'

import { default as Editor } from './Editor'
import { getCurrentFile, getFiles } from 'src/modules/file/selectors'
import { removeFileRequest, changeFileRequest, writeFileRequest } from 'src/modules/file/actions'
import { IProps } from './types'

const mapState = state => ({
  files: getFiles(state),
  currentFile: getCurrentFile(state)
})

const mapDispatch = (dispatch, ownProps: IProps) => ({
  removeFiles: path => dispatch(removeFileRequest(path)),
  changeCurrentFile: path => dispatch(changeFileRequest(path)),
  onChange: (path, raw) => dispatch(writeFileRequest(path, raw))
})

export default connect(mapState, mapDispatch)(Editor)
