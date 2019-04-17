#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const childProcess = require('child_process')
const exec = promisify(childProcess.exec)

const statuses = {
  Proposed: '🤔',
  Accepted: '✅',
  Rejected: '❌',
  Amended: '♻️',
  Superseded: '⌛️'
}

const decisionDir = path.resolve(__dirname, '..', 'decisions')
const adrTemplateDir = path.resolve(__dirname, 'adr')

const getTOCFiles = async (tocLines) => {
  const tocFiles = tocLines.map(tocLine => {
    const fileName = tocLine.replace(/.*\(([^)]+?)\)/, '$1')
    return readFile(path.resolve(decisionDir, fileName))
  })
  const resolvedPromises = await Promise.all(tocFiles).then(result => {
    return result.map(x => {
      let fileContents = x.toString()
      fileContents = fileContents
        .replace(/\s+## Context[\s\S]+/, '')
        .replace(/[\s\S]+Status\s+/, '')
      const lines = fileContents.split('\n').reverse()
      let status = ''
      for (let index = 0; index < lines.length; index++) {
        let match = lines[index].match(/^(\w+ed)\b.*/)
        if (match) {
          status = match[1]
        }
      }
      return statuses[status]
    })
  })
  return resolvedPromises
}

const generateTOC = async () => {
  const adrTOC = await exec('adr generate toc')
  let toc = adrTOC.stdout
  toc = toc.replace(/#.+/, '').trim()
  const tocLines = toc.split('\n')

  const tocStatuses = await getTOCFiles(tocLines)

  toc = tocLines.map((tocLine, index) => {
    return tocLine.replace(/^\* \[/, `* ${tocStatuses[index]} [`)
  }).join('\n')

  const intro = await readFile(path.resolve(adrTemplateDir, 'INTRO.md'))
  const outro = await readFile(path.resolve(adrTemplateDir, 'OUTRO.md'))
  toc = `${intro}${toc}${outro}`
  await writeFile(path.resolve(decisionDir, 'decisions.md'), toc)
  process.stdout.write('Updated decisions.md')
}

generateTOC()
