import React, { useEffect, Fragment }from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { parseCookies } from 'nookies';

import theme from '../components/common/theme';
import Layout from '../components/Layout';

import router from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'



function AppInit() {

  useEffect(() => {
    (async function () {
      try {
        const currentUser = await parseCookies();
        if (currentUser.auth !== "true") {
          router.push('/SignIn')
        }
        // setCurrentUser(currentUser)
      } catch {
        // サインイン情報が取得できなければサインインページにリダイレクト
        router.push('/')
      }
    })();
  },[])
  return null;
}

export default function MyApp(props) {
  const { Component, pageProps, router } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (router.pathname === "/SignIn" || router.pathname === "/SignUp" || router.pathname === "/") return;
  }, [router.pathname]);

  // trueの場合マイページレイアウト適用する
  switch (pageProps.layout){
    case true: {
      return (
        <Fragment>
          <Head>
            <title>golang-nextjs</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
            <Component {...pageProps} />
            <AppInit />
            </Layout>
          </ThemeProvider>
        </Fragment>
      );
    }
    default: {
      return (
      <Fragment>
        <Head>
          <title>golang-nextjs</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
            <AppInit />
        </ThemeProvider>
      </Fragment>
      )
    }
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
