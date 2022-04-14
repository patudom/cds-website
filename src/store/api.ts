import axios, { AxiosResponse } from "axios";
import { Action, Module, MutationAction, VuexModule } from "vuex-module-decorators";

export enum UserType {
    None, // Not logged in
    Student,
    Educator,
    Admin
}

export interface ClassData {
  educatorID: number;
  name: string;
}

export interface EducatorData {
  firstName: string;
  lastName: string;
  email: string;
  institution: string | null;
  password: string;
  age: number | null;
  gender: string | null
}

export interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  institution: string | null;
  password: string;
  age: number | null;
  gender: string | null
}

export interface LoginInfo {
  id?: number;
  type: string;
}

export interface ClassInfo {
  name: string;
  code: string;
}

export interface User {
  id: number;
  type: UserType;
}

// const SERVER_URL = "http://localhost:8080"
const SERVER_URL = "https://api.cosmicds.cfa.harvard.edu";

async function classesForEducator(user: User): Promise<ClassInfo[]> {
  if (user.type !== UserType.Educator) {
    return [];
  }
  const response = await axios.get(`${SERVER_URL}/classes/${user.id}`);
  return response.data.classes;
}

@Module({
  namespaced: true,
  stateFactory: true
})
export class CDSApiModule extends VuexModule {
    
    // userType = UserType.None;
    // userId = -1;

    user = { id: -1, type: UserType.None };
    userClasses: ClassInfo[] = [];

    @MutationAction({ mutate: ["userClasses"] })
    async submitClassCreation(name: string): Promise<{userClasses: ClassInfo[]}> {
      const state = (this.state as CDSApiModule);
      const response = await axios.put(`${SERVER_URL}/create-class`, { name: name, educatorID: state.user.id });
      console.log(this);
      console.log(response);
      if (response.data.status === "ok") {
        console.log("OK!");
        const newClass = response.data.class;
        const classes = state.userClasses.concat([newClass]);
        return { userClasses: classes };
      }
      return { userClasses: state.userClasses };
    }

    @Action({ rawError: true })
    submitEducatorSignUp(data: EducatorData): Promise<AxiosResponse> {
      return axios.put(`${SERVER_URL}/educator-sign-up`, data);
    }

    @Action({ rawError: true })
    submitStudentSignUp(data: StudentData): Promise<AxiosResponse> {
      return axios.put(`${SERVER_URL}/student-sign-up`, data);
    }

    @MutationAction({ mutate: ["user", "userClasses"] })
    async submitStudentSignIn(args: { email: string, password: string }): Promise<{user:User, userClasses: ClassInfo[]}> {
      const state = (this.state as CDSApiModule);
      const response = await axios.post(`${SERVER_URL}/student-login`, {
        email: args.email,
        password: args.password
      });
      if (response.data.valid) {
        return {
          user: {
            id: response.data.id,
            type: UserType.Student
          },
          userClasses: []
        };
      }
      return { user: state.user, userClasses: state.userClasses };
    }

    @MutationAction({ mutate: ["user", "userClasses"] })
    async submitEducatorSignIn(args: { email: string, password: string }): Promise<{user:User, userClasses: ClassInfo[]}> {
      const state = (this.state as CDSApiModule);
      const response = await axios.post(`${SERVER_URL}/educator-login`, {
        email: args.email,
        password: args.password
      });
      console.log(response);
      if (response.data.valid) {
        const user = {
          id: response.data.id,
          type: UserType.Educator
        };
        const classes = await classesForEducator(user);
        return { user: user, userClasses: classes };
      }
      return { user: state.user, userClasses: state.userClasses };
    }
}
