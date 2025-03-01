import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { getPlacesApi, getPlacesDetailsApi } from '@/utils/api';

interface Place {
  place_id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const { setPlaces } = placesSlice.actions;
export default placesSlice.reducer;

// async using redux thunk
export const fetchPlaces = (query: string) => async (dispatch: AppDispatch) => {

  if (!query.trim()) {
    dispatch(setPlaces([])); // clear the places list when input is empty
    return;
  }

  try {
    const placeData = await getPlacesApi(query);

    if (placeData.length === 0) {
      dispatch(setPlaces([]));
      return;
    }

    const placesWithDetails = await Promise.all(
      placeData.map(async (p: any) => {
        const detailsData = await getPlacesDetailsApi(p.place_id);

        if (detailsData) {
          return {
            ...p, address: detailsData.address, latitude: detailsData.latitude, longitude: detailsData.longitude
          };
        }

        return null;
      })
    );

    const validPlaces = placesWithDetails.filter((place) => place !== null);
    dispatch(setPlaces(validPlaces));

  } catch (error) {
    console.error('Error fetching places:', error);
  }
};
