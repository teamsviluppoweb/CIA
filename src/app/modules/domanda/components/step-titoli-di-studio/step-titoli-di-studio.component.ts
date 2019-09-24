import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {AggiungiDatiComponent} from './aggiungi-dati/aggiungi-dati.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ApiService} from '../../../../core/services/api/api.service';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Formazione} from '../../../../core/models/api.interface';
import {DomandaInterface, TitoliStudioPossedutiInterface} from '../../../../core/models/domanda.interface';

// tslint:disable-next-line:max-line-length
const tabellaHeader = ['anno', 'titolo-di-studio', 'conseguito-presso', 'edit'];

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
              public aggiungiDatiDialog: MatDialog) {}

  ngOnInit() {
    /**
     *  this.$titoliDiStudio = this.restApi.getDomanda().pipe(
     map(
     (x: DomandaInterface) => {
             return x.titoliStudioPosseduti;
           }
     )
     );
     */
  }


  openDialogAggiungiDati() {
    const obj = {
      tipologia: '',
      titoloDiStudio: '',
      indirizzo: '',
      dataDiConseguimento: '',
      istituto: '',
      provincia: '',
      comune: '',
      periodoConseguimento: '',
      isOkToInsert: false,
    };

    const dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: '650px',
      width: '1300px',
      data: {data: obj},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {
      if (dataDialog) {
        if (dataDialog.data.isOkToInsert) {


          let titoloStudioTemp;

          if (dataDialog.data.indirizzo === null) {
            titoloStudioTemp = dataDialog.data.titoloDiStudio.desc;
          } else {
            titoloStudioTemp = dataDialog.data.titoloDiStudio.desc + ' ' + dataDialog.data.indirizzo.desc;
          }

          const formazione: Formazione = {
            tipologia: dataDialog.data.tipologia,
            titoloDiStudio: titoloStudioTemp,
            conseguitoPresso: dataDialog.data.istituto,
            luogo: dataDialog.data.provincia.provincia +  '(' + dataDialog.data.comune.comune + ')',
            periodoConseguimento: dataDialog.data.periodoConseguimento,
            dataValidazione: dataDialog.data.dataDiConseguimento,
          };

          console.log('inseriiimento');
          console.log()

          this.titoliDiStudioDichiarati = [formazione].concat(this.titoliDiStudioDichiarati);
        }
      }
    });
  }

  dropTable(event: CdkDragDrop<Formazione[]>) {
    const prevIndex = this.titoliDiStudioDichiarati.findIndex((d) => {
      return d === event.item.data;
    });
    moveItemInArray(this.titoliDiStudioDichiarati, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  deleteRow(index) {
    this.titoliDiStudioDichiarati.splice(index, 1);
    // trigger updated array in mat data table
    this.titoliDiStudioDichiarati = this.titoliDiStudioDichiarati.slice();
  }
}
