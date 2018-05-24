import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expose-soap',
  templateUrl: './expose-soap.component.html',
  styleUrls: ['./expose-soap.component.css']
})
export class ExposeSoapComponent implements OnInit {


  public serviceUrl : String;
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
    this.serviceUrl = '192.168.110.229';
    this.sub = this.route
    .queryParams
    .subscribe(params => {

      this.pname = params['project'];
      this.ptype = params['type'];
      this.pclient = params['client'];

    });
    this.http.get('http://192.168.110.229:7072/GetAllOperations?clientname=Oreedo&projectname='+this.pname+'&projecttype='+this.ptype).subscribe(data => {
      this.dataOperations = data;
      for (const elt of this.dataOperations.Operations.OpName) {
        this.OperationsArray.push(elt);
      }

    });
  }


GO(OperationName:any){
  this.http.post('http://192.168.110.229:7073/CreateWsdl?nomclient=Oreedo&nomprojet='+this.pname+'&typeprojet='+this.ptype,JSON.stringify({"Operations": {"input":OperationName}})).subscribe(data => {
    console.log(data);
    this.dataWsdl=data;
    console.log(this.dataWsdl);
  });
  console.log(JSON.stringify({"Operations": {"input":OperationName}}))
}


}
