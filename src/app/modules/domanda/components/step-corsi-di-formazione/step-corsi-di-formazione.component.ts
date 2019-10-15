import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {Corsi, Formazione} from '../../../../core/models/api.interface';
import {AggiungiCorsiComponent} from './aggiungi-corsi/aggiungi-corsi.component';
import {ApiService} from '../../../../core/services/api/api.service';


const tabellaHeader = ['nomeCorso', 'durataCorso', 'dataDiConseguimento', 'istituto', 'luogo', 'periodoConseguimento'];
// tslint:disable-next-line:max-line-length
const tabellaHeaderEdit = ['nomeCorso', 'durataCorso', 'dataDiConseguimento', 'istituto', 'luogo', 'periodoConseguimento', 'delete', 'edit'];

@Component({
  selector: 'app-step-corsi-di-formazione',
  templateUrl: './step-corsi-di-formazione.component.html',
  styleUrls: ['./step-corsi-di-formazione.component.scss'],
})
export class StepCorsiDiFormazioneComponent implements OnInit {
  @ViewChild('table', {static: false}) table: MatTable<Formazione>;


  corsiDichiarati: Corsi[] = [];

  TitoliDiStudioHeader: string[] = tabellaHeader;
  TitoliDiStudioHeaderEdit: string[] = tabellaHeaderEdit;

  constructor(private restApi: ApiService,
              public aggiungiDatiDialog: MatDialog) {}

  ngOnInit() {

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
      isEditing: false,
    };

    const dialogRef = this.aggiungiDatiDialog.open(AggiungiCorsiComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,
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


  openDialogEditDati(obj, index) {

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

          this.corsiDichiarati[index] = corsoDichiarato;
          this.corsiDichiarati = this.corsiDichiarati.slice();
        }

      }

    });
  }


  deleteRow(index) {
    this.corsiDichiarati.splice(index, 1);
    // trigger updated array in mat data table
    this.corsiDichiarati = this.corsiDichiarati.slice();
  }

  edit(index) {

    console.log(this.corsiDichiarati[index].nomeCorso);


    const obj = {
      nomeCorso: this.corsiDichiarati[index].nomeCorso,
      durataCorso: this.corsiDichiarati[index].durataCorso,
      dataDiConseguimento: this.corsiDichiarati[index].dataDiConseguimento,
      istituto: this.corsiDichiarati[index].istituto,
      luogo: this.corsiDichiarati[index].luogo,
      periodoConseguimento: this.corsiDichiarati[index].periodoConseguimento,
      isOkToInsert: false,
      isEditing: true,
    };




    this.openDialogEditDati(obj, index);
  }
}
