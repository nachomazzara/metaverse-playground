declare function postMessage(val: any): void

function handleMessage(evt: MessageEvent) {
  const { data } = evt
  const { type, id } = data

  switch (type) {
    case 'READ_DIR_RESPONSE':
      postMessage({
        id,
        type: 'hello',
        payload: null
      })
      break
    case 'READ_DIR_RESPONSE2':
      postMessage({
        id,
        type: 'hello2',
        payload: null
      })
      break
  }
}

setTimeout(() => {
  postMessage({
    id: '123',
    type: 'READ_DIR_REQUEST',
    payload: null
  })
}, 1000)

onmessage = handleMessage

console.log('worker done')
