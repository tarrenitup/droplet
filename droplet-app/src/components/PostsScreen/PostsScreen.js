import React, {Component} from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import PropTypes from 'prop-types'
import PostList from '../PostList/PostList'
import { loadHomePosts } from '../../actions/postActions'
import {updateTime, homePage} from '../../actions/miscActions'

class PostsScreen extends Component{
    constructor(props){
        super(props);
        if(Array.isArray(this.props.location) && this.props.location.length === 2){
            this.props.dispatch(loadHomePosts(this.props.location));
        }
        this.props.dispatch(homePage());
        this.props.dispatch(updateTime());
    }

    render(){
        return(
            <main className='posts-screen screen'>
               <PostList posts={this.props.homePosts} like={false} />
            </main>
        )
    }
}

/*
const PostsScreen = (props) => {
    props.dispatch(loadHomePosts());
    return(
    <main className='posts-screen screen'>
       <PostList homePosts={props.homePosts} />
    </main>
    );
}*/

PostsScreen.propTypes = {
    homePosts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        homePosts: state.homePosts,
        location: state.location
    }
}

export default connect(mapStateToProps)(PostsScreen);
