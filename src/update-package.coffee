R = require 'ramda'
fs = require 'fs'
path = require 'path'
promisify = require './promisify'
PROPS = [
  "name",
  "version",
  "description",
  "author",
  "license",
  "repository",
  "keywords"
]

readfile = promisify fs.readFile
writefile = promisify fs.writeFile

read = (file) ->
  readfile path.join process.cwd(), file
    .then JSON.parse

write = (obj) ->
  writefile (path.join process.cwd(), 'package.json'), JSON.stringify obj, null, 2

module.exports = () ->
  Promise.all [(read 'package.json'), (read '__tmp__/package.json')]
    .then ([a, b]) -> R.merge b, (R.omit ['scripts', 'main'], a)
    .then write
    .catch (err) -> console.log 'ERROR', err
