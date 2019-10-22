// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  requestUrl: '127.0.0.1',
  endpoints: {
    backendLocation: 'http://webpc.dipvvf.it:6001/',
    corsi: 'corsi',
    qualifiche: 'qualifiche',
    sedi: 'sedi',
    tipologieTitoliStudio: 'titoliStudio/tipologie/',
    titoliTitoloStudio: 'TitoliStudio/Titoli/',
    indirizziTitoliStudio: 'TitoliStudio/Indirizzi/',
    province: 'province',
    comuni: 'province/',
    visualizzaDomanda: 'getDomanda',
    salvaDomanda: 'salvaDomanda',
    info: 'info',
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
