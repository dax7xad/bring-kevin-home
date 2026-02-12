import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy,
  Timestamp,
  limit,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Comment {
  id?: string;
  name: string;
  message: string;
  timestamp: Timestamp;
  approved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private firestore = inject(Firestore);
  private commentsCollection = collection(this.firestore, 'comments') as CollectionReference;

  constructor() {}

  /**
   * Obtener comentarios aprobados ordenados por fecha
   */
  getComments(limitCount: number = 50): Observable<Comment[]> {
    const q = query(
      this.commentsCollection,
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  /**
   * Agregar un nuevo comentario
   */
  async addComment(name: string, message: string): Promise<void> {
    try {
      await addDoc(this.commentsCollection, {
        name: name.trim(),
        message: message.trim(),
        timestamp: Timestamp.now(),
        approved: true // Cambia a false si quieres moderación
      });
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      throw error;
    }
  }
}
