import { ViewportInstruction } from "aurelia";

export class AuthService {
    public redirectInstructions: ViewportInstruction[];
    public errorMessage: string;
    public user: any;
    public devices: any[];

    public async login(user: any) {
        this.user = user;
    }

    public logout() {
        this.user = undefined;
    }

    public checkAccess(): boolean {
        return this.user !== undefined;
    }

}