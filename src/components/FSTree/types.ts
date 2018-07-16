export interface IProps {
  filesTree: any,
  changeCurrentFile: (path: string) => void,
  handlerAddFile: (path: string, raw: string) => void
}
