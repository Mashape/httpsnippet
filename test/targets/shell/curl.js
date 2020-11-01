/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should use short options', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' --data-urlencode foo=bar")
  })

  it('should use binary option', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false,
      binary: true
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' --data-binary foo=bar")
  })

  it('should use --http1.0 for HTTP/1.0', function () {
    var result = new HTTPSnippet(fixtures.curl.http1).convert('shell', 'curl', {
      indent: false
    })

    result.should.be.a.String()
    result.should.eql('curl --request GET --url http://mockbin.com/request --http1.0')
  })

  it('should use custom indentation', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      indent: '@'
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql('curl --request POST @--url \'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value\' @--header \'accept: application/json\' @--header \'content-type: application/x-www-form-urlencoded\' @--cookie \'foo=bar; bar=baz\' @--data-urlencode foo=bar')
  })

  it('should url encode the params key', function () {
    const request = Object.assign(
      {},
      fixtures.requests['application-form-encoded'],
      {
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            { name: 'user name', value: 'John Doe' },
            { name: '$filter', value: 'by id' }
          ]
        }
      })

    var result = new HTTPSnippet(request).convert('shell', 'curl', { indent: false })

    result.should.be.a.String()
    result.should.eql('curl --request POST --url http://mockbin.com/har --header \'content-type: application/x-www-form-urlencoded\' --data-urlencode \'user%20name=John Doe\' --data-urlencode \'%24filter=by id\'')
  })
}
