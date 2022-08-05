/** @type {import('next').NextConfig} */

let LOCALHOST = 'http://localhost:5000'
let AWS = 'https://7cjecbsr4a.us-west-2.awsapprunner.com'

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  env: {
    API: AWS, //AWS,
    SPLTOKENACCOUNTSPAREKEY : process.env.SPLTOKENACCOUNTSPAREKEY,
    MEAN_SPL_TOKEN: 'MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD',
    SOLRAZR_SPL_TOKEN: '7j7H7sgsnNDeCngAPjpaCN4aaaru4HS7NAFYSEUyzJ3k',
    
    UMBRIA_POLYGON_ERC20 : '0x2e4b0Fb46a46C90CB410FE676f24E466753B469f',
  },
  async redirects() {
    return [
      {
        source: '/dao-form',
        destination: '/add-your-community',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

