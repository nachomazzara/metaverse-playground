import { connect } from 'react-redux'

import { default as Editor } from './Editor'
import { getFiles } from 'src/modules/file/selectors'
import { createFileRequest, removeFileRequest, changeFileRequest } from 'src/modules/file/actions'

const mapState = state => ({
  files: getFiles(state)
})

const mapDispatch = dispatch => ({
  addFiles: name => dispatch(createFileRequest(name)),
  removeFiles: name => dispatch(removeFileRequest(name)),
  changeCurrentFile: name => dispatch(changeFileRequest(name))
})

export default connect(mapState, mapDispatch)(Editor)
