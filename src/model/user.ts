export interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    hair: {
      color: string;
    };
    address: {
      postalCode: string;
    };
    company: {
      department: string;
    };
  }
  
  export interface TransformedData {
    [department: string]: {
      male: number;
      female: number;
      ageRange: string;
      hair: {
        [color: string]: number;
      };
      addressUser: {
        [fullName: string]: string;
      };
    };
  }
  

  export interface ApiResponse {
    users: User[];
  }