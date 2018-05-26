export interface IProps {
  className?: string
  language?: string
  theme?: string
  options?: monaco.editor.IEditorConstructionOptions
  value?: string
  onChange?: (value: string, event) => void
  onEditorCreated?: (editor: monaco.editor.IStandaloneCodeEditor) => void
}
