import * as React from 'react'
import { IProps } from './types'
import Monaco from 'src/components/Monaco'
import EditorTabs from './EditorTabs'
import { debounce } from 'src/modules/common/utils'
import './Editor.css'

class Editor extends React.PureComponent<IProps, { original: string, transpiled: string }> {
  private editor: monaco.editor.IStandaloneCodeEditor
  private debouncedOnChange: () => void

  constructor(props: any) {
    super(props)
    this.state = {
      original: props.files[props.currentFile].content,
      transpiled : props.files[props.currentFile].content
    }
  }

  componentDidMount() {
    this.debouncedOnChange = debounce(() =>
      this.props.onChange(this.props.currentFile, this.state.transpiled), 500)
  }

 /* UNSAFE_componentWillReceiveProps(props) {
    if (this.props.currentFile != props.currentFile) {
      this.setState({ value: props.files[props.currentFile].content })
    }
  }*/

  handleEditorCreated = (editor: monaco.editor.IStandaloneCodeEditor) => {
    this.editor = editor
  }

  getTypescriptService() {
    return monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(this.editor.getModel().uri))
  }

  handleChange = async (val: string): Promise<boolean | void> => {
    let content = val
    this.setState({ original: val, transpiled: content })
    this.debouncedOnChange()
  }

  render() {
    const { files, currentFile, addFiles, removeFiles, changeCurrentFile, language } = this.props
    const { original: value } = this.state

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
          value={value}
          onEditorCreated={this.handleEditorCreated}
          onChange={this.handleChange}
        />
      </React.Fragment>
    )
  }
}

export default Editor
