import pic from "./pic.jpg";

function addImage(){
  const img = document.createElement("img");
  img.alt = "photo";
  img.width = 300;
  img.src = pic;
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;