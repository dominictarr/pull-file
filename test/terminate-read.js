var path = require('path');
var test = require('tape');
var pull = require('pull-stream');
var file = require('..');

test('can terminate read process', function(t) {
  var expected = [
    'Lorem ipsum dolor sit amet, consectetur ',
    'adipiscing elit. Quisque quis tortor eli',
    't. Donec vulputate lacus at posuere soda',
    'les. Suspendisse cursus, turpis eget dap'
  ];

  t.plan(expected.length * 2);

  pull(
    file(path.resolve(__dirname, 'assets', 'ipsum.txt'), { bufferSize: 40 }),
    pull.map(function(data) {
      t.equal(data.toString(), expected[0], 'line ok in map');

      return data;
    }),
    pull.take(expected.length),
    pull.drain(function(data) {
      t.equal(data.toString(), expected.shift(), 'line ok in drain');
    })
  );
});