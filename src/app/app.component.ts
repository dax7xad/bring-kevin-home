import { Component } from '@angular/core';
import { DonationCardComponent } from "./components/donation-card/donation-card.component";
import { CommentsComponent } from "./components/comments/comments.component";

@Component({
  selector: 'app-root',
  imports: [DonationCardComponent, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bring-kevin-home';
}
