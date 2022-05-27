import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, MutationAction, VuexModule } from "vuex-module-decorators";

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
  username: string;
  email: string;
  institution: string | null;
  password: string;
  age: number | null;
  gender: string | null,
  classroomCode?: string
}

export interface LoginInfo {
  id?: number;
  type: string;
}

export interface ClassInfo {
  id: number;
  name: string;
  code: string;
}

export interface User {
  id: number;
  type: UserType;
}

export interface LoginResponse {
  result: "bad_request" | "ok" | "email_not_exist" | "not_verified" | "incorrect_password";
  success: boolean;
}

// For local testing
const SERVER_URL = "http://192.168.99.136:8080";

// AWS EBS app
//const SERVER_URL = "https://api.cosmicds.cfa.harvard.edu";

async function classesForUser(user: User): Promise<ClassInfo[]> {
  if (user.type !== UserType.Educator && user.type !== UserType.Student) {
    return [];
  }
  const type = (user.type === UserType.Educator) ? "educator" : "student";
  const response = await axios.get(`${SERVER_URL}/${type}-classes/${user.id}`);
  return response.data.classes;
}

const EMPTY_USER = {
  id: -1,
  type: UserType.None
};

@Module({
  namespaced: true,
  stateFactory: true
})
export class CDSApiModule extends VuexModule {
    
    // userType = UserType.None;
    // userId = -1;

    user: User = EMPTY_USER;
    userClasses: ClassInfo[] = [];

    get userId(): number {
      return this.user.id;
    }

    get userType(): UserType {
      return this.user.type;
    }

    get userClass() {
      return (classID: number): ClassInfo | undefined => {
        return this.userClasses.find(cls => cls.id == classID);
      };
    }

    get classBelongsToUser() {
      return (classID: number): boolean => {
        const ids = this.userClasses.map(cls => cls.id);
        return ids.includes(classID);
      };
    }

    @Mutation
    setUser(user: User): void {
      this.user = user;
    }

    @Mutation
    setUserClasses(classes: ClassInfo[]): void {
      this.userClasses = classes;
    }

    @MutationAction({ mutate: ["userClasses"] })
    async submitClassCreation(name: string): Promise<{userClasses: ClassInfo[]}> {
      const state = (this.state as CDSApiModule);
      const response = await axios.post(`${SERVER_URL}/create-class`, { name: name, educatorID: state.user.id });
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
      return axios.post(`${SERVER_URL}/educator-sign-up`, data);
    }

    @Action({ rawError: true })
    submitStudentSignUp(data: StudentData): Promise<AxiosResponse> {
      return axios.post(`${SERVER_URL}/student-sign-up`, data);
    }

    @Action({ rawError: true })
    async submitStudentSignIn(args: { email: string, password: string }): Promise<LoginResponse> {
      const response = await axios.put(`${SERVER_URL}/student-login`, {
        email: args.email,
        password: args.password
      });
      if (response.data.success) {
        const user ={
          id: response.data.id,
          type: UserType.Student
        };
        const classes = await classesForUser(user);
        this.context.commit("setUser", user);
        this.context.commit("setUserClasses", classes);
      }
      return response.data;
    }

    @Action({ rawError: true })
    async submitEducatorSignIn(args: { email: string, password: string }): Promise<LoginResponse> {
      const response = await axios.put(`${SERVER_URL}/educator-login`, {
        email: args.email,
        password: args.password
      });
      if (response.data.success) {
        const user ={
          id: response.data.id,
          type: UserType.Educator
        };
        const classes = await classesForUser(user);
        this.context.commit("setUser", user);
        this.context.commit("setUserClasses", classes);
      }
      return response.data;
    }

    @Action({ rawError: true })
    async fetchRosterData(args: { classID: number, storyName?: string }): Promise<Record<string,any>> {
      let url = `${SERVER_URL}/roster-info/${args.classID}`;
      if (args.storyName) {
        url += `/${args.storyName}`;
      }
      const response = await axios.get(url);
      return response.data;
    }

    @Mutation
    logout(): void {
      this.user = EMPTY_USER;
      this.userClasses = [];
    }

    @Action({ rawError: true })
    async submitLogout(): Promise<void> {
      const response = await axios.get(`${SERVER_URL}/logout`);
      console.log(response);
      if (response.data.logout) {
        this.context.commit("logout");
      }
    }

    @Action({ rawError: true })
    async validateClassroomCode(code: string): Promise<boolean> {
      const response = await axios.get(`${SERVER_URL}/validate-classroom-code/${code}`);
      return response.data.valid;
    }
}
