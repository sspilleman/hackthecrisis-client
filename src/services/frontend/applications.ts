// import { IApplication } from '../../interfaces/vak';
// import { inject } from "aurelia";
// import { Signal } from "../signal";
// import { BackendService } from '../backend/backend';

// @inject(BackendService)
// export class ApplicationsService {
//     public applicationsChanged: Signal<IApplication[]> = new Signal<IApplication[]>();
//     private applications: IApplication[];

//     constructor(private applicationService: BackendService) {
//         this.loadApplications();
//     }

//     public addApplication(application: IApplication) {
//         this.applicationService.addApplication(application).then(newapp => {
//             if (newapp.id) {
//                 this.applications.push(newapp);
//                 return this.applicationsChanged.dispatch(this.applications);
//             } else {
//                 console.log(newapp);
//                 alert("something went wrong, check console");
//             }
//         });
//     }

//     public deleteApplication(application: IApplication) {
//         this.applicationService.deleteApplication(application).then(deletedapplication => {
//             console.log("deletedapplication", deletedapplication);
//             if (deletedapplication.status) {
//                 console.log(deletedapplication);
//                 return alert("something went wrong, check console");
//             } else {
//                 this.applications = this.applications.filter(u => u.id !== application.id);
//                 return this.applicationsChanged.dispatch(this.applications);
//             }
//         });
//     }

//     public loadApplications() {
//         this.applicationService.getApplications().then((applications: IApplication[]) => {
//             this.applications = applications;
//             this.applicationsChanged.dispatch(applications)
//         });
//     }
// }