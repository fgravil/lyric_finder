import React, { Component } from 'react'
import {Consumer} from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list, heading } = value;
          console.log(value);

          return !track_list || track_list.length === 0 ?
          <Spinner /> : 
          (
            <React.Fragment>
              <h3 className="text-center mb-4">{heading}</h3>
              <div className="row">
                {track_list.map( item =>
                    <Track key={item.track_id} track={item.track} />
                )}
              </div>
            </React.Fragment>
          )

        }}
      </Consumer>
    )
  }
}
