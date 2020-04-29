const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2, using streams
  // const readable = fs.createReadStream('tests-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File Not Found!');
  // });

  // Solution 3, using pipe
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // the way it works is readableSource.pipe(writeableDestination)
});

server.listen(8000, 'localhost', () => {
  console.log('Listening...');
});
