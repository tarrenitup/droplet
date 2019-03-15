export default {
    loadingSpinner: 0,
    header: {
        themeId: 0,
    },
    pages: [
        {
            name: 'home',
            posts: [],
        },
        {
            name: 'map',
            posts: [],
        },
        {
            name: 'new',
            postTypeId: 0,
            profilePictureUrl: '', /* get default image url. */
            username: '@username',
            postContent: '',
            splashRangeIndex: 0,
        },
        {
            name: 'likes',
            posts: [],
        },
        {
            name: 'profile',
            profilePictureUrl: '',  /* get default image url. */
            username: '@username',
            blurb: 'I like books and long walks on the beach.',
            posts: [],
        },
    ],
    footer: {
        selectedPageIndex: 0,
    }
}
