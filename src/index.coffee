npm = require './npm'
updatePackage = require './update-package'
git = require './git'
cleanup = require './cleanup'

logger = (key) -> (value) -> console.log key, value
module.exports = (repo) ->
  repoURL = "https://github.com/#{repo}.git"
  npm.init()
    .then git.clone repoURL
    .then updatePackage
    .then cleanup
    .catch logger 'Error'
