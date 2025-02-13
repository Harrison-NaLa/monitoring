export interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

// Auth
export interface AuthInterface {
    user: IUser;
    expires: number;
}

export interface UserInterface {
    name: string;
    email: string;
    image: string;
}

export interface AccessTokenResponseInterface {
    access_token: string
    token_type: string
    expires_in: number
}

// Artists

export type TimeRangeInterface = 'short_term' | 'medium_term' | 'long_term';

export interface ExternalUrlsInterface {
    spotify: string;
}

export interface FollowersInterface {
    href: any; // TODO: define type
    total: number;
}

export interface ImageItemInterface {
    height: number;
    url: string;
    width: number;
}

export interface ItemInterface {
    external_urls: ExternalUrlsInterface;
    followers: FollowersInterface;
    genres: string[];
    href: string;
    id: string;
    images: ImageItemInterface[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface TopArtistsInterface {
    items: ItemInterface[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string;
    previous: any;  // TODO: define type
}

// tracks

export interface ArtistInterface {
    external_urls: ExternalUrlsInterface;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}


export interface ExternalIdsInterface {
    isrc: string;
}

export interface AlbumInterface {
    album_type: string;
    artists: ArtistInterface[];
    available_markets: string[];
    external_urls: ExternalUrlsInterface;
    href: string;
    id: string;
    images: ImageItemInterface[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface ItemAlbumInterface {
    album: AlbumInterface;
    artists: ArtistInterface[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIdsInterface;
    external_urls: ExternalUrlsInterface;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: any; // TODO: define type
    track_number: number;
    type: string;
    uri: string;
}

export interface TopTracksInterface {
    items: ItemAlbumInterface[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string;
    previous: any; // TODO: define type
}
