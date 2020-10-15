const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  qs: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'},
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    cookie: 'foo=bar; bar=baz; '
  },
  body: encodedParams.toString()
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));