// export class Address {
//     id?: number;
//     street?: string;
//     city?: string;
//     state?: string;

//     constructor(values: Object = {}) {
//         Object.assign(this, values);
//     }
// }   

export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
}

