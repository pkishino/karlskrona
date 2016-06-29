import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Map from './map/map';
import Emergency from './emergency/emergency';
import Sites from './sites/sites';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Map.name,
  Sites.name,
  Emergency.name
]);

export default componentModule;
