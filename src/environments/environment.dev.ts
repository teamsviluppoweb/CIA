// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    requestUrl: '127.0.0.1',
    endpoints: {
        backendLocation: 'http://webpc.dipvvf.it:6001/',
        corsi: 'corsi',
        corsiByCf: 'CorsiByCF',
        qualifiche: 'Qualifiche',
        sedi: 'Sedi',
        titoliDiStudiobyCf: 'TitoliStudiobyCF',
        titoliStudioTipologie: 'TitoliStudio/Tipologie',
        titoliStudioTitoli: 'TitoliStudio/Titoli',
        titoliStudioIndirizzi: 'TitoliStudio/Indirizzi',
        province: 'Province',
        comuni: 'Province',
        getDommanda: 'GetDomanda',
        inviaDomanda: 'SalvaDomanda'
    },
    fakeEndpoints: {
        backendLocation: 'http://localhost:8080/',
        whoami: 'whoami',
    },
    apicall: {
        'titoli-formazione': 'http://localhost:8080/titolo-studio',
        'qualifica-sede': 'http://localhost:8080/qualifica-sede',
        'corsi-formazione': 'http://localhost:8080/corsi-formazione',
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
