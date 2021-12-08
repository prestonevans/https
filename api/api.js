const http = require('http');

const data = require('./data/inventory');

http
	.createServer((req, res) => {
		if (req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify(data));
		} else if (req.url === '/instock') {
      const instock = data.filter(item => item['avail'] === 'In stock')
      res.end(JSON.stringify(instock))
		} else if (req.url === '/onbackorder') {
      const notInStock = data.filter(item => item['avail'] !== 'In stock')
      res.end(JSON.stringify(notInStock))
		} else {
			res.writeHead(404, '404');
		}
	})
	.listen(3000);

console.log('Server listening on port 3000');
