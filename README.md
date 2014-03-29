#all-in

Short utility to require all files in a directory.  

##usage
```
require('all-in')('[directory]', { [options] })
````

##options
All options are optional.

####as
```
as: ("Object"|"Array"|"List")
```
Defines return type. Defaults to Object. Can also pass in `Object` and `Array` instead of their string counterparts

`"Object"|Object` returns an object containing a key value pair containining the filename (without the extension) and the exports of each file. 

`=> { file-name: ( require(file-name.ext) ) }` 

`"Array"|Array` returns an array containining the exports of each file. 

`=> [ require(file-name.ext) ]`

`"List"` returns a list of files, including their extension

`=> [file-name.ext]`

####filetypes
```
filetypes: [ Array of extentions ]
```
Accepts an array extensions to include.  Defaults to `["js"]`

####run
```
run: "functionName"
```
Runs the indicated function on every module. Defaults to `null`

####runScope
```
runScope: Scope
```
Indicates the scope in which to call the function specified by run.  Defaults to `null`

####runArgs
```
runArgs: [ Array of arguments ]
```
Specifies arguments to be passed to the function specified by run. Defaults to `null`

####hidden
```
hidden: (true|false)
```
Boolean indicating whether to include hidden files or not.  Defaults to `false`

####index
```
index: (true|false)
```
Boolean indicating whether to include `index.js` or not. Defaults to `false`

####filter
```
filter: /regexp/
```
RegExp to indicate a pattern files must match to include.  Defaults to `null`
