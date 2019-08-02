import {Component, OnInit, ViewChild} from '@angular/core';
import {Domanda, Formazione, TitoliStudioPossedutiEntity} from '../../../../core/models/api.interface';
import {MatDialog, MatTable} from '@angular/material';
import {AggiungiDatiComponent} from './aggiungi-dati/aggiungi-dati.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ApiService} from '../../../../core/services/api/api.service';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

// tslint:disable-next-line:max-line-length
const tabellaHeader = ['anno', 'titolo-di-studio', 'conseguito-presso'];

@Component({
  selector: 'app-step-titoli-di-studio',
  templateUrl: './step-titoli-di-studio.component.html',
  styleUrls: ['./step-titoli-di-studio.component.scss'],
})
export class StepTitoliDiStudioComponent implements OnInit {

  @ViewChild('table', {static: false}) table: MatTable<Formazione>;

  anagraficaDatasource: Formazione[] = [];

  $titoliDiStudio: Observable<TitoliStudioPossedutiEntity[]> = of([]);
  titoliDiStudioDichiarati = [];

  TitoliDiStudioHeader: string[] = tabellaHeader;

  constructor(private restApi: ApiService,
              public aggiungiDatiDialog: MatDialog) {}

  ngOnInit() {
   this.$titoliDiStudio = this.restApi.getDomanda().pipe(
       map(
           (x: Domanda) => {
             return x.titoliStudioPosseduti;
           }
       )
   );
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

          const formazione: Formazione = {
            tipologia: dataDialog.data.tipologia,
            titoloDiStudio: dataDialog.data.titoloDiStudio.desc + ' ' + dataDialog.data.indirizzo.desc,
            conseguitoPresso: dataDialog.data.istituto,
            luogo: dataDialog.data.provincia.provincia +  '(' + dataDialog.data.comune.comune + ')',
            periodoConseguimento: dataDialog.data.periodoConseguimento,
            dataValidazione: dataDialog.data.dataDiConseguimento,
          };

          console.log('inseriiimento');

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
