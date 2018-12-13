
//栈
function Stack(){
    this.warehouse = []

    //栈的元素个数
    this.top    = 0
}

Stack.prototype.pop = function() {
  return this.warehouse[--this.top]
}

Stack.prototype.push = function(element) {
  this.warehouse[this.top++] = element
}

Stack.prototype.peek = function() {
  return this.warehouse[this.top - 1]
}

Stack.prototype.clear = function() {
  this.top = 0
}

Stack.prototype.length = function() {
  return this.top
}