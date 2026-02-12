import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  User,
  setPersistence,
  browserLocalPersistence
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  public user$: Observable<User | null>;

  constructor() {
    this.user$ = user(this.auth);
    // Configurar persistencia de sesión
    setPersistence(this.auth, browserLocalPersistence).catch(err =>
      console.error('Error configurando persistencia:', err)
    );
  }

  /**
   * Iniciar sesión con Google
   */
  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      // Solicitar información del perfil
      provider.addScope('profile');
      provider.addScope('email');

      await signInWithPopup(this.auth, provider);
      console.log('Sesión iniciada con Google exitosamente');
    } catch (error: any) {
      // Ignorar error si el usuario cancela el popup
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Error al iniciar sesión con Google:', error);
        throw error;
      }
    }
  }

  /**
   * Cerrar sesión
   */
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  /**
   * Obtener el usuario actual
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
