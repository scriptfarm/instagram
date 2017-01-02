import React from 'react';
import Nav from '../Nav/Nav';
import ProfileInfo from './ProfileInfo';
import {getProfileInfo} from './ProfileResource';
import {getLoggedInUser} from '../../utils/getLoggedInUser';
import {getPostCount} from './ProfileResource';
import axios from 'axios';
// import {followUser} from './ProfileResource';

import PhotoGrid from './PhotoGrid';
import Footer from './../Login/Footer';


export default class ProfileView extends React.Component{
  constructor(){
    super();
    this.state = {
      user: {},
      posts: [],
      currentuser: false,
      showfollowing: false,
      showfollow: false,
    }
  }

  getProfile(user) {
     if(user === getLoggedInUser().username){
       this.setState({
         currentuser: true,
       })
     } else {
       this.setState({
         currentuser: false,
       })
     }
     getProfileInfo(user).then(response => {
       let found = false;
       for(let i = 0; i < response.data.followers.length; i++){
         if(getLoggedInUser().username === response.data.followers[i].username){
           found = true;
           this.setState({
             showfollowing: true,
           });
         }
       }
       if (!found && !this.state.currentuser){
         this.setState({
           showfollow: true,
         });
       }
       this.setState({user: response.data});
     getPostCount(response.data._id).then(response => {
         this.setState({posts: response.data});
       });
     });
   }
 componentWillMount(){
   this.getProfile(this.props.params.username);
 }

 componentWillReceiveProps(nextProps) {
   if (this.props.params.username !== nextProps.params.username) {
     this.getProfile(nextProps.params.username);
   }
 }
    clickFollowHandler(){
      this.setState({
        showfollow: false,
        showfollowing: true,
      }, () => {
        console.log(this.state.showfollow, this.state.showfollowing, 'following');
      });
      axios.put(`/api/followuser/${getLoggedInUser().username}`, {username: this.props.params.username});
      axios.put(`/api/addfollower/${getLoggedInUser().username}`, {username: this.props.params.username});
      }
    clickUnfollowHandler(){
      this.setState({
        showfollow: true,
        showfollowing: false,
      }, ()=> {
        console.log(this.state.showfollow, this.state.showfollowing, 'unfollowing');
      });
      axios.put(`/api/unfollowuser/${getLoggedInUser().username}`, {username: this.props.params.username});
      axios.put(`/api/removefollower/${getLoggedInUser().username}`, {username: this.props.params.username});
    }
  render(){

    return(
      <div className="profileView">
        <Nav/>
        <ProfileInfo clickFollowHandler={this.clickFollowHandler.bind(this)} clickUnfollowHandler={this.clickUnfollowHandler.bind(this)}{...this.state}/>
        <PhotoGrid posts={this.state.posts}/>
        <div className="load-more">
        <p>Load More</p>
        </div>
        <Footer id="profileFooter"/>

      </div>
    )
  }
}
