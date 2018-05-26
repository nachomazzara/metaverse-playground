import * as React from 'react'
import { IProps, EditorLanguage } from './types'
import Monaco from 'src/components/Monaco'
import EditorTabs from './EditorTabs'
import { debounce } from 'src/modules/common/utils'
import './Editor.css'

class Editor extends React.PureComponent<IProps, { value: string }> {
  private editor: monaco.editor.IStandaloneCodeEditor
  private debouncedOnChange: () => void

  constructor(props: any) {
    super(props)
    this.state = { value: props.files[props.currentFile].content }
  }


  componentDidMount() {
    this.debouncedOnChange = debounce(() =>
      this.props.onChange(
        this.props.currentFile, this.state.value
      ), 500)
  }

  handleEditorCreated = (editor: monaco.editor.IStandaloneCodeEditor) => {
    this.editor = editor
  }

  getTypescriptService() {
    return monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(this.editor.getModel().uri))
  }

  handleChange = async (val: string): Promise<boolean | void> => {
    let content = val
    if (this.props.language === EditorLanguage.TS) {
      const service = await this.getTypescriptService()
      const result =  service.getEmitOutput(this.editor.getModel().uri.toString())
      if (result.emitSkipped) {
        return false
      }

      if (!result.outputFiles || !result.outputFiles[0]) {
        return false
      }

      const text = await result.outputFiles[0].text
      if (typeof text === 'string') {
        console.log('transpiled:', text)
        content = text
      }
    }
    this.setState({ value: content })
    this.debouncedOnChange()
  }

  render() {
    const { files, addFiles, removeFiles, changeCurrentFile, language } = this.props
    const { value } = this.state

    return (
      <React.Fragment>
        <EditorTabs files={files} handlerAdd={addFiles} handlerRemove={removeFiles} handlerCurrentFile={changeCurrentFile} />
        <Monaco language={language} className="editor-wrapper" value={value} onEditorCreated={this.handleEditorCreated} onChange={this.handleChange} />
      </React.Fragment>
    )
  }
}

export default Editor
