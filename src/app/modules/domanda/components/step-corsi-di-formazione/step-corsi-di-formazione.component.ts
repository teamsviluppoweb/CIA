import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {Corsi, Formazione} from '../../../../core/models/api.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AggiungiCorsiComponent} from './aggiungi-corsi/aggiungi-corsi.component';
import {ApiService} from '../../../../core/services/api/api.service';


const tabellaHeader = ['nomeCorso', 'durataCorso', 'dataDiConseguimento', 'istituto', 'luogo', 'periodoConseguimento'];
// tslint:disable-next-line:max-line-length
const tabellaHeaderEdit = ['nomeCorso', 'durataCorso', 'dataDiConseguimento', 'istituto', 'luogo', 'periodoConseguimento', 'edit'];

@Component({
  selector: 'app-step-corsi-di-formazione',
  templateUrl: './step-corsi-di-formazione.component.html',
  styleUrls: ['./step-corsi-di-formazione.component.scss'],
  entryComponents: [AggiungiCorsiComponent],
})
export class StepCorsiDiFormazioneComponent implements OnInit {
  @ViewChild('table', {static: false}) table: MatTable<Formazione>;

  corsiRisultanti: Corsi[] = [];

  corsiDichiarati: Corsi[] = [];

  TitoliDiStudioHeader: string[] = tabellaHeader;
  TitoliDiStudioHeaderEdit: string[] = tabellaHeaderEdit;

  constructor(private restApi: ApiService,
              public aggiungiDatiDialog: MatDialog) {}

  ngOnInit() {
    this.restApi.getCorsi().subscribe( (data: Corsi[]) => {
      this.corsiRisultanti = data;
      this.corsiDichiarati = data;
    });
  }


  openDialogAggiungiDati() {
    const obj = {
      nomeCorso: '',
      durataCorso: '',
      dataDiConseguimento: '',
      istituto: '',
      luogo: '',
      periodoConseguimento: '',
      isOkToInsert: false,
    };

    const dialogRef = this.aggiungiDatiDialog.open(AggiungiCorsiComponent, {
      height: '350px',
      width: '1100px',
      data: {data: obj},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {

      if (dataDialog) {
        if (dataDialog.data.isOkToInsert === true) {

          console.log(dataDialog.data);

          const corsoDichiarato: Corsi = {
            nomeCorso: dataDialog.data.nomeCorso,
            durataCorso: dataDialog.data.durataCorso,
            dataDiConseguimento: dataDialog.data.dataDiConseguimento,
            istituto: dataDialog.data.istituto,
            luogo: dataDialog.data.luogo,
            periodoConseguimento: dataDialog.data.periodoConseguimento,
          };

          console.log('inseriiimento');

          this.corsiDichiarati = [corsoDichiarato].concat(this.corsiDichiarati);
        }

      }

    });
  }

  dropTable(event: CdkDragDrop<Formazione[]>) {
    console.log('dio');
    const prevIndex = this.corsiDichiarati.findIndex((d) => {
      console.log('yahoo');
      return d === event.item.data;
    });
    moveItemInArray(this.corsiDichiarati, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  deleteRow(index) {
    this.corsiDichiarati.splice(index, 1);
    // trigger updated array in mat data table
    this.corsiDichiarati = this.corsiDichiarati.slice();
  }
}