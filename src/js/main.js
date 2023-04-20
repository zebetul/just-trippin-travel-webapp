import { TITLE, ABOUT_US_DATA } from './config';
import NavBar from './NavBar';
import Home from './Home';
import Slider from './Slider';
import Blog from './Blog';
import AboutUs from './AboutUs';
import Modal from './Modal';
import LazyLoading from './LazyLoading';
import LazyLoading from './LazyLoading';

const navBar = new NavBar();
const home = new Home(TITLE);
const blog = new Blog();
const slider = new Slider(3);
const aboutUs = new AboutUs(ABOUT_US_DATA);
const modal = new Modal();
const lazyLoading = new LazyLoading();
