import axios, { AxiosResponse } from 'axios';
import { Action, Module, VuexModule } from 'vuex-module-decorators';

enum UserType {
    None, // Not logged in
    Student,
    Educator,
    Admin
}

export type ClassData = { educatorID: number; name: string; }
export type EducatorData = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string | null;
  password: string;
  age: number | null;
  gender: string | null
}
export type StudentData = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string | null;
  password: string;
  age: number | null;
  gender: string | null
}

@Module({
  namespaced: true,
  stateFactory: true
})
export class CDSApiModule extends VuexModule {
    
    private SERVER_URL = "http://localhost:8080";
    private userType = UserType.None;
    private id = -1;
    
    @Action({ rawError: true })
    submitClassCreation(data: ClassData): Promise<AxiosResponse> {
      return axios.put(`${this.SERVER_URL}/create-class`, data);
    }

    @Action({ rawError: true })
    submitEducatorSignUp(data: EducatorData): Promise<AxiosResponse> {
      return axios.put(`${this.SERVER_URL}/educator-sign-up`, data);
    }

    @Action({ rawError: true })
    submitStudentSignUp(data: StudentData): Promise<AxiosResponse> {
      console.log(`Submitting: ${JSON.stringify(data)}`);
      return axios.put(`${this.SERVER_URL}/student-sign-up`, data);
    }

    @Action({ rawError: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async checkStudentSignIn(email: string, password: string): Promise<any> {
      const result = await axios.post(`${this.SERVER_URL}/student-sign-in`, {
        email: email,
        password: password
      });
      return result.data.valid;

    }

    @Action({ rawError: true })
    checkEducatorSignIn(email: string, password: string): Promise<AxiosResponse> {
      return axios.post(`${this.SERVER_URL}/educator-sign-in`, {
        email: email,
        password: password
      });
    }
}
