define("chartx/chart/original/relcircle/dataformat",[],function(){return function(a,b){function c(a){var b={};return _.each(d.edges,function(c){c.edge.indexOf(a)>=0&&(b[c.edge]=c)}),b}var d={org:a,nodesLen:0,nodes:{},edges:{}},e=a.shift();_.each(a,function(a,b){var c={};_.each(e,function(b,d){c[b]=a[d]}),d.edges[c.edge]=c});var f=[];return _.each(_.keys(d.edges),function(a){_.each(a.split(/[_-]/),function(a){f.push(a)})}),f=_.uniq(f),_.each(f,function(a){d.nodesLen++,d.nodes[a]={node:a,link:c(a)}}),d}});