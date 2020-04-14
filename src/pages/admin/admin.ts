import { inject } from "aurelia";
import { connectTo } from "../../services/connect-to";
import { VakkenService } from "../../services/frontend/vakken";
import { IVak } from "../../interfaces/vak"

@inject(VakkenService)
@connectTo({ service: "vakkenService", method: "vakkenChanged" })
export class Admin {
    public vakken: IVak[];
    public newVak: IVak;
    public draggedApplication: any;
    private newElement: HTMLElement;

    constructor(
        private vakkenService: VakkenService
    ) {
        this.newElement = document.createElement("div");
        this.newElement.classList.add("drop-button");
    }

    vakkenChanged(vakken: IVak[]) {
        this.vakken = vakken;
        this.newVak = undefined;
    }

    // applicationsChanged(applications: IApplication[]) {
    //     this.applications = applications;
    //     this.newApplication = undefined;
    // }

    addVak(vak: IVak) {
        if (!vak) {
            return this.newVak = {
                vak:""
            };
        }
        console.log("addVak", vak);
        this.vakkenService.addVak(vak);
    }

    // deleteUser(user: IUser) {
    //     this.usersService.deleteUser(user);
    // }

    // deleteApplication(application: IApplication) {
    //     this.applicationsService.deleteApplication(application);
    // }

    // addApplication(application: IApplication) {
    //     if (!application) {
    //         return this.newApplication = {
    //             id: Math.round(Math.random() * 1000),
    //             name: "",
    //             url: ""
    //         };
    //     }
    //     this.applicationsService.addApplication(application);
    // }

    // cancelAdd() {
    //     if (this.newUser) this.newUser = undefined;
    //     if (this.newApplication) this.newApplication = undefined;
    // }

    private removeFormatting(target: HTMLElement) {
        if (target.classList.contains('drag-ok')) {
            target.classList.remove('drag-ok');
            target.removeChild(this.newElement);
        }
        if (target.classList.contains('no-drag')) {
            target.classList.remove('no-drag');
        }
    }

    dragstart(ev: DragEvent, application: any) {
        this.draggedApplication = application
        return true; // true = enable drag
    }

    dragover(ev: DragEvent, user: any) {
        const target: HTMLElement = (ev.currentTarget || ev.target) as HTMLElement;
        const appindex = user.applications.findIndex(app => app.id === this.draggedApplication.id);
        if (appindex === -1) {
            if (!target.classList.contains('drag-ok')) {
                target.classList.add('drag-ok');
                this.newElement.innerHTML = this.draggedApplication.url;
                target.appendChild(this.newElement);
            }
            return false;
        }
        if (!target.classList.contains('no-drag')) {
            target.classList.add('no-drag');
        }
        return true;
    }

    dragleave(ev: DragEvent, user: any) {
        const target: HTMLElement = (ev.currentTarget || ev.target) as HTMLElement;
        this.removeFormatting(target);
        return false;
    }

    // drop(ev: DragEvent, user: IUser) {
    //     const target: HTMLElement = (ev.currentTarget || ev.target) as HTMLElement;
    //     this.removeFormatting(target);
    //     this.usersService.addApplicationToUser(user.id, this.draggedApplication);
    // }
}