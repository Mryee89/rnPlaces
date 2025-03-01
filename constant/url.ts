import { GOOGLE_API_KEY } from "./apiKey";

export const getGooglePlacesUrl = (query: string) =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_API_KEY}`;

export const getGooglePlaceDetailsUrl = (placeId: string) =>
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;