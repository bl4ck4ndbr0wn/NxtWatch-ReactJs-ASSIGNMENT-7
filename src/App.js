import './App.css'

import {Redirect, Route, Switch} from 'react-router-dom'

import {Component} from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'
import GamingVideos from './components/GamingVideos'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import ThemeAndVideoContext from './context/ThemeAndVideoContext'
import TrendingVideos from './components/TrendingVideos'
import VideoDetailView from './components/VideoDetailView'
import config from './config'

// Replace your code here

class App extends Component {
  state = {
    savedVideos: [],
    isDarkTheme: false,
    activeTab: 'Home',
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, video]})
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  removeVideo = id => {
    const {savedVideos} = this.state
    const updatedSavedVideos = savedVideos.filter(
      eachVideo => eachVideo.id !== id,
    )
    this.setState({savedVideos: updatedSavedVideos})
  }

  render() {
    const {savedVideos, isDarkTheme, activeTab} = this.state
    // console.log(savedVideos)
    const clientId = config.googleClientId
    return (
      <GoogleOAuthProvider
        clientId={clientId}
        onScriptLoadError={() => console.log('Script load error')}
        onScriptLoadSuccess={() => console.log('Script loaded successfully')}
      >
        <ThemeAndVideoContext.Provider
          value={{
            savedVideos,
            isDarkTheme,
            activeTab,
            toggleTheme: this.toggleTheme,
            addVideo: this.addVideo,
            changeTab: this.changeTab,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoDetailView}
            />
            <ProtectedRoute exact path="/trending" component={TrendingVideos} />
            <ProtectedRoute exact path="/gaming" component={GamingVideos} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ThemeAndVideoContext.Provider>
      </GoogleOAuthProvider>
    )
  }
}

export default App
