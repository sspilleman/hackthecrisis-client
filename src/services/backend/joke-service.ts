import { DOM } from "aurelia";
import { HttpClient } from "@aurelia/fetch-client";

export class JokeServiceBackend {

    public url = "https://icanhazdadjoke.com/";
    private httpClient: HttpClient = new HttpClient(DOM);

    constructor() {
        this.httpClient
            .configure((currentconfig) => currentconfig
                .useStandardConfiguration()
                .withDefaults({ headers: { "Accept": "application/json" } }))
    }

    public getJoke() {
        return this.httpClient
            .get(this.url)
            .then(response => response.json())
            .catch((response: Response) => {
                console.log("catch", response);
                return {
                    ok: response.ok,
                    redirected: response.redirected,
                    status: response.status,
                    statusText: response.statusText,
                    type: response.type,
                    url: response.url
                };
            });
    }
}
