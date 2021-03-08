import addImage from "./components/ms-image/add-image";
import HeadTitle from "./components/ms-heading/heading";
import MsButton from "../../ms-button/src/components/ms-button/ms-button";

const headTitle = new HeadTitle();
headTitle.render();
addImage();

import("MsButton/MsButton").then(res=>{
  const msButton = res.default;
  const msButton2 = new msButton();
  msButton2.render();
});