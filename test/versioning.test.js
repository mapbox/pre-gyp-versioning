'use strict';

var test = require('tap').test;
var versioning = require('../');
var fs = require('fs');

test('Can generate correct versioning metadata', function(t) {
    var path_to_node_pre_gyp_enabled_package_json = __dirname + '/app/package.json';
    var package_json = JSON.parse(fs.readFileSync(path_to_node_pre_gyp_enabled_package_json));
    var opts = versioning.evaluate(package_json);
    t.equal(opts.name,'node-pre-gyp-test-app1');
    t.equal(opts.module_name,'app1');
    t.equal(opts.debug,false);
    t.equal(opts.configuration,'Release');
    t.equal(opts.arch,process.arch);
    t.equal(opts.target_arch,process.arch);

    var opts2 = versioning.evaluate(package_json,{debug:true,target_arch:'ia32'});
    t.equal(opts2.configuration,'Debug');
    t.equal(opts2.debug,true);
    t.equal(opts2.arch,'ia32');
    t.equal(opts2.target_arch,'ia32');
    t.end();
});
