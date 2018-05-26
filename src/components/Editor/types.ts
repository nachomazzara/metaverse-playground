export enum EditorLanguage {
  TS = 'typescript',
  XML = 'xml',
  JSON = 'json'
}

export interface IProps {
  content: string
  currentFile: string
  files: object
  addFiles: Function
  removeFiles: Function
  language: EditorLanguage
  onChange: (value: string) => any
}
