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
      accountLabel: 'Cuenta',
      accountNumber: '368641502',
      iban: 'NI59BAMC00000000000368641502',
      ibanLabel: 'IBAN',
      icon: 'bi-wallet2',
      type: 'Corriente' // Agregado para evitar errores si lo llamas
    },
    {
      bankName: 'BAC Credomatic',
      currency: 'DÓLARES (USD)',
      accountLabel: 'Cuenta',
      accountNumber: '364849547',
      iban: 'NI23BAMC00000000000364849547',
      ibanLabel: 'IBAN',
      icon: 'bi-currency-dollar',
      type: 'Corriente'
    },
    {
      bankName: 'Banco LAFISE',
      currency: 'CÓRDOBAS',
      accountLabel: 'Cuenta',
      accountNumber: '290503110',
      iban: 'NI48BCCE00000000000290503110',
      ibanLabel: 'IBAN',
      icon: 'bi-bank',
      type: 'Cuenta de Ahorro'
    },
    {
      bankName: 'KASH',
      currency: 'KASH App',
      holder: 'Alvaro Dax Diaz Amaya',
      accountLabel: 'Usuario',
      accountNumber: '#dax7xad',
      icon: 'bi-phone',
      type: 'App'
    }
  ];

  copyToClipboard(val: string) {
    navigator.clipboard.writeText(val);
    alert('Copiado: ' + val);
  }
}
