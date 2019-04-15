export default {
    loadingSpinner: false,
    overlay: false,
    newPostModal: { 
        visible: false,
        postTypeIndex: 0,
        profilePictureUrl: '',
        username: '@username',
        postContent: '',
        splashRangeIndex: 0,
    },
    backgroundOverlay: 0,
    themeId: 0,
    homePosts: [],
    mapPosts: [],
    likesPosts: [],
    profile: {
        profilePictureUrl: '',  /* get default image url. */
        username: '@username',
        blurb: 'I like books and long walks on the beach.',
        posts: [],
    }, 
    selectedPageIndex: 0,
}
