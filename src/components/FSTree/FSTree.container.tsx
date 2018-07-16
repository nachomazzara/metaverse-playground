import { connect } from 'react-redux'

import { getFilesTree } from 'src/modules/file/selectors'
import { changeFileRequest, writeFileRequest } from 'src/modules/file/actions'
import FSTree from './FSTree'

const mapState = state => {
  return {
    filesTree: getFilesTree(state),
  }
}

const mapDispatch = (dispatch) => ({
  changeCurrentFile: path => dispatch(changeFileRequest(path)),
  handlerAddFile: path => dispatch(writeFileRequest(path, ''))
})

export default connect(mapState, mapDispatch)(FSTree)