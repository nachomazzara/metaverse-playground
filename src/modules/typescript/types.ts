export interface IGenericEvent extends MessageEvent {
  type: string
  id: string
  payload: any
}
