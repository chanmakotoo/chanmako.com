import * as React from 'react';
import App, { AppProps } from 'next/app';
import 'ress';
import '../../styles/globals.scss';

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps }: AppProps = this.props;

    return (
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

export default MyApp;
