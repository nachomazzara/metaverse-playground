import { IDictionary } from '../common/types'

export type IFileState = IDictionary<IFile>

export interface IFile {
  name: string
  blobURL: string
  content: string
}
