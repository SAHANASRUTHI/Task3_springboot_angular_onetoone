import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "http://localhost:8080/employees";

  constructor(private httpClient: HttpClient) { }

  public getAllEmployeeDetails(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url);
  }

  public updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${employee.id}`, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  addNewEmployee(employee: Employee): Observable<void> {
    return this.httpClient.post<void>(this.url, employee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.url, employee);
  }



}
