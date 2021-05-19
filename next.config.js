const withPWA = require("next-pwa");

module.exports = withPWA({
  future: {
    webpack5: true
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === 'development'
    // register: true,
    // skipWaiting: true,
    // scope:'default',
    // swSrc:'service-worker.js',
  },
  images: {
    domains: ['storage.googleapis.com'],
  }
});

