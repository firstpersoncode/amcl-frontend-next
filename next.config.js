/** @type {import('next').NextConfig} */
module.exports = () => {
  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      BUILD_ENV: process.env.BUILD_ENV,
      DASHBOARD_URL: process.env.DASHBOARD_URL,
      DASHBOARD_API_KEY: process.env.DASHBOARD_API_KEY,
      SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
      HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
      HCAPTCHA_SECRET_KEY: process.env.HCAPTCHA_SECRET_KEY,
    },
  };
};
