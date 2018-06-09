import * as React from 'react'
import { IProps } from './types'
import Monaco from 'src/components/Monaco'
import EditorTabs from './EditorTabs'
import { debounce } from 'src/modules/common/utils'
import './Editor.css'

class Editor extends React.PureComponent<IProps, { val: string }> {
  private editor: monaco.editor.IStandaloneCodeEditor
  private debouncedOnChange: () => void

  constructor(props: any) {
    super(props)
    this.state = { val: props.files[props.currentFile].raw }
  }

  componentDidMount() {
    this.debouncedOnChange = debounce(() => this.props.onChange(this.props.currentFile, this.state.val), 500)
  }

  handleEditorCreated = (editor: monaco.editor.IStandaloneCodeEditor) => {
    this.editor = editor
  }

  getTypescriptService() {
    return monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(this.editor.getModel().uri))
  }

  handleChange = async (val: string): Promise<boolean | void> => {
    this.setState({ val: val })
    this.debouncedOnChange()
  }

  render() {
    const { files, currentFile, addFiles, removeFiles, changeCurrentFile, language } = this.props
    const { val } = this.state

    return (
      <React.Fragment>
        <EditorTabs
          files={files}
          currentFile={currentFile}
          handlerAdd={addFiles}
          handlerRemove={removeFiles}
          handlerCurrentFile={changeCurrentFile}
        />
        <Monaco
          language={language}
          className="editor-wrapper"
          value={val}
          onEditorCreated={this.handleEditorCreated}
          onChange={this.handleChange}
        />
      </React.Fragment>
    )
  }
}

export default Editor
