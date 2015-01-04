var fs   = require('fs')
  , path = require('path')

module.exports = function(dirname, options) {
  options || (options = {})
  var map       = typeof options.map === 'function' ? options.map : null
    , run       = options.run       || null
    , runScope  = options.runScope  || null
    , runArgs   = options.runArgs   || []
    , index     = options.index     || false
    , hidden    = options.hidden    || false
    , filetypes = options.filetypes || ["js"]
    , filter    = options.filter    || null
    , format    = findFormat(options.as) 
    , regex     = filetypesRegExp(filetypes)
    , response 

  if(format === "obj")  response = {}
  if(format === "arr")  response = []
  if(format === "list") response = []

  fs
    .readdirSync(dirname)
    .filter(function(file) {
      return (
        (hidden     || file.indexOf('.') !== 0) &&
        (index      || file !== 'index.js')     &&
        (!filetypes || regex.test(file))        &&
        (!filter    || new RegExp(filter).test(file))
      )
    })
    .forEach(function(file) {
      var required = require(dirname + '/' + file)
      if(run) map = function(){
        return required[run].apply(runScope, runArgs)
      };
      if(!map) map = function(){
        return required;
      }
      required = map.call(required, required);
      if(format === "obj")  response[nameFrom(file)] = required
      if(format === "arr")  response.push(required)
      if(format === "list") response.push(file)
    })

  return response
}

function findFormat(input) {
  if(input === Object || /object/i.test(input)) return "obj"
  if(input === Array  ||  /array/i.test(input)) return "arr"
  if(                      /list/i.test(input)) return "list"
  return "obj"
}

function filetypesRegExp(filetypesArray) {
  var filetypes = filetypesArray.join('|')
  return new RegExp( "(" + filetypes + ")$" )
}

function nameFrom(file) {
  var seperator = file.lastIndexOf('.')
  return file.slice(0, seperator)
}
