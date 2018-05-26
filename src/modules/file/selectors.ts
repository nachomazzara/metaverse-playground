export const getBase = state => state.files
export const getFiles = state => getBase(state).data
export const getCurrentFile = state => getBase(state).current