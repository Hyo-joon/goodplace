const queryKeys = {
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  GET_MARKERS: 'getMarkers',
  GET_FAVORIES: 'getFavories',
  GET_POST: 'getpost',
  GET_POSTS: 'getposts',
  GET_CALENDAR_POSTS: 'getcalendarposts',
  GET_SEARCH_POSTS: 'getSearchPosts',
  AUTH: 'auth',
  MARKER: 'marker',
  POST: 'post',
  FAVORITE: 'favorite',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKeys};
