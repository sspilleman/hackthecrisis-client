import { IVak } from '../../interfaces/vak';
import { inject } from "aurelia";
import { Signal } from "../signal";
import { BackendService } from '../backend/backend';

@inject(BackendService)
export class VakkenService {
    public vakkenChanged: Signal<IVak[]> = new Signal<IVak[]>();
    private vakken: IVak[];

    constructor(private userService: BackendService) {
        this.loadVakken();
    }

    public addVak(vak: IVak) {
        this.userService.addVak(vak).then(newvak => {
            if (newvak.id) {
                this.vakken.push(newvak);
                return this.vakkenChanged.dispatch(this.vakken);
            } else {
                console.log(newvak);
                alert("something went wrong, check console");
            }
        });
    }

    // public deleteVak(user: IVak) {
    //     this.userService.deleteUser(user).then(deleteduser => {
    //         console.log("deleteduser", deleteduser);
    //         if (deleteduser.status) {
    //             console.log(deleteduser);
    //             return alert("something went wrong, check console");
    //         } else {
    //             this.users = this.users.filter(u => u.id !== user.id);
    //             return this.usersChanged.dispatch(this.users);
    //         }
    //     });
    // }

    // public addApplicationToUser(userID: number, application: IApplication) {
    //     const useridx = this.users.findIndex(u => u.id === userID);
    //     const user = this.users[useridx];
    //     user.applications.push(application);
    //     this.userService.saveUser(user).then(saveduser => {
    //         return this.usersChanged.dispatch(this.users);
    //     });
    // }

    public loadVakken() {
        this.userService.getVakken().then((users: IVak[]) => {
            this.vakken = users;
            return this.vakkenChanged.dispatch(users);
        });
    }
}