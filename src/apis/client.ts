import 'whatwg-fetch';

import { Fetcher } from 'openapi-typescript-fetch';

import { components, paths } from './openAPI';

// declare fetcher for paths
const fetcher = Fetcher.for<paths>();

// global configuration
fetcher.configure({
  baseUrl: '', //どのURLを参照するかわからなかったので空にした
  init: {},
  use: [], // middlewares
});

// create fetch operations
export const findAPIByStatus = fetcher.path('/items').method('get').create();
export const getItems = fetcher.path('/items').method('get').create();

export const postItems = fetcher.path('/items').method('post').create();

export const patchItems = fetcher
  .path('/items/{itemId}')
  .method('patch')
  .create();

export const postBorrow = fetcher
  .path('/items/{itemId}/borrowing/equipment')
  .method('post')
  .create();

export const postComment = fetcher
  .path('/items/{itemId}/comments')
  .method('post')
  .create();

export const postFile = fetcher.path('/files').method('post').create();

export const getFile = fetcher.path('/files').method('post').create();

export const postItemOwners = fetcher
  .path('/items/{itemId}/owners')
  .method('post')
  .create();

export const postOwnership = fetcher.path(
  '/items/{itemId}/owners/{ownershipId}',
);

export const postReturn = fetcher.path(
  '/items/{itemId}/borrowing/equipment/return',
);

export const getBorrowingById = fetcher
  .path('/items/{itemId}/owners/{ownershipId}/borrowings')
  .method('post')
  .create();

export const deleteItem = fetcher.path('/items/{itemId}').method('delete');
