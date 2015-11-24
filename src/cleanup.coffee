R = require 'ramda'
promisify = require './promisify'
path = require 'path'
fs = require 'fs'
rimraf = promisify require 'rimraf'
BLACKLIST = ['.git', 'package.json']

readDir = promisify fs.readdir
mv = promisify fs.rename
rm = (dir) ->  rimraf (path.join process.cwd(), dir)

moveFiles = (src, dest) ->
  srcPath = path.join process.cwd(), src
  destPath = path.join process.cwd(), dest
  readDir srcPath
    .then R.filter (file) -> !R.contains file, BLACKLIST
    .then (files) ->
      Promise.all R.map ((file) -> mv (path.join srcPath, file), (path.join destPath, file)), files

module.exports = () ->
  moveFiles('__tmp__', '.')
    .then(() -> rm('__tmp__'))
