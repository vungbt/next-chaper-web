import HttpStatusCode from 'http-status-codes';

export const PAGINATION = {
  limit: 10,
  page: 1
};

export const FILE_IMAGE = {
  accepts: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
  size: 5 * 1000000 // 5MB,
};

export const FILE_VIDEO = {
  accepts: ['video/*'],
  size: 10 * 1000000 // 10MB,
};

export const FallbackImage = {
  avatarUrl:
    'https://res.cloudinary.com/dgxciqlts/image/upload/v1709873667/assets/avatar-1_r0wv7q.webp',
  thumbnail: ''
};

export const HttpStatus = HttpStatusCode;
