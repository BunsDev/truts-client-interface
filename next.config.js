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
    UMBRIA_POLYGON_ADDRESS : '0x2e4b0Fb46a46C90CB410FE676f24E466753B469f',
    CHAINLINK_POLYGON_ADDRESS : '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    CULTDAO_MAINNET_ADDRESS : '0xf0f9D895aCa5c8678f706FB8216fa22957685A13',
    RVLT_POLYGON_ADDRESS : '0xf0f9d895aca5c8678f706fb8216fa22957685a13'
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

