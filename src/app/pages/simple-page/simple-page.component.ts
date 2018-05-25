import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
/*import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../shared/chartData';*/
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { API_ENDPOINT } from '../../app.constants';
@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent implements OnInit {

  public sub: any;
  public data: any;
  public basic: boolean;
  public pname: any;
  public dataprojects: any;
  public upload: boolean;
  public uploadPaths = [];
  public selected: string;
  private ProjectsArray: Array<any> = [];
  public ProjectsUploadArray: Array<any> = [];
  public ProjectName: any;
  public showdivsucc: boolean;
  public showdivfail: boolean;
  public deleteSuccess: boolean;
  //  address :string;
  public Projects = ['WorkspaceUsers', 'WorkspaceShared'];
  filesToUpload: Array<File> = [];
  // relativePath :string;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.basic = true;
    this.upload = false;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        // Defaults to 0 if no query param provided.
        this.pname = params['project'];
        console.log(this.pname);
      });
    this.GetListProjectUpload('userX');
  }

  GetListProjectUpload(username: string) {
    this.http.get('http://' + API_ENDPOINT + ':9935/GetListProjectUpload?project_upload_owner=' + username).subscribe(data => {
      this.dataprojects = data;
      for (const elt of this.dataprojects.resultSet.record) {
        this.ProjectsUploadArray.push(elt);
      }
      console.log(this.ProjectsUploadArray);
    });
      this.http.get('http://' + API_ENDPOINT + ':8084/GetProject?Username=' + username).subscribe(data => {
        this.dataprojects = data;
        for (const elt of this.dataprojects.resultSet.record) {
          this.ProjectsArray.push(elt);
        }
        console.log(this.ProjectsArray);
      });
  }
  OnUpload(name2: string) {
    //this.router.navigate(['./dashboard'], { queryParams: { project: name2 } });
    this.upload = !this.upload;
    this.showdivfail = false;
    //this.operation = false;
  }

  DeleteField(pname: string) {
    this.pname = pname;
    console.log(pname);
    this.http.get('http://' + API_ENDPOINT + ':9946/DeleteProjectUpload?project_name=' + this.pname).subscribe
      (data => {
        console.log(data);
        this.deleteSuccess = true;

      });
  }

}
