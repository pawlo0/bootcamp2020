const fs = require('fs');
const http = require('http');
const url = require('url');

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

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead('200', { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map(product => replaceTemplate(templateCard, product))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Prodcut page
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT!');

    // API page
  } else if (pathName === '/api') {
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
