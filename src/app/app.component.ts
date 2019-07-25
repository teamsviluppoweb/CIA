import {Component, OnInit} from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cas-doppelganger';

  name: string;
  password: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) {
      console.log('ESISTE JWT');
      const jwt = localStorage.getItem('jwt');
      console.log('QUESTO E IL JWT', jwt);

      this.http.get('http://localhost:8080/whoami').subscribe((x) => {
          console.log(x);
        },
        (x) => {
          console.log('INVALID TOKEN');
        });
    }

  }

  onSubmit() {
    console.log(this.name, this.password);

    const u = this.name;
    const p = this.password;

    this.http.post<any>(`http://localhost:8080/login`,
      {
        username: u,
        password: p
      }).subscribe((x) => {
      console.log(x.token);
      localStorage.setItem('jwt', x.token);
      window.location.href = 'http://172.16.26.72:4200/domanda/edit?ticket=JWT-' + x.token;
    });
  }
}
