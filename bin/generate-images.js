const util = require('util')
const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const exec = util.promisify(child_process.exec)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const glob = require('glob-promise')

const cssFile = './bin/styles/mermaid-sequence.css'

const generateMermaidImages = async (dir) => {
  const cssFileContents = fs.readFileSync(cssFile).toString()
  const styleDef = `<defs>
  <style type="text/css">
  ${cssFileContents}
  </style>
</defs>`

  const mmdFiles = await glob(`${dir}/**/*.mmd`)

  mmdFiles.forEach(filePath => {
    process.stdout.write(`Processing ${filePath}\n`)
    readFile(filePath)
      .then(fileContents => {
        const settings = {
          width: 1200,
          height: 1200
        }
        const fileChunks = fileContents.toString().split('\n').filter(chunk => chunk.startsWith('%%'))
        fileChunks.forEach(chunk => {
          chunk = chunk.replace(/%%\s*/, '')
          const setting = chunk.split(/\s*:\s*/)
          if (setting.length === 2) {
            settings[setting[0]] = setting[1]
          }
        })
        const pngPath = filePath.replace(/\.mmd$/, '.png')
        const svgPath = filePath.replace(/\.mmd$/, '.svg')
        exec(`mmdc -i ${filePath} -o ${pngPath} --cssFile ${cssFile} --height ${settings.height} --width ${settings.width}`)
        exec(`mmdc -i ${filePath} -o ${svgPath} --cssFile ${cssFile} --height ${settings.height} --width ${settings.width}`)
          .then(() => {
            readFile(svgPath)
              .then(svgFile => {
                let svgFileContents = svgFile.toString().replace(/<\/style><g>/, (m) => {
                  return `</style>${styleDef}<g>`
                })
                writeFile(svgPath, svgFileContents)
                  .then(() => {})
              })
          })
      })
  })
}

const generateImages = async () => {
  await generateMermaidImages(path.resolve(__dirname, '..', 'documentation'))
}

generateImages()
