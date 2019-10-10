import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from "../../../../core/services/api/api.service";

@Component({
  selector: 'app-domanda-edit',
  templateUrl: './domanda-edit.component.html',
  styleUrls: ['./domanda-edit.component.scss']
})
export class DomandaEditComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private restApi: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    });
  }

  inviaDomanda() {
    console.log(this.restApi.domanda);
    this.restApi.salvaDomanda().subscribe(
        () => {
          console.log('inviata con successo');
        }
    );
  }

}
