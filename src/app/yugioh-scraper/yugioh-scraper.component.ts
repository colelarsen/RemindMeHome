import { Component, OnInit } from '@angular/core';
import { ScraperServiceService } from './scraper.service';

@Component({
  selector: 'app-yugioh-scraper',
  templateUrl: './yugioh-scraper.component.html',
  styleUrls: ['./yugioh-scraper.component.css']
})
export class YugiohScraperComponent implements OnInit {
  constructor(private scraper: ScraperServiceService) {

  }
  cardSingle = "";
  cards: { name: "" }[] = [{ name: "" }];
  cardImages: String[];
  bigCard: boolean[] = [];

  addCard() {
    this.cards.push({ name: "" });
  }

  submitCards() {
    this.cards = this.cards.filter(card => { return card.name.length > 0 && card.name.charAt(0) != ' ' });
    if (this.cards.length >= 1) {
      this.scraper.getCards(this.cards).subscribe(
        urls => {
          this.cardImages = urls.urls;
        },
        err => {

        }
      )
    }
    else {
      this.cards = [{ name: "" }];
    }
  }



  ngOnInit() {
  }

}
