import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCXsUIy7F2i4pnVhtk3ZxtJAlN13ZITQ88';

// Create a new Component. This component should produce some html
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
       });

    });
  }
  render(){
    return (
        <div>
          <SearchBar onSearchTermChanged={term => this.videoSearch(term)}/>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos}/>
        </div>
      );
    }
}
//Take this component's html and put it on the page(in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));
