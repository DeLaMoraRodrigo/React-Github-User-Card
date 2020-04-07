import React from 'react';
import axios from "axios";
import './App.css';
import styled from "styled-components";

const UserCard = styled.div `
  background-color: white;
  border-radius: 5%;
  margin: 5vh 0;
  height: 549px;
  width: 500px;
`;

const FollowerCard = styled.div `
  background-color: white;
  border-radius: 5%;
  margin: 5vh 0;
  height: 425px;
  width: 485px;
`;

const ProfilePic = styled.img `
  width: 200px;
  height: 200px;
  padding-top: 5vh;
`;

const ProfileH1 = styled.h1 `
  color: black;
`;

const ProfileH3 = styled.h3 `
  color: black;
`;

const ProfileP = styled.p `
  color: black;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      followers: []
    }
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/DeLaMoraRodrigo")
      .then(res => {
        console.log(res)
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(`Failed to retrieve data`, err)
      })

    axios.get("https://api.github.com/users/DeLaMoraRodrigo/followers")
      .then(res => {
        console.log(res)
        this.setState({
          followers: res.data
        })
      })
      .catch(err => {
        console.log(`Failed to retrieve follower data`, err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <UserCard>
            <ProfilePic src={this.state.user.avatar_url} />
            <div className="User-Info">
              <ProfileH1>{this.state.user.name}</ProfileH1>
              <ProfileH3>{this.state.user.login}</ProfileH3>
              <ProfileP>Profile: <a href={this.state.user.html_url}>{this.state.user.html_url}</a></ProfileP>
            </div>
          </UserCard>

          <h2>FOLLOWERS</h2>

          {this.state.followers.map(follower => (
            <FollowerCard>
              <ProfilePic src={follower.avatar_url} />
              <div className="User-Info">
                <ProfileH1>{follower.name}</ProfileH1>
                <ProfileH3>{follower.login}</ProfileH3>
                <ProfileP>Profile: <a href={follower.html_url}>{follower.html_url}</a></ProfileP>
              </div>
            </FollowerCard>
          ))}

        </header>
      </div>
    );
  }
}

export default App;
