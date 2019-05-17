import Auth from '../components/Auth/Auth.js'

class PostsApi {

    // static getLocation(){
        // let temp = [42,42];
        // if(navigator.geolocation){
            // navigator.geolocation.getCurrentPosition((position)=>{
                // temp = [position.coords.longitude, position.coords.latitude];
            // });
        // }
        // return temp;
    // }

    /* GET */
    static getPosts(location) {

        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token;


        return fetch('http://localhost:5000/posts/nearby?lng=' + location[0] + '&lat=' + location[1] + '&meters=1000',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error
        });

        // return fetch('http://localhost:5000/posts/',{
            // method: 'GET',
            // headers:{
                // 'Accept': 'application/json',
                // 'content-type': 'application/json',
                // 'Authorization': header
            // }
        // }).then(response => {
            // return response.json()
        // }).catch(error => {
            // return error
        // });
    }

    static getUserPosts(userID) {
        const fetchURL = 'http://localhost:5000/posts/getUserPosts/' + userID;

        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        return fetch(fetchURL,{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        }).then(response => {
            return response.json()
        }).then(data =>{
            return data.messages
        }).catch(error => {
            return error
        });
    }

    // TODO: Change the fetch call to nearby
    //static getMapPosts(lng, lat, meters){
    static getMapPosts(lng, lat, meters){
      const url = 'http://localhost:5000/posts/nearby?lng=' + lng + '&lat=' + lat + '&meters=' + meters

      const token = Auth.getCookie('token');
      const header = 'Bearer ' + token
      return fetch(url,{
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': header
          }
      }).then(response => {
          return response.json()
      }).catch(error => {
          return error
      });
    }

    static getAllMapPosts(lng, lat, meters){
      const url = 'http://localhost:5000/posts/nearbyAll?lng=' + lng + '&lat=' + lat + '&meters=' + meters

      const token = Auth.getCookie('token');
      const header = 'Bearer ' + token
      return fetch(url,{
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': header
          }
      }).then(response => {
          return response.json()
      }).catch(error => {
          return error
      });
    }

    static getYourLikedPosts(userID){
        const fetchURL = 'http://localhost:5000/posts/getUserPostsLikesInt/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        return fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        })
        .then(results => {
            return results.json()
        }).then(data =>{
            return data.messages
        })
        .catch((error) => {
            return error
        })
    }

    /* POST */
    static addNewPost(postData,userID) {
        const fetchURL = 'http://localhost:5000/posts/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        return fetch(fetchURL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            },
            body:JSON.stringify({
                content: postData.postContent,
                location: {
                    type: "Point",
                    coordinates: postData.currentLocation
                }
            })
        }).then(response => {
            return response.json()
        }).catch(error => {
            return error
        });
    }

/* Moved to card
    static addLike(postID){
        const userID = Auth.parseJwt(Auth.getCookie('token')).sub;
        const fetchURL = 'http://localhost:5000/posts/like/' + userID + '/' + postID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        return fetch(fetchURL,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        })
        .then(result =>{
            return result.json();
        })
        .then(data =>{
            return data;
        })
        .catch(error=>{
            return error
        })
    }
*/
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

}

export default PostsApi;
