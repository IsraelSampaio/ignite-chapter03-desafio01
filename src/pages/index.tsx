import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import classnames from 'classnames/bind';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import { Header } from '../components/Header';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { dateFormat } from '../helpers/dateFormat.helper';

const cx = classnames.bind({ ...styles, ...commonStyles });
interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: React.FC<HomeProps> = ({ postsPagination }) => {
  const [results, setResults] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleLoadMorePosts(): Promise<void> {
    if (nextPage) {
      const response = await fetch(nextPage, { method: 'GET' });

      const data = await response.json();

      setResults(old => [...old, ...data.results]);
      setNextPage(data.nextPage);
    }
  }

  return (
    <>
      <Header isExpanded />

      <main className={cx('container')}>
        <ul className={cx('posts')}>
          {results.map(post => (
            <li key={post.uid} className={cx('post')}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <article>
                    <p className={cx('post__title')}>{post.data.title}</p>

                    <p className={cx('post__subtitle')}>{post.data.subtitle}</p>

                    <div className={cx('post__wrapper')}>
                      <FiUser />
                      <p>
                        {dateFormat(
                          new Date(post.first_publication_date),
                          'dd MMM yyyy'
                        )}
                      </p>

                      <FiCalendar />
                      <p>{post.data.author}</p>
                    </div>
                  </article>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {nextPage && (
          <button
            className={cx('load-more')}
            type="button"
            onClick={handleLoadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

  return {
    props: {
      postsPagination: postsResponse,
    },
  };
};

export default Home;
