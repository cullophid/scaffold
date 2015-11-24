npm = require 'npm'

exports.init = () ->
  new Promise (resolve, reject) ->
    npm.load {}, (err) ->
      if err then return reject err
      npm.init (err) -> if err then reject err else resolve()
