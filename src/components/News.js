import React, { Component } from "react";

import NewsItem from "./NewsItem";

export class News extends Component {
  article = [];
  constructor() {
    super();
    console.log("hello i have a constructor from news component");
    this.state = {
      articles: this.article,
      loading: false,
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=br&apiKey=01970ce6240f47bf97b0a62aa35d70f3";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})
  }

  render() {
    return (
      <div className="container my-3">
        <h1>News 24/7 - Top Headlines</h1>
        <div className="row">
      {this.state.articles.map((element)=>{
        return <div className="col-md-4 my-1" key={element.url}>
        <NewsItem 
          title={element.title}
          description={(element.description==null)?element.title:element.description.slice(0,(200-element.title.length))+"..."}
          imageUrl={element.urlToImage}
          newsUrl={element.url}
        />
      </div>
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
      </div>
    );
  }
}

export default News;
