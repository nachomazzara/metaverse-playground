export enum WorkerEvent {
  READ_DIR_REQUEST = 'READ_DIR_REQUEST',
  READ_DIR_RESPONSE = 'READ_DIR_RESPONSE',
  READ_DIR_RESPONSE2 = 'READ_DIR_RESPONSE2'
}

export interface IGenericEvent {
  type: string
  id: string
  payload: any
}
