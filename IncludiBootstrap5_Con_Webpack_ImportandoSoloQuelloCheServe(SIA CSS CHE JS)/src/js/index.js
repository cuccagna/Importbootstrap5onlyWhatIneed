import '../sass/main.scss'

//import { Popover } from 'bootstrap';
import Popover from 'bootstrap/js/dist/popover'

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))