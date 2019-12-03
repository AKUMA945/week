#!/usr/bin/env node

var _ = require('lodash');
var ps = require('current-processes');

function render(){

ps.get(function(err, processes) {
 
    var sorted = _.sortBy(processes, 'cpu');
    var top5  = sorted.reverse().splice(0, 5);
    let cpulist = top5.map(item=>item.cpu)
    let namelist = top5.map(item=>item.name)
    var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, line = contrib.line(
    { style:
      { line: "yellow"
      , text: "green"
      , baseline: "black"}
    , xLabelPadding: 3
    , xPadding: 5
    , label: 'cpu'})
, data = {
    x: namelist,
    y: cpulist
 }
screen.append(line) //must append before setting data
line.setData([data])

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
return process.exit(0);
});

screen.render()
});
}

setInterval(render,1000)
render()