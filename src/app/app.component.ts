import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationCardComponent } from "./components/donation-card/donation-card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DonationCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bring-kevin-home';
}
