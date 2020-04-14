import { inject } from "aurelia";
import { Signal } from "../signal";
import { IJoke } from "../../interfaces/joke";
import { JokeServiceBackend } from '../backend/joke-service';

@inject(JokeServiceBackend)
export class JokeService {
    public jokeChanged: Signal<IJoke> = new Signal<IJoke>();
    private interval: number;

    constructor(private jokeService: JokeServiceBackend) {
        this.loadNewJoke();
    }

    public loadNewJoke() {
        if (this.interval) clearInterval(this.interval);
        this.jokeService.getJoke().then((joke: IJoke) => this.jokeChanged.dispatch(joke));
        this.interval = setInterval(() => {
            this.loadNewJoke();
        }, 30000);
    }
}