import * as React from 'react'
import { IProps, EditorLanguage } from './types'
import Monaco from 'src/components/Monaco'
import EditorTabs from './EditorTabs'
import './Editor.css'

class Editor extends React.PureComponent<IProps> {
  private editor: monaco.editor.IStandaloneCodeEditor

  handleEditorCreated = (editor: monaco.editor.IStandaloneCodeEditor) => {
    this.editor = editor
  }

  getTypescriptService() {
    return monaco.languages.typescript.getTypeScriptWorker().then(worker => worker(this.editor.getModel().uri))
  }

  handleChange = (val: string) => {
    this.props.onChange(this.props.currentFile, val)

    if (this.props.language === EditorLanguage.TS) {
      this.getTypescriptService()
        .then(service => {
          return service.getEmitOutput(this.editor.getModel().uri.toString())
        })
        .then((result: any) => {
          if (result.emitSkipped) {
            return false
          }

          if (!result.outputFiles || !result.outputFiles[0]) {
            return false
          }

          return result.outputFiles[0].text
        })
        .then(text => {
          if (typeof text === 'string') {
            console.log('transpiled:', text)
          }
        })
    }
  }

  render() {
    const { files, currentFile, addFiles, removeFiles, changeCurrentFile, language } = this.props

    return (
      <React.Fragment>
        <EditorTabs files={files} handlerAdd={addFiles} handlerRemove={removeFiles} handlerCurrentFile={changeCurrentFile} />
        <Monaco language={language} className="editor-wrapper" value={files[currentFile].content} onEditorCreated={this.handleEditorCreated} onChange={this.handleChange} />
      </React.Fragment>
    )
  }
}

export default Editor
