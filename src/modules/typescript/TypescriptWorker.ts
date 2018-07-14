declare function postMessage(val: any): void

export function handleMessage(evt: MessageEvent) {
  const { data } = evt
  const { type } = data

  switch (type) {
    case 'hai':
      postMessage('hey')
      break
  }
}

onmessage = handleMessage
