import { connect } from 'react-redux'

import { default as Editor } from './Editor'
import { getFiles } from 'src/modules/file/selectors'
import { createFileRequest, removeFileRequest } from 'src/modules/file/actions'
import { IProps } from './types'

function writeFile(val: string) {
  console.log('written', val)
}

const mapState = state => ({
  files: getFiles(state)
})

const mapDispatch = (dispatch, ownProps: IProps) => ({
  addFiles: name => dispatch(createFileRequest(name)),
  removeFiles: name => dispatch(removeFileRequest(name)),
  onChange: value => writeFile(value)
})

export default connect(mapState, mapDispatch)(Editor)
