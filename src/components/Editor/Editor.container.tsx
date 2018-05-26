import { connect } from 'react-redux'

import { default as Editor } from './Editor'
import { getFiles } from 'src/modules/file/selectors'
import { createFileRequest, removeFileRequest, changeFileRequest, writeFileRequest } from 'src/modules/file/actions'

const mapState = state => ({
  files: getFiles(state)
})

const mapDispatch = dispatch => ({
  addFiles: name => dispatch(createFileRequest(name)),
  writeFiles: name => dispatch(writeFileRequest(name)),
  removeFiles: name => dispatch(removeFileRequest(name)),
  changeCurrentFile: name => dispatch(changeFileRequest(name)),
  writeFile: name => dispatch(writeFileRequest(name))
})

export default connect(mapState, mapDispatch)(Editor)
