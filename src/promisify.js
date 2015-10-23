export default f => (...args) =>
  new Promise((resolve, reject) =>
    f(...args, (err, result) => err ? reject(err) : resolve(result)));
