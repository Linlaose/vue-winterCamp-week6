import{_,M as g,o as a,c as n,a as t,t as i,e as v,v as P,f as m,m as y,g as f,r as $,F as k,h as M,b as w,n as C,d as u}from"./index-d9436879.js";import{p as h}from"./cartsProductsStore-04ac97dd.js";const x={props:{product:Object,apiUrl:String,apiPath:String},data(){return{productModal:null,tempProduct:{}}},mounted(){this.productModal=new g(this.$refs.modal,{backdrop:"static"})},methods:{addToCart(o,e=1){const r=`${this.apiUrl}/v2/api/${this.apiPath}/cart`,l={product_id:o,qty:e};this.$http.post(r,{data:l}).then(s=>{alert(s.data.message),this.productModal.hide()}).catch(s=>{alert(s)})}},watch:{product(o){this.tempProduct=o,this.productModal.show()}}},U={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},T={class:"modal-dialog modal-xl",role:"document"},S={class:"modal-content border-0"},V={class:"modal-header bg-dark text-white"},q={class:"modal-title",id:"exampleModalLabel"},B=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),L={class:"modal-body"},N={class:"row"},z={class:"col-sm-6"},D=["src"],F={class:"col-sm-6"},j={class:"badge bg-primary rounded-pill"},A={key:0,class:"h5"},E={key:1},H={class:"h6"},I={class:"h5"},O={class:"input-group"};function G(o,e,r,l,s,c){return a(),n("div",U,[t("div",T,[t("div",S,[t("div",V,[t("h5",q,[t("span",null,i(s.tempProduct.title),1)]),B]),t("div",L,[t("div",N,[t("div",z,[t("img",{src:s.tempProduct.imageUrl,class:"img-fluid",alt:""},null,8,D)]),t("div",F,[t("span",j,i(s.tempProduct.category),1),t("p",null,"商品描述："+i(s.tempProduct.description),1),t("p",null,"商品內容："+i(s.tempProduct.content),1),s.tempProduct.price===s.tempProduct.origin_price?(a(),n("div",A,i(s.tempProduct.price)+" 元 ",1)):(a(),n("div",E,[t("del",H,"原價 "+i(s.tempProduct.origin_price)+" 元",1),t("div",I,"現在只要 "+i(s.tempProduct.price)+" 元",1)])),t("div",null,[t("div",O,[v(t("input",{type:"number",class:"form-control",min:"1","onUpdate:modelValue":e[0]||(e[0]=p=>s.tempProduct.qty=p)},null,512),[[P,s.tempProduct.qty,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:e[1]||(e[1]=m(p=>c.addToCart(s.tempProduct.id,s.tempProduct.qty),["prevent"]))}," 加入購物車 ")])])])])])])])],512)}const J=_(x,[["render",G]]),K={name:"HomeProducts",data(){return{products:[],product:{}}},components:{UserProductModal:J},methods:{openModal(o,e=1){const r=`${this.apiUrl}/v2/api/${this.apiPath}/product/${o}`;this.$http.get(r).then(l=>{this.product={...l.data.product,qty:e}}).catch(l=>{alert(l)})},addToCart(o,e=1){const r=`${this.apiUrl}/v2/api/${this.apiPath}/cart`,l={product_id:o,qty:e};this.$http.post(r,{data:l}).then(s=>{alert(s.data.message)}).catch(s=>{alert(s)})},...y(h,["getProducts"])},computed:{...f(h,["newProducts","apiUrl","apiPath"])},watch:{parentProducts(o){this.products=o}},mounted(){this.getProducts()}},Q=t("h1",null,"This is 產品列表頁面",-1),R={class:"table align-middle"},W=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),X={style:{width:"200px"}},Y={key:0,class:"h5"},Z={key:1},tt={class:"h6"},st={class:"h5"},ot={class:"btn-group btn-group-sm"},et=["onClick"],it=t("i",{class:"fas fa-spinner fa-pulse"},null,-1),dt=["onClick"],lt=t("i",{class:"fas fa-spinner fa-pulse"},null,-1);function at(o,e,r,l,s,c){const p=$("user-product-modal");return a(),n("div",null,[Q,t("table",R,[W,t("tbody",null,[(a(!0),n(k,null,M(o.newProducts,d=>(a(),n("tr",{key:d.id},[t("td",X,[t("div",{style:C([{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${d.imageUrl})`}])},null,4)]),t("td",null,i(d.title),1),t("td",null,[d.price===d.origin_price?(a(),n("div",Y,i(d.price)+" 元 ",1)):(a(),n("div",Z,[t("del",tt,"原價 "+i(d.origin_price)+" 元",1),t("div",st,"現在只要 "+i(d.price)+" 元",1)]))]),t("td",null,[t("div",ot,[t("button",{type:"button",class:"btn btn-outline-secondary",onClick:m(b=>c.openModal(d.id),["prevent"])},[it,u(" 查看更多 ")],8,et),t("button",{type:"button",class:"btn btn-outline-danger",onClick:b=>c.addToCart(d.id)},[lt,u(" 加到購物車 ")],8,dt)])])]))),128))])]),w(p,{product:s.product,"api-url":o.apiUrl,"api-path":o.apiPath},null,8,["product","api-url","api-path"])])}const ct=_(K,[["render",at]]);export{ct as default};
