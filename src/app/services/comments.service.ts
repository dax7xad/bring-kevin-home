import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  addDoc,
  getDocs,
  Timestamp,
  limit,
  query
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private commentsCollection!: CollectionReference;

  constructor() {
    this.commentsCollection = collection(this.firestore, 'comments') as CollectionReference;
    console.log('✅ Servicio de comentarios inicializado');
  }

  /**
   * Obtener comentarios ordenados por fecha
   */
  getComments(limitCount: number = 50): Observable<Comment[]> {
    console.log('📋 Obteniendo comentarios de Firestore...');

    // Convertir la promesa de getDocs a Observable
    return from(getDocs(this.commentsCollection)).pipe(
      map(querySnapshot => {
        console.log('📦 Documentos obtenidos de Firestore:', querySnapshot.docs.length);

        const comments = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            name: doc.get('name') || 'Anónimo',
            message: doc.get('message') || '',
            timestamp: doc.get('timestamp'),
            approved: doc.get('approved') !== false
          }))
          .sort((a, b) => {
            if (!a.timestamp || !b.timestamp) return 0;
            const timeA = a.timestamp.toDate?.() || new Date(a.timestamp);
            const timeB = b.timestamp.toDate?.() || new Date(b.timestamp);
            return timeB.getTime() - timeA.getTime();
          }) as Comment[];

        console.log(`✅ Se obtuvieron ${comments.length} comentarios`);
        if (comments.length > 0) {
          console.log('📝 Primer comentario:', comments[0]);
        }
        return comments;
      })
    );
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
        approved: true
      });
      console.log('✅ Comentario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      throw error;
    }
  }
}
