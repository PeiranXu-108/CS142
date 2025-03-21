

 # 📘 CS142 Project 2 学习笔记
 
 > 本项目通过三个功能模块帮助理解 JavaScript 中的作用域、闭包、this、window、模块化封装等关键知识点。
 
 ---
 
 ## 🧩 项目结构
 
 - **Problem 1**: 实现 `cs142MakeMultiFilter`，支持链式数组过滤
 - **Problem 2**: 实现 `Cs142TemplateProcessor` 类，处理模板字符串填充
 - **Problem 3**: 重构测试文件，使用模块封装防止变量污染全局作用域
 
 ---
 
 ## 🔹 `this` 的使用
 
 在构造函数或类方法中，`this` 指向新创建的对象。
 
 ```javascript
 function Cs142TemplateProcessor(template) {
   this.template = template;
 }
 
 Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
   return this.template.replace(...);
 };
 ```
 
 - 在 `fillIn` 方法中，`this.template` 引用的是传入的模板字符串。
 - `this` 会根据函数调用方式动态绑定。
 
 ---
 
 ## 🔹 `window` 全局对象与命名空间污染
 
 浏览器中的全局对象是 `window`，所有在全局作用域下声明的变量都会成为 `window` 的属性。
 
 ```javascript
 var x = 42;
 console.log(window.x); // 42
 ```
 
 ### ❗️ 问题
 如果不小心让变量进入全局作用域，会造成命名冲突。
 
 ### ✅ 项目中解决方案（Problem 3）
 
 使用匿名函数（IIFE）创建作用域：
 
 ```javascript
 (function () {
   var template = "...";  // 不污染 window
 
   window.cs142Project2Results = {
     p1Message: "SUCCESS"
   };
 })();
 ```
 
 ---
 
 ## 🔹 匿名函数与模块封装（IIFE）
 
 立即执行函数表达式（IIFE）是模块封装的经典写法：
 
 ```javascript
 (function () {
   // 这里的变量和函数不会进入 window
 })();
 ```
 
 ### ✅ 在项目中的作用：
 - 防止变量如 `template`, `dictionary`, `str` 等暴露到全局
 - 保证测试逻辑独立、清晰
 - 避免测试间互相干扰
 
 ---
 
 ## 🔹 闭包与链式函数（Problem 1）
 
 ```javascript
 function cs142MakeMultiFilter(originalArray) {
   let currentArray = originalArray.slice();
 
   function arrayFilterer(filterCriteria, callback) {
     ...
     return arrayFilterer; // 实现链式调用
   }
 
   return arrayFilterer;
 }
 ```
 
 - 闭包让 `currentArray` 在每次调用时都能记住上次的状态
 - 返回自身实现链式调用：
   ```javascript
   cs142MakeMultiFilter([1, 2, 3])(f1)(f2)();
   ```
 
 ---
 
 ## 🔹 模板字符串替换（Problem 2）
 
 使用正则表达式和 `replace()` 替换模板中的变量：
 
 ```javascript
 fillIn(dictionary) {
   return this.template.replace(/{{(.*?)}}/g, (match, prop) => {
     return dictionary.hasOwnProperty(prop) ? dictionary[prop] : '';
   });
 }
 ```
 
 - `/{{(.*?)}}/g` 匹配所有 `{{变量名}}` 的字符串
 - `hasOwnProperty()` 避免读取继承属性
 
 ---
 
 ## 🔎 测试文件变量污染问题（Problem 3）
 
 ### ❌ 错误写法：
 ```javascript
 varDeclared.push("template");
 ```
 
 - 这会导致检测时误判为变量污染了全局作用域。
 - 实际上变量已封装在函数内部，不应加入 `varDeclared`。
 
 ### ✅ 正确做法：
 不要将局部变量名手动加入 `varDeclared`。
 
 ---
 
 ## ✅ 总结
 
 | 知识点 | 收获 |
 |--------|------|
 | `this` | 理解函数上下文，构造函数中代表实例 |
 | `window` | 全局对象，避免不必要变量暴露 |
 | 匿名函数 | 实现模块封装（IIFE）防止污染 |
 | 闭包 | 实现状态保存与链式调用 |
 | 模板填充 | 正则表达式动态替换变量 |
 | 封装与模块化 | 保持代码整洁、可维护 |
 
 ---
 
