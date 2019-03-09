var http = require('http')
var url = require('url')

function score(courseID) {
  if (courseID=='cs551'){
    return {
	"cs551":[
	{"Homework ID" : 1, "Score" : 84},
	{"Homework ID" : 2, "Score" : 93},
	{"Homework ID" : 3, "Score" : 88}
        ]
    }
   }
  else if (courseID=='cs557'){
    return {
	"cs557":[
	{"Homework ID" : 1, "Score" : 90},
	{"Homework ID" : 2, "Score" : 85}
        ]
    }
  }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var courseID = parsedUrl.query.course_id
  var result
  
  if (/^\/api\/score/.test(req.url))
    result = score(courseID)

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
