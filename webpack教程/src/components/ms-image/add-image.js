import pic from "./pic.jpg";
import "./ms-image.scss";

function addImage(){
  const img = document.createElement("img");
  img.alt = "photo";
  img.src = pic;
  img.classList.add('pic')
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;