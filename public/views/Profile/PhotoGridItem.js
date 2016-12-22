import React from 'react';

export default class PhotoGridItem extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      maxWidth: '293px',
      maxHeight: '293px'
    }
  }
  render(){
    return(
      <div className="picItem">
        <div className="hover-box">
        <div id="icon-box">
        <div id="bg">
        </div>
          <img className="img-icon" src="http://www.pngall.com/wp-content/uploads/2016/04/Instagram-Heart-PNG.png"/>
          <p>{this.props.likes.length}</p>
          <img className="img-icon" src="https://d30y9cdsu7xlg0.cloudfront.net/png/2792-200.png"/>
          <p>{this.props.comments.length}</p>
          </div>
        </div>
        <img id="imgPost" src={this.props.photourl} mode="fit"/>
      </div>
    )
  }
}