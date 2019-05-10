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
    likedPosts: [],
    time: new Date(),
    profile: {
        profilePictureUrl: '',  /* get default image url. */
        username: '@username',
        bio: '',
        posts: [],
    },
    selectedPageIndex: 0,
}
