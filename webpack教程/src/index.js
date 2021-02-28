import helloWorld from './hello-world';
import addImage from "./components/ms-image/add-image";
import MsButton from "./components/ms-button/ms-button";
import HeadTitle from "./components/ms-heading/heading";

helloWorld();
addImage();

const msButton = new MsButton;
msButton.render();

const headTitle = new HeadTitle();
headTitle.render();