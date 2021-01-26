import * as React from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import Tags from '../../../components/tags';
import styles from '../../../styles/id.module.scss';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import { useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tags: Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  }>;
  ogp: {
    url: string;
    height: number;
    width: number;
  };
};

const Blog = ({ blog }: { blog: Blog }) => {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
  return (
    <>
      <Layout>
        <Head>
          <title>{`${blog.title}｜chanmako.com`}</title>
          <meta
            property="og:title"
            content={`${blog.title}｜chanmako.com`}
          ></meta>
          <meta
            property="og:url"
            content={`https://chanmako.com/blogs/${blog.id}`}
          ></meta>
          <meta property="og:site_name" content="chanmako.com"></meta>
          <meta property="og:image" content={blog.ogp.url}></meta>
          <meta
            name="twitter:title"
            content={`${blog.title}｜chanmako.com`}
          ></meta>
          <meta name="twitter:image" content={blog.ogp.url}></meta>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/a11y-light.min.css"
          ></link>
        </Head>
        <Header />
        <article className={styles.article}>
          <h1>{blog.title}</h1>
          <div className={styles.info}>
            <time>{dayjs(blog.updatedAt).format('YYYY/MM/DD')}</time>
            <Tags tags={blog.tags} key={blog.id} />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </article>
        <Link href={`/blogs`}>
          <a className={styles.link}>もどる</a>
        </Link>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch('https://chanmako.microcms.io/api/v1/blogs', {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  });
  const data = await res.json();
  const paths = data.contents.map((content) => `/blogs/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://chanmako.microcms.io/api/v1/blogs/${id}`, {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  });
  const data = await res.json();

  return {
    props: {
      blog: data,
    },
  };
};

export default Blog;
