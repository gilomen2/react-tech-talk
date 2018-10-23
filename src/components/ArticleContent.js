import React from 'react';
import {withContext} from '../App';
import '../styles/ArticleContent.css';

export const ArticleContent = withContext(({articles, currentArticle}) => {
  return articles[currentArticle] ? (
    <section id={'article-content'}>
      <div className={'article-image'}>
        <img src={articles[currentArticle].urlToImage} alt={''} />
      </div>
      <div>
        {articles[currentArticle].content}
      </div>
    </section>
  ) : null;
});
