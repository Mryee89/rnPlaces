import { getGooglePlacesUrl, getGooglePlaceDetailsUrl } from "@/constant/url";

export const getPlacesApi = async (query: string) => {
  try {
    const response = await fetch(getGooglePlacesUrl(query));

    const data = await response.json();

    return data.predictions.map((p: any) => ({
      place_id: p.place_id,
      name: p.structured_formatting.main_text,
      description: p.description,
    }));

  } catch (error) {
    // console.error('API Error:', error);
    return [];
  }
};



export const getPlacesDetailApi = async (place_id: string) => {
  try {
    const response = await fetch(getGooglePlaceDetailsUrl(place_id));

    const data = await response.json();

    if (!data.result) {
      // console.error('Invalid API response:', data);
      return null;
    }

    return {
      place_id: data.result.place_id,
      name: data.result.name,
      description: data.result.description,
      address: data.result.formatted_address,
      latitude: data.result.geometry.location.lat,
      longitude: data.result.geometry.location.lng,
    };

  } catch (error) {
    // console.error('API Error:', error);
    return null;
  }
};