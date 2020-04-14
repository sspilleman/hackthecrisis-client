import { inject } from "aurelia";
import { IRouter, ViewportInstruction, INavigatorInstruction, HookTypes } from "@aurelia/router";
import * as Utils from "../services/utils";
import { JokeService } from "../services/frontend/joke";
import { connectTo } from "../services/connect-to";

@inject(IRouter, JokeService)
@connectTo({ service: "jokeService", method: "jokeChanged" })
export class MyApp {
    private joke: string;

    constructor(
        private router: IRouter,
        public jokeService: JokeService
    ) { }

    public jokeChanged(joke) {
        this.joke = joke;
    }
}
