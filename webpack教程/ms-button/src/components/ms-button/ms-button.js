import "./ms-button.scss";

class MsButton{
  //自定义 类属性
  buttonCssClass = "ms-button";
  
  render(){
    const button = document.createElement("button");
    button.innerHTML = "我的按钮";
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector("body");
    body.appendChild(button);
  }
}

export default MsButton;