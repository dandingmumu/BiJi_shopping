import{T as e,a5 as a,a6 as s,o as t,i as l,w as o,d as n,f as i,t as c,p as u,J as d}from"./index.59bb86cc.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";var f=r({data:()=>({numMoney:0,TxPrice:""}),onLoad(e){this.numMoney=e.numMoney},methods:{all(){0!=this.numMoney?this.TxPrice=this.numMoney:e.fail("暂无可提现金额")},tx(){0!=this.numMoney?a({money:this.TxPrice}).then((a=>{e.success(a.msg),setTimeout((()=>{s()}),1e3)})).catch((a=>{e.fail(a)})):e.fail("暂无可提现金额")}}},[["render",function(e,a,s,r,f,m){const p=u,h=d;return t(),l(p,null,{default:o((()=>[n(p,{class:"info"},{default:o((()=>[n(p,{class:"title"},{default:o((()=>[i(" 提现金额 ")])),_:1}),n(p,{class:"price"},{default:o((()=>[n(p,{class:"left"},{default:o((()=>[i(" ￥ ")])),_:1}),n(p,{class:"center"},{default:o((()=>[n(h,{type:"text",modelValue:f.TxPrice,"onUpdate:modelValue":a[0]||(a[0]=e=>f.TxPrice=e),placeholder:"请输入提现金额"},null,8,["modelValue"])])),_:1}),n(p,{class:"right",onClick:m.all},{default:o((()=>[i(" 全部提现 ")])),_:1},8,["onClick"])])),_:1}),n(p,{style:{"border-top":"1px solid #D8D8D8",width:"90%",margin:"40rpx auto"}}),n(p,{class:"tishi"},{default:o((()=>[i(" 可提现金额 "+c(f.numMoney)+" 元 ",1)])),_:1})])),_:1}),n(p,{class:"btn",onClick:m.tx},{default:o((()=>[i(" 申请提现 ")])),_:1},8,["onClick"])])),_:1})}],["__scopeId","data-v-4a0878ac"]]);export{f as default};
