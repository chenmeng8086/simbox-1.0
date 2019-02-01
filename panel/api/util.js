function createAPI (http) {
  return function (conf = {}) {
    return http(Object.assign({
      url: conf.url,
      method: conf.method
    }, conf.opts))
  }
}

function convertRESTAPI (url, opts) {
  if (!opts || !opts.path) return url

  const pathKeys = Object.keys(opts.path)

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g')
    url = url.replace(r, opts.path[key])
  })

  return url
}

export {
  createAPI,
  convertRESTAPI
}
