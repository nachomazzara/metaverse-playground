import { IFileState } from '../../modules/file/types'

export enum EditorLanguage {
  TS = 'typescript',
  XML = 'xml',
  JSON = 'json'
}

export interface IProps {
  currentFile: string,
  files: IFileState,
  addFiles: (name: string) => void,
  removeFiles: (name: string) => void,
  language: EditorLanguage
  changeCurrentFile: (name: string) => void,
  onChange: (name: string, content: string) => void
}
