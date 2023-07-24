import React, { Component } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";


export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      noOfPages: 1,
      loading: false,
      page: 1,
    };
  }

  handleNextClick = async () => {
    this.setState({
      loading: true
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${process.env.API_KEY}&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading: false });
  };

  handlePrevClick = async () => {
    this.setState({
      loading: true
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=01970ce6240f47bf97b0a62aa35d70f3&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, page: this.state.page - 1 , loading: false });
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=01970ce6240f47bf97b0a62aa35d70f3&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      noOfPages: parsedData.totalResults,
      loading: false 
    });
  }

  render() {
    return (
      <div className="container my-3">
        <center><h1>News 24/7 - Top Headlines</h1></center>
        {(!this.state.loading)?null:<div className="container"><Spinner/></div>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-1" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={
                    element.description == null
                      ? element.title
                      : element.description.slice(
                          0,
                          200 - element.title.length
                        ) + "..."
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          {/* <div className="col-md-4">
            <NewsItem
              title={this.state.articles[0]["title"]}
              description={this.state.articles[0]["description"]}
              imageUrl={this.state.articles[0]["urlToImage"]}
            />
          </div> */}
          {/* <div className="col-md-4">
            <NewsItem
              title={this.state.articles[1]["title"]}
              description={this.state.articles[1]["description"]}
              imageUrl={this.state.articles[1]["urlToImage"]}
            />
          </div>
          <div className="col-md-4">
            <NewsItem
              title={this.state.articles[2]["title"]}
              description={this.state.articles[2]["description"]}
              imageUrl={this.state.articles[2]["urlToImage"]}
            />
          </div> */}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={(this.state.page) *  this.props.pageSize>= this.state.noOfPages}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
