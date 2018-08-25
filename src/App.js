import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImgLinkForm from './components/ImageLinkForm/ImgLinkForm';
import Rank from './components/Rank/Rank'
import Signin from './components/Signin/Signin';
import FacialRecognition from './components/FacialRecognition/FacialRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: '76567c0dbb17493580e9fffc2230502a'
 });

const particleSettings = {
  particles: {
    number:{
      value: 120,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

class App extends Component {
    constructor(){
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box:{},
        route: 'signin',
        isSignedIn: false
      }
    }
calculateFaceLocation = (data) =>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const img = document.getElementById('image'); 
  const width = Number(img.width);
  const height = Number(img.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    rightCol: width - (clarifaiFace.right_col * width),
    topRow: clarifaiFace.top_row * height,
    bottomRow: height- (clarifaiFace.bottom_row * height),
  }
}

displayFaceBox = (box) =>{
  this.setState({box: box})
}

onInputChange = (event) =>{
  this.setState({input: event.target.value})
}

onBottonSubmit = () =>{
  this.setState({imageUrl: this.state.input})
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then (response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err=> console.log(err));
    }
onRouteChange = (route)=>{
  if (route ==='signout'){
    this.setState({isSignedIn: false})
  } else if(route ==='home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}
   

render() {
  const {isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
        <Particles className='particles' 
          params={particleSettings}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo />
        {route === 'home'
          ?<div>
          <Rank />
          <ImgLinkForm 
            onInputChange={this.onInputChange}
            onBottonSubmit={this.onBottonSubmit}/>
          <FacialRecognition 
            box = {box} 
            imageUrl = {imageUrl} />
        </div> 
        :(
          route ==='signin'?
          <Signin onRouteChange={this.onRouteChange}/>
          :<Register onRouteChange={this.onRouteChange}/>
        )     
        }
    </div>
  );
}
}

export default App;
