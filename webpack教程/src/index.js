import addImage from "./components/ms-image/add-image";
import MsButton from "./components/ms-button/ms-button";
import HeadTitle from "./components/ms-heading/heading";

addImage();
alert(1)

const msButton = new MsButton;
msButton.render();

const headTitle = new HeadTitle();
headTitle.render();

if(process.env.NODE_ENV === "production"){
  console.log("production mode");
}else if(process.env.NODE_ENV === "development"){
  console.log("development mode");
}