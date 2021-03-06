import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui';
import {Card, CardTitle} from 'material-ui/Card';
import logo from '../logo.svg'

import { handleLibraryImport, handleModeChange } from '../actions/index';
import axios from 'axios';

const style = {
  display: "block",
  textAlign: "center",
  width: "500px",
  marginTop: "30%"
}

const color = '#b6a6cd';
// const color = '#24cf5f';

class GetLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  async componentWillMount() {
    this.updateLibrary();
  }

  async updateLibrary() {
    this.setState({loading: true});
    try {
      await axios.get('/api/updateLibrary')
      let { data } = await axios.get('/api/albums')
      this.props.importLibrary(data.library);
      this.props.changeMode('home');
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let welcomeString = this.props.library.length === 0 ? 'Welcome, ' : 'Welcome back, ';
    let name = this.props.displayName ? this.props.displayName.split(" ")[0] : this.props.spotifyID;
    return <div style={style}>
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{width: "500px"}}
        />
        <Card>
        <CardTitle
          title={`${welcomeString} ${name}.`}
          subtitle={this.props.library.length === 0 ?
            "Preparing your music library. This could take a few minutes..." :
            "Updating your music Library. This should take a few minutes..."
          }
        />
        {this.state.loading ? <CircularProgress color={color}/> : null}
      </Card>
    </div>
  }
}

const mapStateToProps = ({ displayName, photo, library, spotifyID }) => ({ displayName, photo, library, spotifyID });

const mapDispatchToProps = dispatch => ({
  importLibrary: (library) => {
    dispatch(handleLibraryImport(library));
  },
  changeMode: (mode) => {
    dispatch(handleModeChange(mode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GetLibrary);
