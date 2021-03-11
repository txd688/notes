// 链表 head -> demo -> demo2 -> tail
class LinkedList{
  constructor(){
    this.head = null; // 第一个节点
    this.tail = null; // 最后一个节点
  }
  // 添加节点
  append(value){
    const newNode = { value, next: null };
    // 当前tail的null改为新传进的节点
    if(this.tail){
      this.tail.next = newNode;
    }
    // 更新tail
    this.tail = newNode;
    if(!this.head){
      this.head = newNode;
    }
    return this;
  }
  // 将节点以数组方式输出
  toArray(){
    let curNode = this.head,
        elements = [];
    while(curNode){
      elements.push(curNode);
      curNode = curNode.next;
    }
    return elements;
  }
  //实现迭代，for of
  * [Symbol.iterator](){
    let curNode = this.head;
    while(curNode){
      yield curNode.value;
      curNode = curNode.next;
    }
  }
}
let linkedList = new LinkedList();
linkedList.append('demo').append('demo1').append('demo2');
linkedList.toArray();