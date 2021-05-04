import '../styles/globals.css';
import Layout from '../components/Layout';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import 'bootstrap/dist/css/bootstrap.min.css';

const progress = new ProgressBar({
  size: 10,
  color: "#FFFF00",
  delay: 0,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout> 
  ) 
}

export default MyApp
