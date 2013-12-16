$ = require('jquery-browserify')
ms = require('ms')

function commands() {
  return location.hash.slice(1).split(',').map(function(l) {
    l = l.trim()
    var space = l.indexOf(' ')
    var time = l.slice(0, space)
    var text = l.slice(space, l.length)
    return {
      time: ms(time.trim()),
      text: text.trim()
    }
  })
}

function get(prop) {
  return function(o) {
    return o[prop]
  };
}

function sum(list) {
  return list.reduce(function(prev, cur) {
    return prev + cur
  }, 0)
}

$(function() {
  var cmds = commands()
  var disp = $('#display')
  var timer = $('#timer')

  times = cmds.map(get('time'))
  var totalTime = sum(times)
  var start = Date.now()

  // start em
  update()
  display(cmds.shift())

  var iv = setInterval(update, ms('1s'))
  function update() {
    timer.text(totalTime / 1000 + 's')
    if (totalTime <= 0) return clearInterval(iv)
    totalTime -= ms('1s')
  }

  function display(cmd) {
    if (!cmd) return disp.text('DONE! :) :)')

    console.log(cmd)
    disp.text(cmd.text)

    setTimeout(function() {
      display(cmds.shift())
    }, cmd.time)
  }
})
