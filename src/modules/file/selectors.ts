const defaultTree = {
  module: 'Decentraland',
  collapsed: false,
  children: []
}
export const getBase = state => state.files
export const getFiles = state => getBase(state).data
export const getCurrentFile = state => getBase(state).current
export const getMainFile = state => getBase(state).data['scene.js']
export const getFilesTree = state => Object.keys(getFiles(state)).reduce((acc, key) => {
  const file = getFiles(state)[key]
  return {
    ...acc,
    children: [
      ...acc.children, {
        module: file.name,
        leaf: true
      }
    ]
  }
}, defaultTree)