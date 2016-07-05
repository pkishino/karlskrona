import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Map from './map/map';
import Emergency from './emergency/emergency';
import Sites from './sites/sites';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Map,
  Sites,
  Emergency
])
.name;

export default componentModule;
