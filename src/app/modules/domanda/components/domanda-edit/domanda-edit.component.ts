import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-domanda-edit',
  templateUrl: './domanda-edit.component.html',
  styleUrls: ['./domanda-edit.component.scss']
})
export class DomandaEditComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private restApi: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    });
  }

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
