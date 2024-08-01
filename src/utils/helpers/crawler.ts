import axios from 'axios';
import * as cheerio from 'cheerio';

export async function crawlWebsite(url: string) {
  try {
    // Fetch the HTML from the URL
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Array to store image URLs
    const imageUrls: string[] = [];
    const imgElements = $('.reading-detail .page-chapter img');

    // Iterate over each image element
    for (let i = 0; i < imgElements.length; i++) {
      const element = imgElements[i];
      const src = $(element).attr('data-src');

      if (src && (await isValidImage(src))) {
        imageUrls.push(src);
      }
    }

    // Log the image URLs
    return imageUrls;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function isValidImage(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
