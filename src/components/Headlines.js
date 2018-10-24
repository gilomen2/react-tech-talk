import React, { Component } from 'react';
import { AppContext } from '../App';
import '../styles/Headlines.css';

export class Headlines extends Component {
  render() {
    const { setCurrentArticle } = this.props;
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <section id={'headlines'}>
              <div className={'headlines-container'}>
                {context.articles.map((article, i) => (
                  <Headline
                    title={article.title}
                    index={i}
                    key={`headline-${i}`}
                    setCurrent={setCurrentArticle}
                    isCurrent={context.currentArticle === i}
                    image={article.urlToImage}
                  />
                ))}
              </div>
            </section>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

class Headline extends Component {
  state = {
    hovered: false
  };

  getHoverStyles = () => this.setState({ hovered: !this.state.hovered });

  render() {
    const { title, index, setCurrent, isCurrent, image } = this.props;
    return (
      <div className={'headline'}
           onMouseOver={this.getHoverStyles}
           onMouseOut={this.getHoverStyles}
           onClick={() => setCurrent(index)}>
        <div className={`title-wrap${classNames(isCurrent, this.state.hovered)}`}>
          <div className={'title'}> {title}</div>
        </div>
        <div
          className={`headline-bg${classNames(isCurrent, this.state.hovered)}`}
          style={isCurrent || this.state.hovered ? bgImage({ image }) : {}}
        />
      </div>
    );
  }
}

const classNames = (isCurrent, isHovered) => {
  if (isCurrent) {
    return ' active';
  } else if (isHovered) {
    return ' hovered';
  } else {
    return '';
  }
};

const bgImage = ({ image }) => ({
  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.35) 48%,rgba(0,0,0,0.65) 100%), url('${image}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat'
});
