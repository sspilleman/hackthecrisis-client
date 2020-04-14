import Aurelia, { RouterConfiguration } from 'aurelia';
import { MyApp } from './my-app/my-app';
import * as Utils from "./services/utils";

Aurelia.register(RouterConfiguration).app(MyApp).start();
