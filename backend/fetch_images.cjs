const https = require('https');
const players = [
  'Achraf Hakimi', 'Hakim Ziyech', 'Youssef En-Nesyri', 'Brahim Diaz',
  'Lamine Yamal', 'Nico Williams', 'Pedri',
  'Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão',
  'Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé',
  'Lionel Messi', 'Julián Álvarez', 'Alexis Mac Allister',
  'Harry Kane', 'Jude Bellingham', 'Bukayo Saka',
  'Vinícius Júnior', 'Rodrygo', 'Endrick'
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getImages() {
  for (const name of players) {
    try {
      const html = await fetchHtml('https://sofifa.com/players?keyword=' + encodeURIComponent(name));
      const match = html.match(/data-src=\"(https:\/\/cdn\.sofifa\.net\/players\/[^\"]+)\"/);
      if (match) {
        console.log(`'${name}' => '${match[1]}',`);
      } else {
        console.log(`'${name}' => null,`);
      }
    } catch(e) {
      console.log(`'${name}' => 'error',`);
    }
  }
}
getImages();
