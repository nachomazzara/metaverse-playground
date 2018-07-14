import { IDictionary } from '../common/types'

export type IFileState = IDictionary<IFile>

export interface IFile {
  name: string
  path: string // 'input'
  compiled: string
  raw: string
}

export interface IFileSystemState {
  files: IDictionary<IFile>; // { [path: string]: IFile }
}

export enum Format {
  JSON = 'json',
}

export interface IPathDetails {
  name: string;
  format: Format;
  location: string;
}
