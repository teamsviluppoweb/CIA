import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {AggiungiDatiComponent} from './aggiungi-dati/aggiungi-dati.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ApiService} from '../../../../core/services/api/api.service';
import {Observable, of} from 'rxjs';
import {Formazione} from '../../../../core/models/api.interface';
import { TitoliStudioPossedutiInterface} from '../../../../core/models/domanda.interface';

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
    this.restApi.getDomanda().subscribe(
        (data) => {

          let tit = data['domanda'];
          tit =  tit['titoliStudioPosseduti'];

          console.log(tit.length);

          for (let titKey in tit) {
            let volatileData = tit[titKey];

            const obj = {
              tipologia: '',
              titoloDiStudio: '',
              indirizzo: '',
              dataDiConseguimento: '',
              istituto: '',
              luogo: '',
              provincia: '',
              comune: '',
              periodoConseguimento: '',
              isOkToInsert: false,
              isEditing: false,
            };
          }



         // this.titoliDiStudioDichiarati = [dataDialog.data].concat(this.titoliDiStudioDichiarati);


        }


    );
  }

  ngOnInit() {
  }


  openDialogEditDati(index) {
    this.titoliDiStudioDichiarati[index].isEditing = true;
    let dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: 'auto',
      width: '1300px',
      data: {data: this.titoliDiStudioDichiarati[index]},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {
      if (dataDialog) {
        if (dataDialog.data.isOkToInsert) {

          this.titoliDiStudioDichiarati[index] = dataDialog.data;
          this.titoliDiStudioDichiarati = this.titoliDiStudioDichiarati.slice();

        }
      }

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
      provincia: '',
      comune: '',
      periodoConseguimento: '',
      isOkToInsert: false,
      isEditing: false,
    };

    let dialogRef = this.aggiungiDatiDialog.open(AggiungiDatiComponent, {
      height: 'auto',
      width: '1300px',
      disableClose: true,
      data: {data: obj},
    });

    dialogRef.afterClosed().subscribe(dataDialog => {
      if (dataDialog) {
        if (dataDialog.data.isOkToInsert) {

          console.log(dataDialog.data);
          this.titoliDiStudioDichiarati = [dataDialog.data].concat(this.titoliDiStudioDichiarati);
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

  edit(index) {
    this.openDialogEditDati(index);
  }
}
