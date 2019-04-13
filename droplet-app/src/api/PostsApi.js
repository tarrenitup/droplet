class PostsApi {

    /* GET */
    static getPosts() {
        return fetch('http://localhost:5000/posts').then(response => {
            return response.json()
        }).catch(error => {
            return error
        });
    }

    // TODO: Change the fetch call to nearby
    //static getMapPosts(lng, lat, meters){
    static getMapPosts(lng, lat, meters){
      console.log(lng)
      console.log(lat)
      console.log(meters)
      const url = 'http://localhost:5000/posts/nearby?lng=' + lng + '&lat=' + lat + '&meters=' + meters
      console.log(url)
      return fetch(url).then(response => {
          return response.json()
      }).catch(error => {
          return error
      });
    }

    static getSamplePosts() { // for development testing only.

        const post1 = {
            '_id': '012345',
            'username': 'Billy Bob',
            'content': 'Here is the sample post content with the writing the person did and here it is.',
            'created': 'Jan 1st, 2019',
            'postImage': 'http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg',
            'likes': '51'
        }

        const post2 = {
            '_id': '54321',
            'username': 'Jill Jillian',
            'content': 'More writings by a person who wrote them to put them on a post which you can read here.',
            'created': 'Feb 11th, 2019',
            'postImage': 'http://images4.fanpop.com/image/photos/19600000/Peter-Griffin-The-ultimate-Family-Guy-character-family-guy-characters-19628944-918-683.jpg',
            'likes': '517'
        }

        const post3 = {
            '_id': '34125',
            'username': 'Phil Bobsy',
            'content': 'The content which you will see when people post information to their location on this app.',
            'created': 'Feb 15th, 2019',
            'postImage': 'https://images-na.ssl-images-amazon.com/images/I/41XTp8JDV5L.jpg',
            'likes': '17'
        }

        return new Promise(
            (resolve, reject) => {
                resolve([post1, post2, post3])
            }
        )
    }

    /* POST */
    static addNewPost() {
        return fetch('http://localhost:5000/posts/5c82e1020206a50d84d97e42').then(response => {
            console.log(response.json())
            return response.json()
        }).catch(error => {
            return error
        });
    }
}

export default PostsApi;
