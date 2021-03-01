import "./heading.scss";

class headTitle{
  render(){
    const head = document.createElement('h1');
    head.innerHTML = '这是标题';
    head.classList.add('title');
    const body = document.querySelector('body');
    body.appendChild(head);
  }
}

export default headTitle;