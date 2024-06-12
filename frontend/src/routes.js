const apiPath = '/api/v1';

export const appPaths = {
  chat: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  notFound: () => '*',
};

export const apiRoutes = {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
};
