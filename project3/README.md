# p3 学习笔记
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
### 日期对象Date
