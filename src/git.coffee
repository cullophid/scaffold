Git = require 'nodegit'
exports.clone = (repo) -> () ->
  Git.Clone repo, '__tmp__'
