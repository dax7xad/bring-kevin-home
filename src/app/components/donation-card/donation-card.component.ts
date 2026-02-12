import { Component } from '@angular/core';

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [], // En Angular 19 no necesitamos CommonModule si usamos @for
  templateUrl: './donation-card.component.html',
  styleUrl: './donation-card.component.css'
})
export class DonationCardComponent {
  titular = 'ALVARO DAX DIAZ AMAYA';

  // Fíjate que usamos 'bankName' y no 'bank'
  accounts = [
    {
      bankName: 'BAC Credomatic',
      currency: 'CÓRDOBAS',
      accountNumber: '368641502',
      iban: 'NI59BAMC00000000000368641502',
      icon: 'bi-wallet2',
      type: 'Corriente' // Agregado para evitar errores si lo llamas
    },
    {
      bankName: 'BAC Credomatic',
      currency: 'DÓLARES (USD)',
      accountNumber: '364849547',
      iban: 'NI23BAMC00000000000364849547',
      icon: 'bi-currency-dollar',
      type: 'Corriente'
    },
    {
      bankName: 'Banco LAFISE',
      currency: 'CÓRDOBAS',
      accountNumber: '290503110',
      iban: 'NI48BCCE00000000000290503110',
      icon: 'bi-bank',
      type: 'Cuenta de Ahorro'
    }
  ];

  copyToClipboard(val: string) {
    navigator.clipboard.writeText(val);
    alert('Copiado: ' + val);
  }
}
