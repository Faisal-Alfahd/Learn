import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // if (!this.apiLoaded) {
    //   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    //   // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    //   const tag = document.createElement('script');
    //   tag.src = 'https://www.youtube.com/iframe_api';
    //   document.body.appendChild(tag);
    //   this.apiLoaded = true;
    // }
  }

}
