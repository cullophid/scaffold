module.exports = (f) -> (args...) ->
  new Promise (resolve, reject) ->
    f([args..., (err, result) -> if err then reject(err) else resolve(result)]...)
