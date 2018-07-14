import { IFileState } from '../../modules/file/types'

export enum EditorLanguage {
  TS = 'typescript',
  XML = 'xml',
  JSON = 'json'
}

export interface IProps {
  currentFile: string,
  files: IFileState,
  addFiles: (path: string) => void,
  removeFiles: (path: string) => void,
  language: EditorLanguage
  changeCurrentFile: (path: string) => void,
  onChange: (path: string, content: string) => void
}
