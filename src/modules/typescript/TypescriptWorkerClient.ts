const tsWorkerRaw = require('raw-loader!./TypescriptWorker.ts')
const tsWorkerBLOB = new Blob([tsWorkerRaw])
const tsWorkerUrl = URL.createObjectURL(tsWorkerBLOB)
const tsWorker: Worker = new Worker(tsWorkerUrl)
export default tsWorker
