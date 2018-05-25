import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { API_ENDPOINT } from '../../app.constants';

@Component({
  selector: 'app-expose-soap',
  templateUrl: './expose-soap.component.html',
  styleUrls: ['./expose-soap.component.css']
})
export class ExposeSoapComponent implements OnInit {

  public sub: any;
public OperationsArray :Array<any>=[];
public pname: any;
public ptype :any;
public pclient : any;
public dataOperations : any;
public dataWsdl : any;
elmt = {};
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.route
    .queryParams
    .subscribe(params => {

      this.pname = params['project'];
      this.ptype = params['type'];
      this.pclient = params['client'];

    });
    this.http.get('http://' + API_ENDPOINT + ':7072/GetAllOperations?clientname=Oreedo&projectname=' + this.pname + '&projecttype=' + this.ptype).subscribe(data => {
      this.dataOperations = data;
      for (const elt of this.dataOperations.Operations.OpName) {
        this.OperationsArray.push(elt);
      }

    });
  }


GO(OperationName: any){
  // tslint:disable-next-line:max-line-length
  this.http.post('http://' + API_ENDPOINT +':7073/CreateWsdl?nomclient=Oreedo&nomprojet='+ this.pname + '&typeprojet=' + this.ptype, JSON.stringify({"Operations": {"input":OperationName}})).subscribe(data => {
    console.log(data);
    this.dataWsdl=data;
    console.log(this.dataWsdl);
  });
  console.log(JSON.stringify({"Operations": {"input":OperationName}}))
}


}
