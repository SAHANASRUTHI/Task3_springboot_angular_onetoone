import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './models/employee.model';
import { EmployeeService } from './employee.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employee',
  // standalone: true,
  // imports: [FormsModule, HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  isEditing: boolean = false;
  isAdding: boolean = false;
  newEmployeeForm: FormGroup;
  userName: string = 'John Doe';

  cols: any[] = [
    { field: 'id', header: 'Employee Id' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'address.street', header: 'Street' },
    { field: 'address.city', header: 'City' },
    { field: 'address.state', header: 'State' },
  ];

  newEmployee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: {
      id: 0,
      street: '',
      city: '',
      state: ''
    }
  };

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {

    // Initialize form
    this.newEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: ['']
      })
    });
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployeeDetails().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (err: any) => {
        console.error('Failed to load employees', err);
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedEmployee = undefined;
  }

  // cancelAdd(): void {
  //   this.isAdding = false;

  // }

  cancelAdd(): void {
    this.isAdding = false;
    // this.newEmployee = {
    //   id: 0,
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   address: {
    //     id: 0,
    //     street: '',
    //     city: '',
    //     state: ''
    //   }
    // };

    this.newEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: ['']
      })
    });
  }

  saveEmployee(): void {
    if (this.selectedEmployee) {
      // Call service to save the employee
      this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
        next: () => {
          this.getAllEmployees(); // Refresh the employee list
          this.cancelEdit(); // Exit edit mode
        },
        error: (err) => {
          console.error('Failed to save employee', err);
        }
      });
    }
  }

  deleteEmployee(id: number | undefined): void {
    if (id != undefined) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.getAllEmployees();
        },
        error: (err: any) => {
          console.error('Failed to delete employee', err);
        }
      });
    }
  }

  addEmployee(): void {
    this.isAdding = true;
  }

  addNewEmployee(): void {
    if (this.newEmployeeForm.valid) {
      const newEmployee: Employee = this.newEmployeeForm.value;
      this.employeeService.addNewEmployee(newEmployee).subscribe({
        next: () => {
          // Handle success, refresh the employee list, etc.
          this.getAllEmployees();
          this.cancelAdd();
          this.isAdding = false; // Hide the form
        },
        error: (err) => {
          console.error('Failed to add employee', err);
        }
      });
    }
    else {
      this.newEmployeeForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.newEmployeeForm.get(fieldName);
    return control?.invalid && (control?.dirty || control?.touched);
  }



  onSaveNew(): void {
    if (this.newEmployee) {
      this.employeeService.addEmployee(this.newEmployee).subscribe(() => {
        this.getAllEmployees();
        this.cancelAdd();
      });
    }
  }

}
