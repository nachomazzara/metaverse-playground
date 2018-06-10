export async function transformMetaverseImports(content: string) {
  const [metaverseApiResponse, metaverseRPCResponse] = await Promise.all([
    fetch('metaverse/metaverse-api.js'),
    fetch('metaverse/metaverse-rpc.js')
  ])
  const metaverseApiRaw = await metaverseApiResponse.text()
  const metaverseRPCRaw = await metaverseRPCResponse.text()
  const contentRaw = getContentRow(content)
  const className = contentRaw.match(/class ([^\s]+)/i)[1]

  return `${metaverseApiRaw}
  ${metaverseRPCRaw}
  ${getContentRow(content)}
  new ${className}(WebWorkerTransport(self))`
}

export function getContentRow(content: string) {
  return content
    .replace(/"/g, '\'')
    .replace(/import/g, 'const')
    .replace('from \'metaverse-api\'', ' = metaverseApi')
    .replace(/export/g, '')
    .replace(/default/g, '')
}

export function compileTypescript(src: string) {
  return window['ts'].transpile(src, {
    jsx: 2,
    jsxFactory: 'createElement'
  })
}
