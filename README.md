### timeline
- 3.11 project-1 completed.
- 3.20 p-2 completed.
# CS142学习笔记

## p3 笔记
### JS OOP (ES6写法)
```Javascript
class DatePicker {
  constructor(id, callback) {
    this.container = document.getElementById(id);
    this.callback = callback;
  }

  render(date) {
    // 渲染日历结构
  }

  static getMonthName(index) {
    return [...][index];
  }
}
```
- constructor( ) 是构造函数
- this 指向当前实例
- render( ) 类的方法，构建日历内容

### DOM操作和事件绑定
DOM（Document Object Model）是浏览器中用来表示网页结构的一种对象模型。DOM 操作就是通过 JavaScript 创建、修改或删除页面上的 HTML 元素。
#### 常见的DOM操作
创建HTML元素：
```Javascript
const cell = document.createElement('div'); // 创建一个新的 div
```
设置文本内容
```Javascript
cell.textContent = current.getDate(); // 设置日期号，如 1, 2, 3...
```
添加类名以便CSS样式：
```Javascript
cell.className = 'calendar-day'; // 赋予样式类
```
添加子元素
```Javascript
grid.appendChild(cell); // 把 cell 放入 grid 网格中
```
清空容器内容
```javascript
this.container.innerHTML = ''; // 每次切换月份时清空旧的内容
```
#### 事件绑定
事件绑定是让 JS 监听某些操作（如点击），并在触发时执行特定函数。
```javascript
cell.onclick = () => {
  this.callback(this.id, {
    month: current.getMonth() + 1,
    day: current.getDate(),
    year: current.getFullYear()
  });
};
```
-	当你点击某一天（cell）时，就会调用回调函数 callback
-	回调传出这一天的 {month, day, year} 数据
-	使用箭头函数是为了保证 this 仍然指向当前 DatePicker 实例

### 日期对象Date
