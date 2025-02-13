export const ConfigUrls = {
    auth: {
        login: `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/token`,
        me: {
            playlists: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/playlists`,
        }
    },
    tracks: {
        getById: `${process.env.NEXT_PUBLIC_API_URL}/tracks`,
    },
    album: {
        all: `${process.env.NEXT_PUBLIC_API_URL}/browse/albums`,
    }
}