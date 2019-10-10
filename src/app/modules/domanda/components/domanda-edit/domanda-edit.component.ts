import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {Router} from '@angular/router';
import {StepAnagraficaComponent} from "..";

@Component({
  selector: 'app-domanda-edit',
  templateUrl: './domanda-edit.component.html',
  styleUrls: ['./domanda-edit.component.scss']
})
export class DomandaEditComponent implements OnInit {

  public moduloDomanda: FormGroup;

  @ViewChild(StepAnagraficaComponent, { static: false }) StepAnagraficaComponent: StepAnagraficaComponent;

  anagraficaValidity;
  qualificaSedeValidity;

  constructor(private fb: FormBuilder, private restApi: ApiService, private router: Router) {
    this.moduloDomanda = this.fb.group({
      anagrafica: this.fb.group({
        nome: [''],
        cognome: [''],
        dataNascita: [''],
        comuneNascita: [''],
        domicilio: ['', Validators.required],
        codiceFiscale: [''],
        telefono: ['', Validators.required],
        email: ['', Validators.required],
        sedeServizio: ['']
      })
    });

    this.anagraficaValidity =  this.moduloDomanda.controls.anagrafica;

  }

  ngOnInit(): void {}

  inviaDomanda() {
    console.log(this.restApi.domanda);
    this.restApi.salvaDomanda().subscribe(
        () => {
          this.router.navigate(['/domanda/visualizza']);
          console.log('inviata con successo');
        }
    );
  }


}
