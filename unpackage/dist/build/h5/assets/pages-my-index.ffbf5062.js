var e=Object.defineProperty,s=Object.defineProperties,t=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(s,t,a)=>t in s?e(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a;import{C as l,G as i,c,n as u,o as d,i as f,w as p,d as _,b as m,e as h,F as g,f as I,j as x,t as y,m as v,p as C,H as k}from"./index.59bb86cc.js";import{g as O}from"./users.934b1803.js";import{_ as b}from"./pictureFrame.af46d7f0.js";import{_ as E}from"./plugin-vue_export-helper.21dcd24c.js";const M={data:()=>({userInfo:{},isWeixin:l.isWeixin(),phone:"17300000000"}),computed:(w=((e,s)=>{for(var t in s||(s={}))r.call(s,t)&&n(e,t,s[t]);if(a)for(var t of a(s))o.call(s,t)&&n(e,t,s[t]);return e})({},i({isLogin:"isLogin"})),j={phoneNumbe(){return this.phone.substr(0,3)+"****"+this.phone.substring(7)}},s(w,t(j))),onLoad(e){let s=this;const{code:t,state:a,scope:r}=e;this.options=e,this.code=t||"",this.isWeixin&&t&&"snsapi_base"!==this.options.scope&&l.auth(t,a).then((e=>{let t=e.expires_time-s.$Cache.time();s.$store.commit("LOGIN",{token:e.token,time:t}),s.userInfo=e,this.$toast("登录成功"),s.$store.commit("SETUID",e.id),s.$store.commit("UPDATE_USERINFO",e.userInfo),setTimeout((e=>{location.href="/pages/index/index"}),800)})).catch((e=>{console.log(e)}))},onShow:function(){console.log(this.isLogin),this.isLogin&&c.get("LOGIN_STATUS_TOKEN")&&this.getUserInfo()},methods:{getUserInfo(){let e=this;O().then((s=>{e.userInfo=s.data,e.$store.commit("SETUID",s.data.uid),e.$store.commit("UPDATE_USERINFO",s.data)})).catch((e=>{console.log(e)}))},wechatAuthLogin(){console.log(123),this.$wechat.oAuth("snsapi_userinfo","/pages/my/index")},gotoMyPay(){u({url:"/pages/merchant/enter/index"})},gotoMy(){u({url:"/pages/users/users_exchequer/index"})},gotoinviteCode(){u({url:"../users/users_mycode/index"})},gotoOrder(e){u({url:"../users/myOrder/index?active="+e})}}};var w,j;var z=E(M,[["render",function(e,s,t,a,r,o){const n=v("van-image"),l=C,i=v("van-icon"),c=k,u=v("van-space");return d(),f(l,null,{default:p((()=>[_(l,{class:"content"},{default:p((()=>[_(l,{class:"shopping-userInfo"},{default:p((()=>[_(l,{class:"userInfo"},{default:p((()=>[_(l,{class:"avatar"},{default:p((()=>[r.userInfo.uid?(d(),m(g,{key:0},[h("img",{src:b,alt:"",srcset:""}),_(l,{class:"avatarImg"},{default:p((()=>[_(n,{width:"100%",height:"100%",src:r.userInfo.avatar},null,8,["src"])])),_:1})],64)):(d(),f(l,{key:1,class:"avatarImg"},{default:p((()=>[_(n,{width:"100%",height:"100%",src:"/static/icon/avatar.png"})])),_:1}))])),_:1}),_(l,{class:"nickname"},{default:p((()=>[!r.userInfo.uid&&r.isWeixin?(d(),f(l,{key:0,class:"name",onClick:o.wechatAuthLogin,style:{height:"100%",display:"flex","align-items":"center"}},{default:p((()=>[I(" 请点击授权 ")])),_:1},8,["onClick"])):x("",!0),r.userInfo.uid?(d(),f(l,{key:1,class:"Info"},{default:p((()=>[_(l,null,{default:p((()=>[h("span",null,y(r.userInfo.nickname),1)])),_:1}),_(l,{class:"level"},{default:p((()=>[h("span",{style:{"font-size":"38rpx","margin-bottom":"8rpx"}},"♔"),h("span",null,"老板")])),_:1})])),_:1})):x("",!0),r.userInfo.phone?(d(),f(l,{key:2,class:"ipone",onClick:s[0]||(s[0]=s=>e.goEdit())},{default:p((()=>[_(l,{class:"num-txt"},{default:p((()=>[I("ID："+y(r.userInfo.uid),1)])),_:1})])),_:1})):x("",!0)])),_:1}),_(l,{class:""}),r.userInfo.uid&&r.isWeixin?(d(),f(c,{key:0,url:"../users/users_setting/index","hover-class":"none"},{default:p((()=>[_(i,{class:"setting",name:"setting-o",size:"40rpx"})])),_:1})):x("",!0)])),_:1}),_(l,{class:"userExchequer"},{default:p((()=>[_(u,{size:"40rpx"},{default:p((()=>[_(l,{class:"userExchequerItem",onClick:o.gotoinviteCode,style:{"border-right":"1px solid #C8C8C8","padding-right":"10rpx"}},{default:p((()=>[_(l,{class:"userExchequerItemIcon userExchequerItemscan"},{default:p((()=>[_(i,{name:"scan",size:"44rpx",color:"#fff"})])),_:1}),_(l,{class:"InvitationCode"},{default:p((()=>[h("span",{class:"yard"},"邀请码"),h("span",{class:"invite"},"邀请好友赚钱")])),_:1})])),_:1},8,["onClick"]),_(l,{class:"userExchequerItem",onClick:o.gotoMy},{default:p((()=>[_(l,{class:"userExchequerItemIcon userExchequerItemWallet"},{default:p((()=>[_(i,{name:"paid",size:"44rpx",color:"#fff"})])),_:1}),_(l,{class:"myWallet"},{default:p((()=>[h("span",{class:"purse"},"我的金库"),h("span",{class:"deposit"},"收益可提现")])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1}),_(l,{class:"shopping-myOrder"},{default:p((()=>[_(l,{class:"orderCell",onClick:s[2]||(s[2]=e=>o.gotoOrder(0))},{default:p((()=>[_(l,{class:"orderCell__title"},{default:p((()=>[I(" 我的订单 ")])),_:1}),_(l,{class:"orderCell__extra",onClick:s[1]||(s[1]=e=>o.gotoOrder(0))},{default:p((()=>[I(" 全部订单 "),_(i,{name:"arrow"})])),_:1})])),_:1}),_(l,{class:"orderMenus"},{default:p((()=>[_(l,{class:"orderMenusItem",onClick:s[3]||(s[3]=e=>o.gotoOrder(1))},{default:p((()=>[_(l,{class:"orderMenusItem__icon"},{default:p((()=>[_(i,{size:"50rpx",name:"paid"})])),_:1}),_(l,{class:"orderMenusItem__title"},{default:p((()=>[I(" 已支付 ")])),_:1})])),_:1}),_(l,{class:"orderMenusItem",onClick:s[4]||(s[4]=e=>o.gotoOrder(2))},{default:p((()=>[_(l,{class:"orderMenusItem__icon"},{default:p((()=>[_(i,{size:"50rpx",name:"underway-o"})])),_:1}),_(l,{class:"orderMenusItem__title"},{default:p((()=>[I(" 已预约 ")])),_:1})])),_:1}),_(l,{class:"orderMenusItem",onClick:s[5]||(s[5]=e=>o.gotoOrder(3))},{default:p((()=>[_(l,{class:"orderMenusItem__icon"},{default:p((()=>[_(i,{size:"50rpx",name:"notes-o"})])),_:1}),_(l,{class:"orderMenusItem__title"},{default:p((()=>[I(" 已完成 ")])),_:1})])),_:1}),_(l,{class:"orderMenusItem",onClick:s[6]||(s[6]=e=>o.gotoOrder(4))},{default:p((()=>[_(l,{class:"orderMenusItem__icon"},{default:p((()=>[_(i,{size:"50rpx",name:"cash-back-record"})])),_:1}),_(l,{class:"orderMenusItem__title"},{default:p((()=>[I(" 退款/售后 ")])),_:1})])),_:1})])),_:1})])),_:1}),_(l,{class:"shopping-customerService"},{default:p((()=>[_(l,{class:"shopping-customerServiceCell"},{default:p((()=>[h("div",{class:"service-"},[_(i,{size:"46rpx",name:"service-o"})]),_(l,{class:"service-o",style:{flex:"1"}},{default:p((()=>[I(" 在线客服 ")])),_:1}),_(i,{name:"arrow",size:"40rpx"})])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-4e026f45"]]);export{z as default};