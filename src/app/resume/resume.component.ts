import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  show:boolean[] = []; 
  imgDown:String = "./../../assets/arrowRight.svg";
  imgRight:String = "./../../assets/arrow.svg";
  showImage:String[] = [this.imgDown, this.imgDown, this.imgDown]; 
  

  constructor() { }

  ngOnInit() {
  }

  showInfo(i:number)
  {
    this.show[i] = !this.show[i];
    this.showImage[i] = (this.showImage[i] == this.imgRight) ? this.imgDown : this.imgRight;
  }

}
