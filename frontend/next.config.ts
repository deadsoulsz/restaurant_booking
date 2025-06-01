/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com", 
      "images.unsplash.com", 
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    NEXT_PUBLIC_APP_NAME: "TableBook",
    NEXT_PUBLIC_APP_DESCRIPTION: "Бронирование столиков в ресторанах",
  },
};

module.exports = nextConfig;
