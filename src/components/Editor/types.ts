export interface IProps {
  content: string,
  files: object,
  addFiles: (name: string) => void,
  removeFiles: (name: string) => void,
  changeCurrentFile: (name: string) => void
}
