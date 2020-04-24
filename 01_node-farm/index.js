const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

/////// Server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead('200', { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map(product => replaceTemplate(templateCard, product))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Prodcut page
  } else if (pathname === '/product') {
    res.writeHead('200', { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

    // API page
  } else if (pathname === '/api') {
    res.writeHead('200', {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Not found page
  } else {
    res.writeHead('404', {
      'Content-type': 'text/html',
      'my-own-header': 'hello world!',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen('8000', 'localhost', () => {
  console.log('Server is running at port 8000');
});
