import {actions} from '../Types';
import Constants from "../utils/Constants";

const {
	MasterDrawerMenuType,
	CoordinateFormat,
	SearchPlaceSectionType,
	PlaceType,
} = Constants;

export const initialState = {
    userConfig: {
		selectedMenuType: MasterDrawerMenuType.Search,
	},
	userPref: {
		appSettings: {
			coordinateFormat: CoordinateFormat.DecDeg,
			searchPlaceFrom: [
				PlaceType.City,
				PlaceType.State,
				PlaceType.Country,
			],
			searchPlaceSectionArray: [
				SearchPlaceSectionType.InputCoordinates,
				SearchPlaceSectionType.PlaceDetails,
				SearchPlaceSectionType.CountryDetails,
				SearchPlaceSectionType.TimeZoneDetails,
				SearchPlaceSectionType.FavouritePlaces,
			],
			enableDayNightMode: true,
		},
		favPlaceArray: [],
		isMasterAppLoading: false,
	},
    Strings: {
        /*  Master Drawer Main Menu Title    */
        /*  Master Module Title    */
        /*  Module Title    */
    },
};