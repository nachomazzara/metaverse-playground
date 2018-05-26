/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
import * as React from 'react'
import { IProps } from './types'

declare var window

class MonacoEditor extends React.Component<IProps> {
  __prevent_trigger_change_event: boolean
  editor: monaco.editor.IStandaloneCodeEditor
  oldDecorations: string[] = []
  containerElement: HTMLElement

  static defaultProps: IProps = {
    value: '',
    language: 'xml',
    theme: 'vs-dark',
    options: {},
    onChange: () => {},
    className: ''
  }

  constructor(props: IProps) {
    super(props)
    this.__prevent_trigger_change_event = true

    // Force update and rerender monaco editor to update the editor's dimensions
    // https://github.com/Microsoft/monaco-editor/issues/28#issuecomment-228523529
    window.addEventListener('FORCE_MONACO_UPDATE', this.handleForceUpdate)
    window.addEventListener('MONACO_LOADED', this.monacoDidMount)
  }

  handleForceUpdate = () => this.forceUpdate()

  gotComponent = (e: HTMLElement) => {
    if (e) this.containerElement = e
  }

  componentWillUnmount() {
    window.removeEventListener('FORCE_MONACO_UPDATE', this.handleForceUpdate)
    window.removeEventListener('MONACO_LOADED', this.monacoDidMount)
    this.destroyMonaco()
  }

  monacoDidMount = () => {
    this.initMonaco()
  }

  editorDidMount() {
    const { onChange } = this.props

    this.editor.onDidChangeModelContent(event => {
      const value = this.editor.getValue()
      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        onChange(value, event)
      }
    })
  }

  initMonaco() {
    let { language, options, value } = this.props

    options = {
      language: language,
      theme: 'vs-dark',
      wordWrap: 'on',
      lineNumbersMinChars: 2,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: true
      },
      folding: true,
      ...options
    }

    if (typeof monaco !== 'undefined' && !this.editor) {
      this.editor = monaco.editor.create(this.containerElement, options)
      this.editorDidMount()
      if (this.props.onEditorCreated) this.props.onEditorCreated(this.editor)
      this.__prevent_trigger_change_event = true
      this.setState({ ...this.state }) // investigate why this is necesary
      this.editor.setValue(value)
      this.__prevent_trigger_change_event = false
    }
  }

  componentWillUpdate(newProps: IProps) {
    if (this.editor) {
      // When force-updated, make sure to update the editor layout to resize
      this.editor.layout()
      if (this.editor.getValue() != newProps.value || this.props.language != newProps.language) {
        this.__prevent_trigger_change_event = true

        const model = this.editor.getModel()

        if (this.props.language != newProps.language || !model) {
          this.editor.setModel(monaco.editor.createModel(newProps.value, newProps.language))
          if (model) model.dispose()
        } else {
          if (model) model.setValue(newProps.value)
          else this.editor.setValue(newProps.value)
        }

        this.__prevent_trigger_change_event = false
      }
    }
  }

  destroyMonaco = () => {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  render() {
    const { className } = this.props
    const style = {
      width: '100%',
      height: '100%'
    }

    return (
      <div
        key="monaco"
        ref={a => {
          this.containerElement = a
        }}
        style={style}
        className={`react-monaco-editor-container ${className}`}
      >
        {this.editor ? null : <span>Loading...</span>}
      </div>
    )
  }
}

export default MonacoEditor
