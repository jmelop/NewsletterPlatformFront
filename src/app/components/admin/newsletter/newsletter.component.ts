import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  constructor() { }

  color: string = '#0472EE'
  image: string = '';
  selector: string = '';
  footer1: string = '';
  footer2: string = '';

  ngOnInit(): void {
    //this.changeColor()
  }

  changeColor() {
    document.getElementById('color-table').style.backgroundColor = this.color;
    document.getElementById('colot-td').style.backgroundColor = this.color;
  }

  changeImage() {
    document.getElementById('header-image').setAttribute('src', this.image);

  }

}
