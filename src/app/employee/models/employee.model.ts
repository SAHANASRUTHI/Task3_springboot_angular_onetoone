// import { Address } from "./address.model";
// export class Employee {
//     id?: number;
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     address: Address; 

//     constructor(values: Object = {}) {
//         this.address = new Address();
//         Object.assign(this, values);
//     }
// }

import { Address } from "./address.model";
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address
}

