#!/usr/bin/env node

let superagent = require("superagent")
let program = require("commander")
let inquirer = require("inquirer")
let {version} = require("./package.json")

const list = [{
    type:"input",
    name:"con",
    message:"请输入翻译内容"
}]

program
        .version(version)
        .action(()=>{
            inquirer.prompt(list).then(({con})=>{
                if(con){
                    superagent
                    .get("http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1")
                    .query({q:con})
                    .end((err,res)=>{
                        console.log(res.body.translation[0])
                    })
                }else{
                    console.log("不存在")
                }
            })
        })
program.parse(process.argv)