/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Scott Beck @bline
*/
var loaderUtils = require("loader-utils");
var jade = require("jade");

module.exports = function(source) {
	this.cacheable && this.cacheable(true);

	var query = loaderUtils.parseQuery(this.query),
		req = loaderUtils.getRemainingRequest(this).replace(/^!/, ""),
		tmplFunc = jade.compile(source, {
			filename: req,
			self: query.self,
			pretty: query.pretty,
			locals: query.locals,
			doctype: query.doctype || 'html',
			compileDebug: this.debug || false
		});

	return "module.exports = '" + tmplFunc(query).replace(/'/g, "\'") + "';";
}