import React from "react"
import cheerio from "cheerio"
import axios from "axios"

const LONG_MAN_BaseUrl="https://www.ldoceonline.com/dictionary/";
const LONG_MAN_Selector='.dictionary .dictentry .Sense .DEF'

export const scrap = (term) => {
  const cleaner = require('get-clean-string')();
  axios.get(LONG_MAN_BaseUrl + term).then(res => parsingHtml(res.data, LONG_MAN_Selector)).then(res => {
    //array1 children array2 data
    for(let i = 0; i < res.length; i++) {
      let fullSentence ="";
      const children = res[i].children;
      children.forEach(child => {
        fullSentence += extractText(child);
      })
      console.log(cleaner(fullSentence))
    }
  })
}

const extractText = (element) => {
  if(element.type === "text"){
    if(element.data){
      return element.data;
    }
  }
  else{
    if(element.children.length > 0){
      let fullSentence = "";
      element.children.forEach(child => fullSentence += extractText(child))
      return fullSentence;
    }  
  }
  return "";
}

const parsingHtml = (html, selector, context) => {
  const $ = cheerio.load(html);
  let loadedCheerio;
  if(context) {
    return loadedCheerio = $(selector, context)
  }
  else{
    return loadedCheerio = $(selector)
  }
}
