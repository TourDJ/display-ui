//JS 栈数据结构

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
  }

  //
  push( item ){
    let node = new Node( item )

    if( this.top ) {
      node.next = this.top
      this.top = node
    } else {
      this.top = node
    }
  }

  //
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

  //
  peek() {
    if( this.top ) {
      return this.top.data
    } else {
      return null
    }
  }

  print() {
    let current = this.top
    while( current ) {
      console.log( current.data )
      current = current.next
    }
  }

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

  length() {
    let current = this.top
    let counter = 0
    while( current ) {
      counter++
      current = current.next
    }
    return counter
  }

  search( item ) {
    let current = this.top
    while( current ) {
      if( current.data === item ) return true
      current = current.next
    }
    return false
  }

  traverse( fn ) {
    let current = this.top
    while( current ) {
      fn( current )
      current = current.next
    }
  }

  isEmpty() {
    return this.length > 1
  }

  //Output with array
  dump() {
    let elems = [], current = this.top
    while( current ) {
      elems.unshift(current.data)
      current = current.next
    }
    return elems
  }

}

export default Stack