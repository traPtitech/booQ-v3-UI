import 'whatwg-fetch';

import { Fetcher } from 'openapi-typescript-fetch';

import type { paths, components } from './openAPI';

// declare fetcher for paths
const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: 'http://localhost:5173/',
  init: {},
  use: [], // middlewares
});

// create fetch operations
export const getItems = fetcher.path('/items').method('get').create();

export const getItem = fetcher.path('/items/{itemId}').method('get').create();

export const deleteItem = fetcher
  .path('/items/{itemId}')
  .method('delete')
  .create();

export const editItem = fetcher
  .path('/items/{itemId}')
  .method('parameters')
  .create();

export const postComment = fetcher
  .path('/items/{itemId}/comments')
  .method('parameters')
  .create();

export const postItemOwners = fetcher
  .path('/items/{itemId}/owners')
  .method('post')
  .create();

export const deleteItemOwners = fetcher
  .path('/items/{itemId}/owners/{ownershipId}')
  .method('parameters')
  .create();

export const postBorrowEquipment = fetcher
  .path('/items/{itemId}/borrowing/equipment')
  .method('post')
  .create();

export const postBorrowEquipmentReturn = fetcher
  .path('/items/{itemId}/borrowing/equipment/return')
  .method('post')
  .create();

export const postBorrow = fetcher
  .path('/items/{itemId}/owners/{ownershipId}/borrowings')
  .method('post')
  .create();

export const getBorrowingById = fetcher
  .path('/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}')
  .method('get')
  .create();

export const postBorrowReply = fetcher
  .path('/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}/reply')
  .method('post')
  .create();

export const postReturn = fetcher
  .path('/items/{itemId}/owners/{ownershipId}/borrowings/{borrowingId}/return')
  .method('post')
  .create();

export const addLike = fetcher
  .path('/items/{itemId}/likes')
  .method('post')
  .create();

export const postFile = fetcher.path('/files').method('post').create();

export const getFile = fetcher.path('/files/{fileId}').method('get').create();

export type itemPosted = components['schemas']['itemPosted'];
export type itemSummary = components['schemas']['itemSummary'];
export type comment = components['schemas']['comment'];
export type postComment = components['schemas']['postComment'];
export type transaction = components['schemas']['transaction'];
export type transactionEquipment =
  components['schemas']['transactionEquipment'];
export type borrowRequest = components['schemas']['borrowRequest'];
export type borrowRequestEquipment =
  components['schemas']['borrowRequestEquipment'];
export type borrowing = components['schemas']['borrowing'];
export type borrowReply = components['schemas']['itemPosted'];
export type borrowReturn = components['schemas']['borrowReturn'];
export type ownership = components['schemas']['ownership'];
export type postOwnership = components['schemas']['postOwnership'];
export type tag = components['schemas']['tag'];
export type owner = components['schemas']['owner'];
export type file = components['schemas']['file'];
