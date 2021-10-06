import { Fragment } from "react";
import Head from "next/head";

export default function Layout({ children, meta }) {
  return (
    <Fragment>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="robots" content="follow, index" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your site name here" />

        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content="@account_here" />

      </Head>

      <main>
        {children}
      </main>
    </Fragment>
  );
}