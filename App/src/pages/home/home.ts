import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private storymap : FormGroup;
  private title: string;
  private author: string;
  private link: string;
  private inputName='';
  private data: Observable<any>;
  private appid = this.inputName.substring(this.inputName.indexOf("appid=")+6,this.inputName.length);
  private subtitle: string;
  private attributes= {
    name:'',
    icon_color:'',
    is_video:'',
    description:'',
    pic_url:'',
    thumb_url:''
  }
  private geometry:  any[] = [];
  private photo: string[];

  constructor(public navCtrl: NavController, public http:HttpClient, private formBuilder: FormBuilder) {
    this.storymap = this.formBuilder.group({
       storymapurl: [''],
       title:  ['', Validators.required],
       author: [''],
       description: [''],
       attributes:[''],
    });
  }

  logForm(){
    if ( this.inputName.length > 3 ) {
        
      this.appid = this.inputName.substring(this.inputName.indexOf("appid=")+6,this.inputName.length);
      console.log(this.appid);

    fetch(`https://www.arcgis.com/sharing/rest/content/items/${this.appid}/data?f=json`)

      .then(res => res.json())
.then(json => {
  console.log('val',json); // No Author in the array 
  this.title =json.values.title;
  this.author=json.values.author;
  this.subtitle = json.values.subtitle;
  fetch(`https://www.arcgis.com/sharing/rest/content/items/${json.values.webmap}/data?f=json`).then(res => res.json()
  ).then(json =>{
      //description value also null in the result you cant display
    this.attributes.description =json.operationalLayers[0].featureCollection.layers[0].featureSet.features[0].attributes.description;
  console.log(this.attributes)
    this.attributes.pic_url=json.operationalLayers[0].featureCollection.layers[0].featureSet.features[0].attributes.pic_url;
    
  })
})};
}
}