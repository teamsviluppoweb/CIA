import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {AggiungiDatiComponent} from './aggiungi-dati/aggiungi-dati.component';
import {ApiService} from '../../../../core/services/api/api.service';
import {Observable, of} from 'rxjs';
import {Formazione} from '../../../../core/models/api.interface';
import {TitoliStudioPossedutiInterface} from '../../../../core/models/domanda.interface';

// tslint:disable-next-line:max-line-length
const tabellaHeader = ['anno', 'titolo-di-studio', 'conseguito-presso', 'delete', 'edit'];




@Component({
  selector: 'app-step-titoli-di-studio',
  templateUrl: './step-titoli-di-studio.component.html',
  styleUrls: ['./step-titoli-di-studio.component.scss'],
})
export class StepTitoliDiStudioComponent implements OnInit {

  @ViewChild('table', {static: false}) table: MatTable<Formazione>;

  anagraficaDatasource: Formazione[] = [];

  $titoliDiStudio: Observable<TitoliStudioPossedutiInterface[]> = of([]);
  titoliDiStudioDichiarati = [];

  TitoliDiStudioHeader: string[] = tabellaHeader;



  constructor(private restApi: ApiService,
              public aggiungiDatiDialog: MatDialog) {

    /*
    i flag editing mi servono per gestire la logica nel modal, durante il popolamento delle dropdown list dipendenti
     */
    this.restApi.getDomanda(false,false).subscribe( x => {
        if (this.restApi.domanda.stato === 1) {
          this.restApi.domanda.titoliStudioPosseduti.map(t => {
            const obj = {
              tipologia: {
                id: t.tipologia.id,
                desc: t.tipologia.desc,
              },
              titolo: {
                id: t.titolo.id,
                desc: t.titolo.desc,
              },
              indirizzo: {
                id: t.indirizzo.id,
                desc: t.indirizzo.desc,
              },
              dataConseguimento: t.dataConseguimento,
              istituto: t.istituto,
              luogoIstituto: {
                codice: t.luogoIstituto.codiceProvincia,
                nome: t.luogoIstituto.nome,
                codiceProvincia: t.luogoIstituto.codiceProvincia,
              },
              durataAnni: t.durataAnni,
              isOkToInsert: false,
              isEditing: false,
              isTitoloE: false,
              isIndirizzoE: false,
              isComuneE: false,
            };

            this.titoliDiStudioDichiarati = [obj].concat(this.titoliDiStudioDichiarati);


          });
        }
      }
    );

  }

  ngOnInit() {
  }


  openDialogEditDati(index) {
    this.titoliDiStudioDichiarati[index].isEditing = true;
    this.titoliDiStudioDichiarati[index].isTitoloE = true;
    this.titoliDiStudioDichiarati[index].isIndirizzoE = true;
    this.titoliDiStudioDichiarati[index].isComuneE = true;
    const dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: 'auto',
      width: '1300px',
      data: {data: this.titoliDiStudioDichiarati[index]},
    });


    dialogRef.afterClosed().subscribe(dataDialog => {
      if (dataDialog) {
        if (dataDialog.data.isOkToInsert) {

          this.titoliDiStudioDichiarati[index] = dataDialog.data;
          this.titoliDiStudioDichiarati = this.titoliDiStudioDichiarati.slice();


          this.restApi.domanda.titoliStudioPosseduti = this.titoliDiStudioDichiarati;

          // Cancello le chiavi non necessarie
          const key1 = 'isOkToInsert';
          const key2 = 'isEditing';
          const key3 = 'isTitoloE';
          const key4 = 'isIndirizzoE';
          const key5 = 'isComuneE';

          this.restApi.domanda.titoliStudioPosseduti.map(x => {
            delete x[key1];
            delete x[key2];
            delete x[key3];
            delete x[key4];
            delete x[key5];
          });


          console.log(this.restApi.domanda);

        }
      }

    });
  }


  openDialogAggiungiDati() {
    const obj = {
      tipologia: {
        id: '',
        desc: '',
      },
      titolo: {
        id: '',
        desc: '',
      },
      indirizzo: {
        id: '',
        desc: ''
      },
      dataConseguimento: '',
      istituto: '',
      luogoIstituto: {
        codice: '',
        nome: '',
        codiceProvincia: '',
      },
      durataAnni: '',
      isOkToInsert: false,
      isEditing: false,
      isTitoloE: false,
      isIndirizzoE: false,
      isComuneE: false,
    };

    const dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: 'auto',
      width: '1300px',
      disableClose: true,
      data: {data: obj},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {
      if (dataDialog) {
        if (dataDialog.data.isOkToInsert) {

          this.titoliDiStudioDichiarati = [dataDialog.data].concat(this.titoliDiStudioDichiarati);
          this.restApi.domanda.titoliStudioPosseduti = this.titoliDiStudioDichiarati;



          // Cancello le chiavi non necessarie
          const key1 = 'isOkToInsert';
          const key2 = 'isEditing';
          const key3 = 'isTitoloE';
          const key4 = 'isIndirizzoE';
          const key5 = 'isComuneE';

          this.restApi.domanda.titoliStudioPosseduti.map(x => {
            delete x[key1];
            delete x[key2];
            delete x[key3];
            delete x[key4];
            delete x[key5];
          });

          console.log(this.restApi.domanda);
        }
      }

    });
  }


  deleteRow(index) {
    this.titoliDiStudioDichiarati.splice(index, 1);
    // trigger updated array in mat data table
    this.titoliDiStudioDichiarati = this.titoliDiStudioDichiarati.slice();
    this.restApi.domanda.titoliStudioPosseduti = this.titoliDiStudioDichiarati;
  }

  edit(index) {
    this.openDialogEditDati(index);
  }
}
