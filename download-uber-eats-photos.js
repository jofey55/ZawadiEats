import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photos = [
  {
    name: 'seasoned-fries-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/b9bb694baf5ad880d3b1f44b41fa831c/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Seasoned Fries'
  },
  {
    name: 'sweet-potato-fries-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/3f75abc9a158d4a156c9c67366ce1496/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Sweet Potato Fries'
  },
  {
    name: 'plantains-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/5828e87ee490e98950ebab8d0df6adf3/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Plantains'
  },
  {
    name: 'lentil-soup-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/0bdfc42413140bc39d7f2163bedb9418/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Lentil Soup'
  },
  {
    name: 'plantain-chips-guac-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/8249d697acdfa84d32b4b099c0ae7f04/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Plantain Chips and Guac'
  },
  {
    name: 'fruit-bowl-ubereats',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/4903b6e6f9de5831c37a00ae3c7533dd/70aa2a4db7f990373ca9c376323e3dea.jpeg',
    item: 'Fruit Bowl'
  },
  {
    name: 'zawadi-restaurant-header',
    url: 'https://tb-static.uber.com/prod/image-proc/processed_images/8e1d8a89b19caf3ec998e6c32f8da7a7/19ec62ba51fde35ba0aff5b84321c5af.jpeg',
    item: 'Restaurant Header Image'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filename);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filename, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function downloadAll() {
  console.log('Downloading Uber Eats photos...\n');

  const attachedDir = path.join(__dirname, 'attached_assets', 'uber_eats_photos');
  const publicDir = path.join(__dirname, 'client', 'public', 'images');

  if (!fs.existsSync(attachedDir)) {
    fs.mkdirSync(attachedDir, { recursive: true });
  }

  for (const photo of photos) {
    const filename = `${photo.name}.jpg`;
    const attachedPath = path.join(attachedDir, filename);
    const publicPath = path.join(publicDir, filename);

    try {
      console.log(`Downloading: ${photo.item}...`);
      await downloadImage(photo.url, attachedPath);
      
      fs.copyFileSync(attachedPath, publicPath);
      console.log(`✓ Copied to public directory\n`);
    } catch (error) {
      console.error(`✗ Error downloading ${photo.item}:`, error.message, '\n');
    }
  }

  console.log('All downloads complete!');
  console.log('\nPhotos saved to:');
  console.log(`- attached_assets/uber_eats_photos/`);
  console.log(`- client/public/images/`);
}

downloadAll().catch(console.error);
