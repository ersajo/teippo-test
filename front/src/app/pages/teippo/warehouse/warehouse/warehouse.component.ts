import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  source: LocalDataSource;
  loading: boolean = false;

  settings: {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>',
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>',
        },
      ],
    },
    pager: {
      perPage: 10,
    },
    columns: {
      name: {
        title: 'id',
        filter: true,
      },
      email: {
        title: 'Code',
        filter: true,
      },
      role: {
        title: 'Name',
        filter: true,
      },
    },
  };

  constructor(
  ) { }

  ngOnInit() {
    this.getWarehouses();
  }

  getRequest(url: string): Promise<any> {
  return new Promise<any>(
    function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error('XMLHttpRequest Error: ' + this.statusText));
      };
      request.open('GET', url);
      request.send();
    });
  }
    

  async getWarehouses() {
    this.loading = true;
    
    this.getRequest('http://localhost:5000/api/warehouse')
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    
    this.loading = false;
  }

}
