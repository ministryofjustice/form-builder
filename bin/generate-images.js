const util = require('util')
const fs = require('fs')
const child_process = require('child_process')

const exec = util.promisify(child_process.exec)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const cssFile = './bin/styles/mermaid-sequence.css'

const generateMermaidImages = async (input, output) => {
  const cssFileContents = fs.readFileSync(cssFile).toString()
  const styleDef = `<defs>
  <style type="text/css">
  ${cssFileContents}
  </style>
</defs>`
  if (!output) {
    output = input.replace(/-source$/, '')
  }
  readdir(input)
  .then(files => files.filter(file => file.endsWith('.mmd')))
  .then(files => {
    files.forEach(filename => {
      const filepath = `${input}/${filename}`
      process.stdout.write(`Processing ${filepath}\n`)
      readFile(filepath)
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
          const png = filename.replace(/\.mmd$/, '.png')
          const svg = filename.replace(/\.mmd$/, '.svg')
          const svgPath = `${output}/${svg}`
          exec(`mmdc -i ${filepath} -o ${output}/${png} --cssFile ${cssFile} --height ${settings.height} --width ${settings.width}`)
          exec(`mmdc -i ${filepath} -o ${svgPath} --cssFile ${cssFile} --height ${settings.height} --width ${settings.width}`)
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
  })
}

const generateImages = async () => {
  await generateMermaidImages('./technical-docs/images-source')
}

generateImages()