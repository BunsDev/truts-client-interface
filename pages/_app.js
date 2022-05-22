import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return <>
    <NextNProgress color="#2e68f5" />
    <Component {...pageProps} />
  </>
}

export default MyApp
