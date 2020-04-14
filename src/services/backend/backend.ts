import { IVak } from '../../interfaces/vak';
import { DOM } from "aurelia";
import { HttpClient, json } from "@aurelia/fetch-client";
import { config } from "../../config";

export class BackendService {

    private httpClient: HttpClient = new HttpClient(DOM);

    constructor() {
        this.httpClient
            .configure((currentconfig) => currentconfig
                .useStandardConfiguration()
                .withBaseUrl(config.baseUrl)
                .withDefaults({})
            )
    }

    private catch(response: Response) {
        return {
            ok: response.ok,
            redirected: response.redirected,
            status: response.status,
            statusText: response.statusText,
            type: response.type,
            url: response.url,
            bodyUsed: response.bodyUsed
        };
    }

    public getVakken() {
        return this.httpClient
            .get("api/vakken")
            .then(response => response.json())
            .catch(this.catch);
    }

    public addVak(vak: IVak) {
        delete vak.id;
        return this.httpClient
            .post("api/vakken", json(vak))
            .then(response => response.json())
            .catch(this.catch);
    }

    // public saveUser(user: IUser) {
    //     return this.httpClient
    //         .put("api/users", json(user))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }

    // public deleteUser(user: IUser) {
    //     return this.httpClient
    //         .delete("api/users", json(user))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }

    // public getApplications() {
    //     return this.httpClient
    //         .get("api/applications")
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }

    // public addApplication(application: IApplication) {
    //     delete application.id;
    //     return this.httpClient
    //         .post("api/applications", json(application))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }

    // public deleteApplication(application: IApplication) {
    //     return this.httpClient
    //         .delete("api/applications", json(application))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }
    // public postLogin(user: any) {
    //     return this.httpClient
    //         .post("api/login", json(user))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }


    // public postPreauth(user: any) {
    //     return this.httpClient
    //         .post("api/preauth", json(user))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }

    // public postEnroll(user: any) {
    //     return this.httpClient
    //         .post("api/enroll", json(user))
    //         .then(response => response.json())
    //         .catch(this.catch);
    // }
}
