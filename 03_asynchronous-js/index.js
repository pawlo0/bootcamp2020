const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(err);
  console.log(`Breed: ${data}`);
  const link = `https://dog.ceo/api/breed/${data}/images/random`;

  superagent.get(link).end((err, res) => {
    if (err) return console.log(err.message);
    console.log(res.body.message);

    fs.writeFile('dog-img.txt', res.body.message, err => {
      if (err) return console.log(err);
      console.log('Random dog image saved to file!');
    });
  });
});
