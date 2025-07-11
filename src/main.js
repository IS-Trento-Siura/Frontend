import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from "./router"; //  Importo il router

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faEye, 
  faEyeSlash,
  faMapMarkedAlt,
  faExclamationTriangle,
  faUser,
  faSignInAlt,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Aggiungi le icone alla libreria
library.add(
  faEye, 
  faEyeSlash,
  faMapMarkedAlt,
  faExclamationTriangle,
  faUser,
  faSignInAlt,
  faChevronLeft,
  faChevronRight
)


const app = createApp(App) ;
app.component('font-awesome-icon' , FontAwesomeIcon);
app.use(router).mount("#app");