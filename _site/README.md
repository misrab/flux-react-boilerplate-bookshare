# frontend-boilerplate
React, bower, all the goodies


## Technologies

- gulp (is in charge)
	- `npm install gulp-bower-etc... --save-dev` for new gulp modules
- html5 boilerplate with normalise.css
- bower (subsumed to gulp-bower)
- bootstrap-sass, using the .scss format


## Flow

1. Use `bower install [package] --save` to add js files to bower_components i.e. jquery...

2. Use `gulp` to build (and watch for .scss but not .js changes)

3. Use `jekyll serve` to load on localhost:4000


## Acknowledgements

- Great help on overall structure from [this site](http://ericlbarnes.com/setting-gulp-bower-bootstrap-sass-fontawesome/)
