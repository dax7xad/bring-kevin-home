import { Component } from '@angular/core';
import { DonationCardComponent } from "./components/donation-card/donation-card.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { AuthButtonComponent } from "./components/auth-button/auth-button.component";

@Component({
  selector: 'app-root',
  imports: [DonationCardComponent, CommentsComponent, AuthButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bring-kevin-home';
}
