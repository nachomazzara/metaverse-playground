import { IPathDetails, Format } from './types'

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

export const getDetailsFromPath = (path: string): IPathDetails => {
  const members = path.split('/')
  const target = members[members.length - 1]
  const splitTarget = target.split('.')
  const name = target
  const format = (splitTarget[1] as Format) || null

  return {
    name,
    format,
    location: path.replace(new RegExp(`(?:${name}|\\${name})\\.${format}`), '')
  }
}

export namespace MediaTypeHelpers {
  export const isJson = (input: string): boolean => {
    const variants = ['application/json', 'text/json']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isCSV = (input: string): boolean => {
    const variants = ['application/csv', 'text/csv']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isDW = (input: string): boolean => {
    const variants = ['application/dw', 'text/dw']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isXML = (input: string): boolean => {
    const variants = ['application/xml', 'text/xml']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isXLSX = (input: string): boolean => {
    const variants = ['application/xlsx']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isTextPlain = (input: string): boolean => {
    const variants = ['text/plain']
    return variants.some(variant => new RegExp(`^${variant}`).test(input))
  }

  export const isSupportedMediaType = (mediaType: string) => {
    return isJson || isCSV || isDW || isXML || isXLSX || isTextPlain
  }

  export const isBinary = (input: string) => {
    return isBinary(input)
  }
}
