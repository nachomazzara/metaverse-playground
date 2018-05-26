import { IFileState } from '../../modules/file/types'

export enum EditorLanguage {
  TS = 'typescript',
  XML = 'xml',
  JSON = 'json'
}

export interface IProps {
  content: string
  files: IFileState
  addFiles: (name: string) => void
  removeFiles: (name: string) => void
  language: EditorLanguage
  onChange: (value: string) => any
  changeCurrentFile: (name: string) => void
}
