import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Invitation } from '../interfaces/invitation';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitacionesService {

  private base_url = environment.api_url;

  constructor(private http: HttpClient) { }

  getInvitations(): Promise<{ invitations: Invitation[] }> {
    return firstValueFrom(this.http.get<{ invitations: Invitation[] }>(`${this.base_url}/invitations`));
  }

  createInvitation(invitation: Invitation): Promise<Invitation> {
    return firstValueFrom(this.http.post<Invitation>(`${this.base_url}/invitations`, invitation));
  }

  getInvitation(id: string): Promise<Invitation> {
    return firstValueFrom(this.http.get<Invitation>(`${this.base_url}/invitations/${id}`));
  }

  deleteInvitation(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.base_url}/invitations/${id}`));
  }

}
