import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Map from './map/map';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Map.name
]);

export default componentModule;
