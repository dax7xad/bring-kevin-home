import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService, Comment } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private commentsService = inject(CommentsService);
  private authService = inject(AuthService);

  comments$!: Observable<Comment[]>;
  user$ = this.authService.user$;
  isAuthenticated$ = this.user$.pipe(map(user => user !== null));

  newComment = {
    name: '',
    message: ''
  };

  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadComments();
    // Suscribirse a cambios de usuario para actualizar el nombre automáticamente
    this.user$.subscribe(user => {
      if (user) {
        this.newComment.name = user.displayName || user.email?.split('@')[0] || 'Usuario';
      } else {
        this.newComment.name = '';
      }
    });
  }

  loadComments(): void {
    this.comments$ = this.commentsService.getComments(50);
  }

  async onSubmit(): Promise<void> {
    if (!this.newComment.name.trim() || !this.newComment.message.trim()) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.showError = true;
      setTimeout(() => (this.showError = false), 3000);
      return;
    }

    if (this.newComment.message.length < 10) {
      this.errorMessage = 'El mensaje debe tener al menos 10 caracteres';
      this.showError = true;
      setTimeout(() => (this.showError = false), 3000);
      return;
    }

    this.isSubmitting = true;
    this.showError = false;

    try {
      await this.commentsService.addComment(
        this.newComment.name,
        this.newComment.message
      );

      // Reset form
      this.newComment = { name: '', message: '' };

      // Recargar comentarios después de enviar
      this.loadComments();

      // Show success message
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 3000);
    } catch (error) {
      console.error('Error:', error);
      this.errorMessage = 'Hubo un error al enviar tu comentario. Intenta de nuevo.';
      this.showError = true;
      setTimeout(() => (this.showError = false), 3000);
    } finally {
      this.isSubmitting = false;
    }
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

