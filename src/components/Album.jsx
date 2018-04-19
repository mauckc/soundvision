import React from 'react';
import Track from './Track';
import { Paper, List } from 'material-ui';

export default class Album extends React.Component {
  render() {
    const { album } = this.props;
    return (
        <Paper className="album">
          <div>
            <Paper style={{padding: "5px"}}>
              <img alt="" src={album.images[1].url} height="200" width="200"/>
            </Paper>
          </div>
          <div className="info">
            <b>
              {album.name} ({album.release_date.slice(0,4)})
            </b><br/>
              {album.artists[0].name}
            <List>
              {album.tracks.items.map(track => <Track track={track} key={track.id}/>)}
            </List>
          </div>
        </Paper>
    )
  }
}
