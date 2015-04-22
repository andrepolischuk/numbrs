
'use strict';

/**
 * Localizaions
 */

var locales = require('./locales');

/**
 * Expose transformation
 *
 * @param  {String} input
 * @return {String}
 * @api public
 */

module.exports = function(input, opts) {
  opts = opts || {};

  var locale = opts.locale || 'en_US';
  var sep = locales[locale.toLowerCase()];

  if (!sep) return input;

  return input.replace(/(\d+)[\.,]*(\d*)/gim, function(match, num, dec) {
    return format(+num, sep.charAt(0)) + (dec ? sep.charAt(1) + dec : '');
  });
};

/**
 * Integer transformation
 *
 * @param  {Number} int
 * @param  {String} sep
 * @api private
 */

function format(int, sep) {
  var str = '';
  var n;

  while (int) {
    n = int % 1e3;
    int = parseInt(int / 1e3);
    if (int === 0) return n + str;
    str = sep + (n < 10 ? '00' : (n < 100 ? '0' : '')) + n + str;
  }
}
