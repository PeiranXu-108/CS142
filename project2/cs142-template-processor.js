/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
'use strict';

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    return this.template.replace(/{{(.*?)}}/g, function (match, prop) {
        return dictionary.hasOwnProperty(prop) ? dictionary[prop] : ' ';
    });
};

var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
var dateTemplate = new Cs142TemplateProcessor(template);

var dictionary = { month: "July", day: "1", year: "2016" };
var str = dateTemplate.fillIn(dictionary);

assert(str === "My favorite month is July but not the day 1 or the year 2016");

// Case: property doesn't exist in dictionary
var dictionary2 = { day: "1", year: "2016" };
var str = dateTemplate.fillIn(dictionary2);

assert(str === "My favorite month is  but not the day 1 or the year 2016");