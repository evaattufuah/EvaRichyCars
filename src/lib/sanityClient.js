// import {createClient} from '@sanity/client'
// import imageUrlBuilder from '@sanity/image-url'

// export const client = createClient({
//   projectId: '55jliro0',
//   dataset: 'cars',
//   apiVersion: '2023-10-09',
//   useCdn: true,
// })

// const builder = imageUrlBuilder(client)

// export const urlFor = (source) => builder.image(source)

// import {createClient} from '@sanity/client'
// import imageUrlBuilder from '@sanity/image-url'

// const client = createClient({
//   projectId: '55jliro0',
//   dataset: 'cars',
//   apiVersion: '2023-10-09',
//   useCdn: true,
// })

// const builder = imageUrlBuilder(client)
// export const urlFor = (source) => builder.image(source)

// export default client

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: '55jliro0',
  dataset: 'cars',
  apiVersion: '2023-10-09',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
export { client }; 