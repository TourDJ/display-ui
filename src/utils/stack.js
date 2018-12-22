//JS 栈数据结构
//Base from 

//栈节点
class Node {
  constructor( data ) {
    this.data = data
    this.next = null
  }
}

//栈
class Stack {
  constructor() {
    this.top = null
    this.curr = null
  }

  //入栈
  push( item ){
    let node = new Node( item )

    if( this.top ) {
      node.next = this.top
      this.top = node
    } else {
      this.top = node
    }
    this.curr = this.top.data.key
  }

  //出栈
  pop() {
    if( this.top ) {
      let itemToPop = this.top
      this.top = this.top.next
      return itemToPop.data
    } else {
      console.log('Stack is empty!')
      return false
    }
  }

  //栈顶元素
  peek() {
    if( this.top ) {
      return this.top.data
    } else {
      return null
    }
  }

  //打印栈元素
  print() {
    let current = this.top
    while( current ) {
      console.log( current.data )
      current = current.next
    }
  }

  //反转栈元素
  reverse() {
    let current = this.top
    let prev = null
    while( current ) {
      let next = current.next
      current.next = prev
      prev = current
      current = next
    }
    this.top = prev
  }

  //栈的长度
  length() {
    let current = this.top
    let counter = 0
    while( current ) {
      counter++
      current = current.next
    }
    return counter
  }

  //在栈中搜索
  search( item ) {
    let current = this.top
    while( current ) {
      if( current.data === item ) return true
      current = current.next
    }
    return false
  }

  //穿梭栈
  traverse( fn ) {
    let current = this.top
    while( current ) {
      fn( current )
      current = current.next
    }
  }

  //栈是否为空
  isEmpty() {
    return this.length > 1
  }

  //Output with array
  dump( all ) {
    let elems = [], current = this.top, level
    if(!all){
      current = this.active()
    }
    if(!current)
      return elems

    level = current.data.level

    while( current && current.data ) {
      if(current.data.level == level) {
        elems.unshift(current.data)
        current = current.next
        level--

        if(level <= 0)
          return elems
      } else {
        while(current.data.level != level) {
          current = current.next
        }
      }
    }
    return elems
  }

  //改变栈当前指针
  pointAt( item ) {
    if(item && item.key) {
      this.curr = item.key
    }
  }

  //当前指针指向元素
  active() {
    let current = this.top
    while( current ) {
      if(current.data.key == this.curr)
        return current
      current = current.next
    }
    return null
  }

}

export default Stack