import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  listNotes: Notes[] = [];

  private notesUrl: string;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);

  constructor(private http: HttpClient) {
    //this.notesUrl = 'http://localhost:8081/notes/notes'; //Ejecucion en local
    this.notesUrl = '/notes/notes'; //ejecucion en docker
  }

  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.notesUrl, { headers: this.headers }).pipe(
      catchError(this.handleError));
  }
  eliminarNotes(id: number) {
    return this.http.delete<number>(this.notesUrl + "/" + id, { headers: this.headers }).pipe(
      catchError(this.handleError));
  }
  agregarNotes(note: Notes) {

    console.log("Notes del serevicio", note)
    return this.http.post(this.notesUrl, note, { headers: this.headers }).pipe(
      catchError(this.handleError)).subscribe();
  }

  editarNotes(Notes: Notes) {
    console.log(Notes.id)
    let params = new HttpParams();
    return this.http.put(this.notesUrl, Notes, { headers: this.headers }).pipe(
      catchError(this.handleError)).subscribe();
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      alert("El servicio de notas no esta disponible");
    } else {
      alert(error.error.message);
    }
    return throwError(error.message);
  }

}
