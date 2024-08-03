import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit()  {
    this.route.params.subscribe(params => {
      console.log(params['id']);
    });


  }

}
