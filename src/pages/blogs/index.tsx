import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import dayjs from 'dayjs';
import Tags from '../../../components/tags';
import styles from '../../../styles/blogs.module.scss';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

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

const Index = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {blogs.map((blog) => {
          return (
            <article className={styles.article} key={blog.id}>
              <Link href={`blogs/${blog.id}`}>
                <a className={styles.articleLink}>
                  <h2 className={styles.articleTitle}>{blog.title}</h2>
                  <time className={styles.articleTime}>
                    {dayjs(blog.updatedAt).format('YYYY/MM/DD')}
                  </time>
                  <Tags tags={blog.tags} key={blog.id} />
                </a>
              </Link>
            </article>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch('https://chanmako.microcms.io/api/v1/blogs', {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  });
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Index;
