class PostsApi {  
    static getPosts() {
        return fetch('http://localhost:5000/posts').then(response => {
            return response.json()
        }).catch(error => {
            return error
        });
    }
}

export default PostsApi; 
