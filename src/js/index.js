//Index will be the file where webpack is listening

/* ---------- Inlcuir CSS ---------- */

//Gracias a los loaders, esto inyectará el código css de este fichero en el DOM
//con una etiqueta <style>, sin necesidad de incluir <link>
// import '../main.css';

import '../css/main.scss';

import './plugins/vendor';

/* ---------- Inlcuir JS ---------- */
import { run } from './base/app';


run();