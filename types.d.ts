export interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

// Auth
export interface AuthInterface {
    user: UserInterface;
    expires: number;
}

export interface UserInterface {
    name: string;
    email: string;
    image: string;
}

export interface AccessTokenResponseInterface {
    access_token: string;
    token_type: string;
    expires_in: number;
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

export interface SpotifyTrackItem {
    added_at: string;
    track: SpotifyTrack;
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: SpotifyExternalIds;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: Record<string, unknown>;
    restrictions?: SpotifyRestrictions;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: SpotifyRestrictions;
    type: string;
    uri: string;
    artists: SpotifyArtist[];
}

export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

export interface SpotifyRestrictions {
    reason: string;
}

export interface SpotifyResponseApi<T = SpotifyTrackItem[]> {
    limit: number;
    items: T;
}


// albums


export interface SpotifyAlbumItem {
    added_at: string;
    album: SpotifyAlbumDetail;
}

export interface SpotifyAlbumDetail {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: SpotifyRestrictions;
    type: string;
    uri: string;
    artists: SpotifyArtist[];
    tracks: SpotifyTrackCollection;
    copyrights: SpotifyCopyright[];
    external_ids: SpotifyExternalIds;
    genres: string[];
    label: string;
    popularity: number;
}

export interface SpotifyTrackCollection {
    href: string;
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
    items: SpotifyAlbumTrackItem[];
}

export interface SpotifyAlbumTrackItem {
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: SpotifyLinkedFrom;
    restrictions?: SpotifyRestrictions;
    name: string;
    preview_url?: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyLinkedFrom {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

export interface SpotifyRestrictions {
    reason: string;
}

export interface SpotifyCopyright {
    text: string;
    type: string;
}
