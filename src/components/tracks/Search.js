import React, { Component } from 'react'
import axios from 'axios';
import {Consumer} from '../../context';

const styles = {
    dropdownItem: {
        cursor: 'pointer'
    }
}
export default class Search extends Component {
    searchByOptions = ['Artist', 'Song'];
    state = {
        searchBy: 'Song',
        trackInfo: ''
    }

    findTrack = (dispatch, e) => {
        let {searchBy, trackInfo} = this.state;
        searchBy = searchBy === 'Song' ? 'track' : searchBy.toLowerCase();
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/${searchBy}.search?q_${searchBy}=${trackInfo}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });
            this.setState({...this.state, trackInfo: ''});
        })
        .catch(err => console.log(err));
    }
    
    onChange = e => {
        this.setState({trackInfo: e.target.value});
    }

    updateSearchBy = (searchBy) => {
        console.log(searchBy);
        this.setState({...this.state, searchBy: searchBy})
    }

    render() {
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-4 p4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For a Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, value.dispatch)}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div class="input-group-prepend">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.searchBy}
                                            </button>
                                            <div class="dropdown-menu">
                                                {
                                                    this.searchByOptions.map((value, index) => 
                                                        <li 
                                                            key={index} 
                                                            className="dropdown-item" 
                                                            style={styles.dropdownItem}
                                                            onClick={() => this.updateSearchBy(value)}>
                                                            {value}
                                                        </li>
                                                    )
                                                }
                                            </div>
                                            </div>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            placeholder={`${this.state.searchBy} name...`}
                                            name="title"
                                            value={this.state.trackInfo} 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
