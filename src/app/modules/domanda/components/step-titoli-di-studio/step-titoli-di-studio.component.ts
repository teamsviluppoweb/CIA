import {Component, OnInit, ViewChild} from '@angular/core';
import {Formazione} from '../../../../core/models/api.interface';
import {MatDialog, MatTable} from '@angular/material';
import {AggiungiDatiComponent} from './aggiungi-dati/aggiungi-dati.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ApiService} from "../../../../core/services/api/api.service";

const tabellaHeader = ['tipologia', 'titolo-di-studio', 'conseguito-presso', 'luogo', 'periodo-conseguimento', 'data-validazione'];
// tslint:disable-next-line:max-line-length
const tabellaHeaderEdit = ['tipologia', 'titolo-di-studio', 'conseguito-presso', 'luogo', 'periodo-conseguimento', 'data-validazione', 'edit'];

@Component({
  selector: 'app-step-titoli-di-studio',
  templateUrl: './step-titoli-di-studio.component.html',
  styleUrls: ['./step-titoli-di-studio.component.scss'],
  entryComponents: [AggiungiDatiComponent],
})
export class StepTitoliDiStudioComponent implements OnInit {

  @ViewChild('table', {static: false}) table: MatTable<Formazione>;

  anagraficaDatasource: Formazione[] = [];

  titoliDiStudioDichiarati: Formazione[] = [];

  TitoliDiStudioHeader: string[] = tabellaHeader;
  TitoliDiStudioHeaderEdit: string[] = tabellaHeaderEdit;

  constructor(private restApi: ApiService,
              public aggiungiDatiDialog: MatDialog) {}

  ngOnInit() {
    this.restApi.getFormazione().subscribe( (data: Formazione[]) => {
      this.anagraficaDatasource = data;
      this.titoliDiStudioDichiarati = data;
    });
  }


  openDialogAggiungiDati() {
    const obj = {
      tipologia: '',
      titoloDiStudio: '',
      indirizzo: '',
      dataDiConseguimento: '',
      istituto: '',
      luogo: '',
      periodoConseguimento: '',
      isOkToInsert: false,
    };

    const dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: '500px',
      width: '1100px',
      data: {data: obj},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {
      if(dataDialog) {
        if (dataDialog.data.isOkToInsert) {

          const formazione: Formazione = {
            tipologia: dataDialog.data.tipologia,
            titoloDiStudio: dataDialog.data.titoloDiStudio + ' ' + dataDialog.data.indirizzo,
            conseguitoPresso: dataDialog.data.istituto,
            luogo: dataDialog.data.luogo,
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
    console.log('dio');
    const prevIndex = this.titoliDiStudioDichiarati.findIndex((d) => {
      console.log('yahoo');
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
