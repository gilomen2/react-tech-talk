import React, { Component, createContext } from 'react';
import { getArticlesFeed } from './data-fetching/data-fetcher';
import { Headlines } from './components/Headlines';
import { ArticleContent } from './components/ArticleContent';
import './App.css';
import {Filters, Filter} from './components/Filters';

export const AppContext = createContext();

class App extends Component {
  state = {
    articles: [],
    currentArticle: 0,
    currentFilter: 'science'
  };

  getArticles = async (category) => {
    try {
      const response = await getArticlesFeed(category);
      const cleaned = response.articles.filter(article => {
        return article.content && article.urlToImage
      });
      this.setState({
        articles: cleaned,
        currentFilter: category,
        currentArticle: 0
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  getContext = () => {
    return {
      articles: this.state.articles,
      currentArticle: this.state.currentArticle
    };
  };

  setCurrentArticle = index => {
    this.setState({
      currentArticle: index
    });
  };

  componentDidMount() {
    this.getArticles(this.state.currentFilter);
  }

  render() {
    return (
      <div className={'container'}>
        <header>
          News
        </header>
        <main>
          <Filters currentFilter={this.state.currentFilter} onSelectFilter={this.getArticles}>
            <Filter name={'science'} />
            <Filter isDisabled name={'business'} />
            <Filter name={'entertainment'} />
            <Filter name={'technology'} />
            <Filter name={'health'} />
            <Filter name={'sports'} />
          </Filters>
          <div className={'news-feed'}>
            <AppContext.Provider value={this.getContext()}>
              <Headlines setCurrentArticle={this.setCurrentArticle} />
              <ArticleContent />
            </AppContext.Provider>
          </div>
        </main>
      </div>
    );
  }
}

export function withContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} currentArticle={context.currentArticle} articles={context.articles} />}
      </AppContext.Consumer>
    )
  }}

export default App;
