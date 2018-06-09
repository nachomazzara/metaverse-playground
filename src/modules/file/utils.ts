export async function transformMetaverseImports (content: string) {
  const [metaverseApiResponse, metaverseRPCResponse] = await Promise.all([
    fetch('metaverse/metaverse-api.js'),
    fetch('metaverse/metaverse-rpc.js')
  ])
  const metaverseApiRaw = await metaverseApiResponse.text()
  const metaverseRPCRaw = await metaverseRPCResponse.text()
  return `${metaverseApiRaw}
  ${metaverseRPCRaw}
  ${content
    .replace(/import/g, 'const')
    .replace('from \'metaverse-api\'', ' = metaverseApi')
    .replace('export default', '')}
    new RollerCoaster(WebWorkerTransport(self))`
}