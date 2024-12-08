const{entries:V}=Object,{fromEntries:et}=Object,st="ENTRIES",L="KEYS",T="VALUES",_="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===_)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==_).join("")}value(){return E(this._path).node.get(_)}result(){switch(this._type){case T:return this.value();case L:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],nt=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const c of e.keys())if(c===_){const a=o[d-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let h=0;h<c.length;++h,++a){const g=c[h],m=i*a,p=m-i;let l=o[m];const f=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let F=f;F<y;++F){const v=g!==t[F],z=o[p+F]+ +v,A=o[p+F+1]+1,w=o[m+F]+1,j=o[m+F+1]=Math.min(z,A,w);j<l&&(l=j)}if(l>s)continue t}R(e.get(c),t,s,n,o,a,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==_&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ot(this._tree,t)}entries(){return new D(this,st)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return nt(this._tree,t,s)}get(t){const s=k(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){const s=k(this._tree,t);return s!==void 0&&s.has(_)}keys(){return new D(this,L)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,I(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},k=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return k(e.get(s),t.slice(s.length))},I=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==_&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const c=new Map;c.set(u.slice(r),d),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ot=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(_),s.size===0)W(n);else if(s.size===1){const[o,u]=s.entries().next().value;q(n,o,u)}}},W=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)W(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&q(e.slice(0,-1),n,o)}},q=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],ut=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},it=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,M="or",$="and",rt="and_not",ct=(e,t)=>{e.includes(t)||e.push(t)},N=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},P=({score:e},{score:t})=>t-e,lt=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,ht={[M]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),N(n.terms,u)}}return e},[$]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);N(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[rt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},at=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,lt),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},gt={k:1.2,b:.7,d:.5},mt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(it),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:M,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:gt},pt={combineWith:$,prefix:(e,t,s)=>t===s.length-1},Ft={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},_t={...Ft,...U},K=Symbol("*"),yt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,u]of e._documentIds){const i=n.boostDocument?n.boostDocument(u,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},X=(e,t=M)=>{if(e.length===0)return new Map;const s=t.toLowerCase(),n=ht[s];if(!n)throw new Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map},S=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const c of Object.keys(u)){const a=u[c],h=e._fieldIds[c],g=o.get(h);if(g==null)continue;let m=g.size;const p=e._avgFieldLength[h];for(const l of g.keys()){if(!e._documentIds.has(l)){ft(e,h,l,s),m-=1;continue}const f=i?i(e._documentIds.get(l),s,e._storedFields.get(l)):1;if(!f)continue;const y=g.get(l),F=e._fieldLength.get(l)[h],v=dt(y,m,e._documentCount,F,p,r),z=n*a*f*v,A=d.get(l);if(A){A.score+=z,ct(A.terms,t);const w=G(A.match,s);w?w.push(c):A.match[s]=[c]}else d.set(l,{score:z,terms:[t],match:{[s]:[c]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((l,f)=>({...l,[f]:G(n.boost,f)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:c,prefix:a}={...J.weights,...i},h=e._index.get(t.term),g=S(e,t.term,t.term,1,h,o,u,d);let m,p;if(t.prefix&&(m=e._index.atPrefix(t.term)),t.fuzzy){const l=t.fuzzy===!0?.2:t.fuzzy,f=l<1?Math.min(r,Math.round(t.term.length*l)):l;f&&(p=e._index.fuzzyGet(t.term,f))}if(m)for(const[l,f]of m){const y=l.length-t.term.length;if(!y)continue;p?.delete(l);const F=a*l.length/(l.length+.3*y);S(e,t.term,l,F,f,o,u,d,g)}if(p)for(const l of p.keys()){const[f,y]=p.get(l);if(!y)continue;const F=c*l.length/(l.length+y);S(e,t.term,l,F,f,o,u,d,g)}return g},Y=(e,t,s={})=>{if(t===K)return yt(e,s);if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(g=>Y(e,g,a));return X(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,c=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(at(i)).map(a=>At(e,a,i));return X(c,i.combineWith)},Q=(e,t,s={})=>{const n=Y(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const c=r.length||1,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(d),queryTerms:r,match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return t===K&&s.boostDocument==null&&e._options.searchOptions.boostDocument==null||o.sort(P),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Q(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(P),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?_t:t.autoVacuum;this._options={...mt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...pt,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=b(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=b(u),h._avgFieldLength=i,h._storedFields=b(r),h._dirtCount=d||0,h._index=new C;for(const[g,m]of h._documentIds)h._idToShortId.set(m,g);for(const[g,m]of e){const p=new Map;for(const l of Object.keys(m)){let f=m[l];c===1&&(f=f.ds),p.set(parseInt(l,10),b(f))}h._index.set(g,p)}return h},B=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let h="";i===0?h=c.length>20?`… ${c.slice(-20)}`:c:a?h=c.length+i>100?`${c.slice(0,100-i)}… `:c:h=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const c=d+n.length;if(r(e.slice(u,d)),u=c,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},wt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),xt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),Z=(e,t,s={})=>{const n={};return Q(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),c=u.includes("#"),[a,h]=u.split(/[#@]/),g=Number(a),m=i.sort((l,f)=>l.length-f.length).filter((l,f)=>i.slice(f+1).every(y=>!y.includes(l))),{contents:p}=n[g]??={title:"",contents:[]};if(d)p.push([{type:"customField",id:g,index:h,display:m.map(l=>o.c.map(f=>B(f,l))).flat().filter(l=>l!==null)},r]);else{const l=m.map(f=>B(o.h,f)).filter(f=>f!==null);if(l.length&&p.push([{type:c?"heading":"title",id:g,...c&&{anchor:h},display:l},r]),"t"in o)for(const f of o.t){const y=m.map(F=>B(f,F)).filter(F=>F!==null);y.length&&p.push([{type:"text",id:g,...c&&{anchor:h},display:y},r])}}}),V(n).sort(([,o],[,u])=>"max"==="total"?wt(o,u):xt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=ut(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},tt=(e,t,s={})=>{const n=Ct(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},bt=et(V(JSON.parse("{\"/\":{\"documentCount\":33,\"nextId\":33,\"documentIds\":{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"3#lambda表达式\",\"4\":\"3#定义\",\"5\":\"3#方法引用\",\"6\":\"3#函数式接口\",\"7\":\"3#定义-1\",\"8\":\"3#functionalinterface注解\",\"9\":\"3#常用函数式接口\",\"10\":\"3#consumer-t-消费型接口\",\"11\":\"3#supplier-t-供给型接口\",\"12\":\"3#function-t-r-函数型接口\",\"13\":\"3#predicate-t-断言型接口\",\"14\":\"4\",\"15\":\"4#安装\",\"16\":\"4#初始化与设置远程\",\"17\":\"4#提交规范\",\"18\":\"4#commit-message格式\",\"19\":\"4#分支管理\",\"20\":\"5\",\"21\":\"5#引入依赖\",\"22\":\"5#编写配置类\",\"23\":\"5#编写相关功能\",\"24\":\"6\",\"25\":\"6#引入依赖\",\"26\":\"6#添加数据库配置信息\",\"27\":\"6#mybatis相关配置\",\"28\":\"7\",\"29\":\"8\",\"30\":\"9\",\"31\":\"10\",\"32\":\"11\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,1],\"1\":[1,1],\"2\":[1],\"3\":[1],\"4\":[1,16],\"5\":[1,23],\"6\":[1],\"7\":[1,14],\"8\":[2,6],\"9\":[1],\"10\":[2,35],\"11\":[2,13],\"12\":[2,41],\"13\":[2,29],\"14\":[1],\"15\":[1,5],\"16\":[1,24],\"17\":[1],\"18\":[2,40],\"19\":[1,18],\"20\":[1],\"21\":[1,13],\"22\":[1,31],\"23\":[1,83],\"24\":[1],\"25\":[1,31],\"26\":[1,26],\"27\":[1,58],\"28\":[1,3],\"29\":[1],\"30\":[1],\"31\":[1],\"32\":[1]},\"averageFieldLength\":[1.1818181818181819,20.360906862745093],\"storedFields\":{\"0\":{\"h\":\"介绍页\",\"t\":[\"winkit\"]},\"1\":{\"h\":\"rust\",\"t\":[\"dspfomrepv\"]},\"2\":{\"h\":\"Lambda表达式与函数式接口\"},\"3\":{\"h\":\"Lambda表达式\"},\"4\":{\"h\":\"定义\",\"t\":[\"Lambda是一个匿名函数，它允许将函数作为方法的参数传递\",\"结构如下：\",\"(parameters) -> {statements} // 参数列表 lambda体\",\"若parameters 只有一个参数，则()为可选地。\",\"若statements只包含一个语句，则{}为可选的，同时不必显式返回\",\"Lambda的参数类型及返回值类型可以自动推断\"]},\"5\":{\"h\":\"方法引用\",\"t\":[\"方法引用是一种更简洁的Lambda表达式，它允许直接访问类或实例已经存在的方法或构造方法\",\"结构如下：\",\"类名/实例名 :: 方法名\",\"构造函数语法格式：\",\"类名 ::new // Function<String, Integer> stringToInteger = (String s) -> Integer.parseInt(s) = Integer::parseInt;\",\"Lambda体中调用方法的参数列表与返回值类型，要与函数式接口中抽象方法的函数列表和返回值类型保存一致\",\"若Lambda参数列表中的第一个参数是实例方法的调用者，而第二个参数是实例方法的参数时，可以使用ClassName::method\"]},\"6\":{\"h\":\"函数式接口\"},\"7\":{\"h\":\"定义\",\"t\":[\"有且仅有一个抽象方法的接口被称为函数式接口（不包括static、default以及Object类所有的方法），可以使用lambda表达式创建一个函数式接口的对象。\",\"语法格式：\",\"@FunctionalInterface 修饰符 interface 接口名称 { 返回值类型 方法名称(可选参数信息); // 其他非抽象方法内容 }\"]},\"8\":{\"h\":\"@FunctionalInterface注解\",\"t\":[\"Java8中专门为函数式接口提供的注解，当该注解作用于一个接口时，编译器会强制检查该接口是否有且仅有一个抽象方法，否则会报错，非必须。\"]},\"9\":{\"h\":\"常用函数式接口\"},\"10\":{\"h\":\": 消费型接口\",\"t\":[\"抽象方法： void accept(T t), 接收一个参数进行消费，但无需返回结果\",\"例：\",\" Consumer consumer = System.out::println; consumer.accept(\\\"hello function\\\"); // System.out::println 即为accept()方法的具体实现\",\"默认方法 ：public Consumer<T> andThen(@NotNull Consumer<? super T> after )\",\"例\",\"consumer1.andThen(consumer2).accept() //andThen()和accept的顺序不能颠倒。\",\"执行顺序：先执行consumer1的accept()方法，接着执行andThen()中consumer2的accept()方法\"]},\"11\":{\"h\":\": 供给型接口\",\"t\":[\"抽象方法 ：T get(),无参有返回值\",\"例：\",\" Supplier<String> supplier = () -> \\\"test\\\"; System.out.println(supplier.get()); //test\"]},\"12\":{\"h\":\":函数型接口\",\"t\":[\"抽象方法 : R apply(T t),传入一个参数并返回结果\",\"例：\",\" Function<Integer, Integer> function1 = e -> e * 6; System.out.println(function1.apply(2));//12\",\"默认方法：\",\"public <V> Function<V, R> compose( @NotNull Function<? super V, ? extends T> before )\",\"例：\",\"function1.compose(function2).apply(param1)\",\"执行顺序：\",\"先执行function2的apply(param1)方法，得到param2,接着执行function1中的apply(param2)\"]},\"13\":{\"h\":\":断言型接口\",\"t\":[\"抽象方法 ：boolean test(T t) ,传入一个参数返回布尔值\",\"例：\",\" Predicate<Integer> predicate = t -> t > 0; boolean test = predicate.test(1);//true\",\"默认方法：\",\"public Predicate<T> and( @NotNull Predicate<? super T> other ) 相当于&&\",\"public Predicate<T> or( @NotNull Predicate<? super T> other ) 相当于||\",\"public Predicate<T> negate() 相当于 !(取反)\"]},\"14\":{\"h\":\"git相关\"},\"15\":{\"h\":\"安装\",\"t\":[\"https://git-scm.com/downloads\"]},\"16\":{\"h\":\"初始化与设置远程\",\"t\":[\"初始化仓库：\",\"git init\",\"添加远程仓库：\",\"git remote add origin https://github.com/winkik/foo.git\",\"将工作区的修改添加到暂存区\",\"git add .\",\"将暂存区中的修改提交到版本库：\",\"git commit -m \\\"Initial commit\\\"\",\"将当前分支重命名为main\",\"git branch -M main\",\"将代码推送到远程main分支并与当前分支绑定\",\"git push -u origin main\"]},\"17\":{\"h\":\"提交规范\"},\"18\":{\"h\":\"commit message格式\",\"t\":[\" <type>(<scope>): <subject> 例：feat(miniprogram): 增加了小程序模板消息相关功能\",\"scope : commit作用范围 subject : 描述 type : 提交类型，分类如下：\",\"feat - 新功能 feature\",\"fix - 修复 bug\",\"docs - 文档注释\",\"style - 代码格式(不影响代码运行的变动)\",\"refactor - 重构、优化(既不增加新功能，也不是修复bug)\",\"perf - 性能优化\",\"test - 增加测试\",\"chore - 构建过程或辅助工具的变动\",\"revert - 回退\",\"build - 打包\"]},\"19\":{\"h\":\"分支管理\",\"t\":[\"创建分支\",\"git branch dev\",\"切换到指定分支\",\"git checkout dev or git switch dev\",\"以上两步可以合并为：\",\" git checkout -b dev\",\"查看当前分支：\",\"git branch * dev #'*' 标记当前所在分支 master\",\"合并指定分支到当前分支上：\",\"git merge dev #将dev分支合并到master分支\",\"删除分支：\",\"git branch -d dev\"]},\"20\":{\"h\":\"java使用jSerialComm进行串口通信\"},\"21\":{\"h\":\"引入依赖\",\"t\":[\" <dependency> <groupId>com.fazecast</groupId> <artifactId>jSerialComm</artifactId> <version>2.9.2</version> </dependency>\"]},\"22\":{\"h\":\"编写配置类\",\"t\":[\"@Configuration public class SerialConfig { @Bean public SerialPort serialPort(){ SerialPort serialPort = SerialPort.getCommPort(\\\"COM2\\\"); // 配置波特率，数据位，停止位和校验位 serialPort.setBaudRate(9600); serialPort.setNumDataBits(8); //serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_BLOCKING,1000,1000); serialPort.setNumStopBits(SerialPort.ONE_STOP_BIT); serialPort.setParity(SerialPort.NO_PARITY); return serialPort; } }\"]},\"23\":{\"h\":\"编写相关功能\",\"t\":[\"@Component public class SerialService { @Resource private SerialPort serialPort; // 打开串口 public boolean openPort() { boolean result = false; if(!serialPort.isOpen()){ result = serialPort.openPort(); } return result; } // 关闭串口 public void closePort() { serialPort.closePort(); } // 发送数据 public void sendData(String data) { // serialPort.flushIOBuffers(); if (serialPort.isOpen()) { serialPort.flushIOBuffers(); //清除缓冲区 byte[] buffer = data.getBytes(); serialPort.writeBytes(buffer, buffer.length); } else { throw new IllegalStateException(\\\"Serial port is not open\\\"); } } // 接收数据 public String receiveData() { if (serialPort.isOpen()) { serialPort.flushIOBuffers(); StringBuilder dataBuffer = new StringBuilder(); // 缓存数据 try { while (true) { // 读取单字节数据 byte[] readBuffer = new byte[1]; int numRead = serialPort.readBytes(readBuffer, readBuffer.length); if (numRead > 0) { char receivedChar = (char) readBuffer[0]; // 转换为字符 if (receivedChar == '*') { // 遇到*，结束读取 //这里*为自定义的每行语句的结束符 String res = dataBuffer.toString(); System.out.println(\\\"收到完整数据：\\\" + res); dataBuffer.setLength(0); // 清空缓冲区 return res; } else { dataBuffer.append(receivedChar); // 添加到缓冲区 } } } } catch (Exception e) { throw new RuntimeException(e); } } else { throw new IllegalStateException(\\\"Serial port is not open\\\"); } } /** * 发送和接收数据 */ public synchronized String sendAndRecvSync(String data){ closePort(); openPort(); sendData(data); String res = receiveData(); return res; } }\"]},\"24\":{\"h\":\"springboot整合mybatis\"},\"25\":{\"h\":\"引入依赖\",\"t\":[\" <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-jdbc</artifactId> </dependency> <dependency> <groupId>org.mybatis.spring.boot</groupId> <artifactId>mybatis-spring-boot-starter</artifactId> <version>3.0.3</version> </dependency> <!-- MySQL Connector --> <dependency> <groupId>mysql</groupId> <artifactId>mysql-connector-java</artifactId> <version>8.0.33</version> </dependency>\"]},\"26\":{\"h\":\"添加数据库配置信息\",\"t\":[\"spring: datasource: url: jdbc:mysql://101.35.217.89:3306/air_fryer?useUnicode=true&characterEncoding=utf-8&useSSL=true username: root password: xxxx driver-class-name: com.mysql.cj.jdbc.Driver\"]},\"27\":{\"h\":\"mybatis相关配置\",\"t\":[\"在 resources/目录下创建mybatis文件夹,包含config和mapper两个子文件夹： 结构如下：\",\"resources │--application.yml │ └─mybatis ├─config │ mybatis-config.xml //mybatis配置文件 │ └─mapper //mapper文件存放地址 Env_Mapper.xml\",\"在application.yml中填加相关配置信息：\",\"mybatis: mapper-locations: classpath:/mybatis/mapper/*.xml config-location: classpath:/mybatis/config/mybatis-config.xml\",\"配置扫描mapper接口类\",\"在启动类上加入@MapperScan(\\\"接口路径\\\")\",\"在每个接口类中加入@Mapper()注解\",\"编写xml文件\",\"namespace指向对应的接口类的路径\",\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?> <!DOCTYPE mapper PUBLIC \\\"-//mybatis.org//DTD Mapper 3.0//EN\\\" \\\"http://mybatis.org/dtd/mybatis-3-mapper.dtd\\\"> <mapper namespace=\\\"com.winkky.cloud.airfryer.dao.IEnvDao\\\"></mapper>\"]},\"28\":{\"h\":\"\",\"t\":[\"404 Not Found\"]},\"29\":{\"h\":\"Rust\"},\"30\":{\"h\":\"Backend\"},\"31\":{\"h\":\"Posts\"},\"32\":{\"h\":\"Java\"}},\"dirtCount\":0,\"index\":[[\"404\",{\"1\":{\"28\":1}}],[\"注解\",{\"1\":{\"27\":1}}],[\"配置扫描mapper接口类\",{\"1\":{\"27\":1}}],[\"配置波特率\",{\"1\":{\"22\":1}}],[\"└─mapper\",{\"1\":{\"27\":1}}],[\"└─mybatis\",{\"1\":{\"27\":1}}],[\"xml\",{\"1\":{\"27\":5}}],[\"xxxx\",{\"1\":{\"26\":1}}],[\"├─config\",{\"1\":{\"27\":1}}],[\"yml中填加相关配置信息\",{\"1\":{\"27\":1}}],[\"yml\",{\"1\":{\"27\":1}}],[\"│\",{\"1\":{\"27\":4}}],[\"包含config和mapper两个子文件夹\",{\"1\":{\"27\":1}}],[\"目录下创建mybatis文件夹\",{\"1\":{\"27\":1}}],[\"在每个接口类中加入\",{\"1\":{\"27\":1}}],[\"在启动类上加入\",{\"1\":{\"27\":1}}],[\"在application\",{\"1\":{\"27\":1}}],[\"在\",{\"1\":{\"27\":1}}],[\"3\",{\"1\":{\"27\":2}}],[\"3306\",{\"1\":{\"26\":1}}],[\"33<\",{\"1\":{\"25\":1}}],[\"35\",{\"1\":{\"26\":1}}],[\"3<\",{\"1\":{\"25\":1}}],[\"jdbc\",{\"1\":{\"26\":2}}],[\"jdbc<\",{\"1\":{\"25\":1}}],[\"java\",{\"0\":{\"32\":1}}],[\"java<\",{\"1\":{\"25\":1}}],[\"java使用jserialcomm进行串口通信\",{\"0\":{\"20\":1}}],[\"java8中专门为函数式接口提供的注解\",{\"1\":{\"8\":1}}],[\"发送和接收数据\",{\"1\":{\"23\":1}}],[\"发送数据\",{\"1\":{\"23\":1}}],[\"添加数据库配置信息\",{\"0\":{\"26\":1}}],[\"添加到缓冲区\",{\"1\":{\"23\":1}}],[\"添加远程仓库\",{\"1\":{\"16\":1}}],[\"清空缓冲区\",{\"1\":{\"23\":1}}],[\"清除缓冲区\",{\"1\":{\"23\":1}}],[\"+\",{\"1\":{\"23\":1}}],[\"收到完整数据\",{\"1\":{\"23\":1}}],[\"为自定义的每行语句的结束符\",{\"1\":{\"23\":1}}],[\"为可选的\",{\"1\":{\"4\":1}}],[\"为可选地\",{\"1\":{\"4\":1}}],[\"这里\",{\"1\":{\"23\":1}}],[\"结束读取\",{\"1\":{\"23\":1}}],[\"结构如下\",{\"1\":{\"4\":1,\"5\":1,\"27\":1}}],[\"遇到\",{\"1\":{\"23\":1}}],[\"转换为字符\",{\"1\":{\"23\":1}}],[\"读取单字节数据\",{\"1\":{\"23\":1}}],[\"缓存数据\",{\"1\":{\"23\":1}}],[\"location\",{\"1\":{\"27\":1}}],[\"locations\",{\"1\":{\"27\":1}}],[\"length\",{\"1\":{\"23\":2}}],[\"lambda的参数类型及返回值类型可以自动推断\",{\"1\":{\"4\":1}}],[\"lambda体中调用方法的参数列表与返回值类型\",{\"1\":{\"5\":1}}],[\"lambda体\",{\"1\":{\"4\":1}}],[\"lambda是一个匿名函数\",{\"1\":{\"4\":1}}],[\"lambda表达式\",{\"0\":{\"3\":1}}],[\"lambda表达式与函数式接口\",{\"0\":{\"2\":1}}],[\"winkky\",{\"1\":{\"27\":1}}],[\"winkik\",{\"1\":{\"16\":1}}],[\"winkit\",{\"1\":{\"0\":1}}],[\"while\",{\"1\":{\"23\":1}}],[\"writebytes\",{\"1\":{\"23\":1}}],[\"关闭串口\",{\"1\":{\"23\":1}}],[\"ienvdao\",{\"1\":{\"27\":1}}],[\"is\",{\"1\":{\"23\":2}}],[\"isopen\",{\"1\":{\"23\":3}}],[\"illegalstateexception\",{\"1\":{\"23\":2}}],[\"if\",{\"1\":{\"23\":5}}],[\"int\",{\"1\":{\"23\":1}}],[\"interface\",{\"1\":{\"7\":1}}],[\"integer\",{\"1\":{\"5\":2}}],[\"integer>\",{\"1\":{\"5\":1,\"12\":1}}],[\"initial\",{\"1\":{\"16\":1}}],[\"init\",{\"1\":{\"16\":1}}],[\"打开串口\",{\"1\":{\"23\":1}}],[\"打包\",{\"1\":{\"18\":1}}],[\"89\",{\"1\":{\"26\":1}}],[\"8\",{\"1\":{\"22\":1,\"26\":1,\"27\":1}}],[\"停止位和校验位\",{\"1\":{\"22\":1}}],[\"数据位\",{\"1\":{\"22\":1}}],[\"编写xml文件\",{\"1\":{\"27\":1}}],[\"编写相关功能\",{\"0\":{\"23\":1}}],[\"编写配置类\",{\"0\":{\"22\":1}}],[\"编译器会强制检查该接口是否有且仅有一个抽象方法\",{\"1\":{\"8\":1}}],[\"9600\",{\"1\":{\"22\":1}}],[\"9\",{\"1\":{\"21\":1}}],[\"引入依赖\",{\"0\":{\"21\":1,\"25\":1}}],[\"删除分支\",{\"1\":{\"19\":1}}],[\"合并指定分支到当前分支上\",{\"1\":{\"19\":1}}],[\"标记当前所在分支\",{\"1\":{\"19\":1}}],[\"查看当前分支\",{\"1\":{\"19\":1}}],[\"以上两步可以合并为\",{\"1\":{\"19\":1}}],[\"切换到指定分支\",{\"1\":{\"19\":1}}],[\"创建分支\",{\"1\":{\"19\":1}}],[\"分支管理\",{\"0\":{\"19\":1}}],[\"分类如下\",{\"1\":{\"18\":1}}],[\"回退\",{\"1\":{\"18\":1}}],[\"构建过程或辅助工具的变动\",{\"1\":{\"18\":1}}],[\"构造函数语法格式\",{\"1\":{\"5\":1}}],[\"cj\",{\"1\":{\"26\":1}}],[\"catch\",{\"1\":{\"23\":1}}],[\"cloud\",{\"1\":{\"27\":1}}],[\"closeport\",{\"1\":{\"23\":3}}],[\"classpath\",{\"1\":{\"27\":2}}],[\"class\",{\"1\":{\"22\":1,\"23\":1,\"26\":1}}],[\"characterencoding=utf\",{\"1\":{\"26\":1}}],[\"char\",{\"1\":{\"23\":2}}],[\"checkout\",{\"1\":{\"19\":2}}],[\"chore\",{\"1\":{\"18\":1}}],[\"config\",{\"1\":{\"27\":4}}],[\"configuration\",{\"1\":{\"22\":1}}],[\"connector\",{\"1\":{\"25\":2}}],[\"consumer2\",{\"1\":{\"10\":1}}],[\"consumer1\",{\"1\":{\"10\":1}}],[\"consumer<\",{\"1\":{\"10\":1}}],[\"consumer<t>\",{\"1\":{\"10\":1}}],[\"consumer\",{\"1\":{\"10\":3}}],[\"component\",{\"1\":{\"23\":1}}],[\"compose\",{\"1\":{\"12\":2}}],[\"com2\",{\"1\":{\"22\":1}}],[\"commit作用范围\",{\"1\":{\"18\":1}}],[\"commit\",{\"0\":{\"18\":1},\"1\":{\"16\":2}}],[\"com\",{\"1\":{\"15\":1,\"16\":1,\"26\":1,\"27\":1}}],[\"增加测试\",{\"1\":{\"18\":1}}],[\"增加了小程序模板消息相关功能\",{\"1\":{\"18\":1}}],[\"性能优化\",{\"1\":{\"18\":1}}],[\"也不是修复bug\",{\"1\":{\"18\":1}}],[\"既不增加新功能\",{\"1\":{\"18\":1}}],[\"优化\",{\"1\":{\"18\":1}}],[\"重构\",{\"1\":{\"18\":1}}],[\"不影响代码运行的变动\",{\"1\":{\"18\":1}}],[\"不包括static\",{\"1\":{\"7\":1}}],[\"代码格式\",{\"1\":{\"18\":1}}],[\"文档注释\",{\"1\":{\"18\":1}}],[\"修复\",{\"1\":{\"18\":1}}],[\"修饰符\",{\"1\":{\"7\":1}}],[\"新功能\",{\"1\":{\"18\":1}}],[\"提交类型\",{\"1\":{\"18\":1}}],[\"提交规范\",{\"0\":{\"17\":1}}],[\"描述\",{\"1\":{\"18\":1}}],[\"<mapper\",{\"1\":{\"27\":1}}],[\"<artifactid>mysql\",{\"1\":{\"25\":1}}],[\"<artifactid>mybatis\",{\"1\":{\"25\":1}}],[\"<artifactid>spring\",{\"1\":{\"25\":1}}],[\"<artifactid>jserialcomm<\",{\"1\":{\"21\":1}}],[\"<groupid>mysql<\",{\"1\":{\"25\":1}}],[\"<groupid>org\",{\"1\":{\"25\":2}}],[\"<groupid>com\",{\"1\":{\"21\":1}}],[\"<\",{\"1\":{\"21\":1,\"25\":4,\"27\":2}}],[\"<version>8\",{\"1\":{\"25\":1}}],[\"<version>3\",{\"1\":{\"25\":1}}],[\"<version>2\",{\"1\":{\"21\":1}}],[\"<v>\",{\"1\":{\"12\":1}}],[\"<dependency>\",{\"1\":{\"21\":1,\"25\":3}}],[\"<subject>\",{\"1\":{\"18\":1}}],[\"<scope>\",{\"1\":{\"18\":1}}],[\"<type>\",{\"1\":{\"18\":1}}],[\"utf\",{\"1\":{\"27\":1}}],[\"username\",{\"1\":{\"26\":1}}],[\"usessl=true\",{\"1\":{\"26\":1}}],[\"useunicode=true\",{\"1\":{\"26\":1}}],[\"url\",{\"1\":{\"26\":1}}],[\"u\",{\"1\":{\"16\":1}}],[\"mysql\",{\"1\":{\"25\":1,\"26\":2}}],[\"mybatis配置文件\",{\"1\":{\"27\":1}}],[\"mybatis相关配置\",{\"0\":{\"27\":1}}],[\"mybatis\",{\"1\":{\"25\":1,\"27\":8}}],[\"mapper>\",{\"1\":{\"27\":1}}],[\"mapperscan\",{\"1\":{\"27\":1}}],[\"mapper\",{\"1\":{\"27\":7}}],[\"mapper文件存放地址\",{\"1\":{\"27\":1}}],[\"master\",{\"1\":{\"19\":1}}],[\"main\",{\"1\":{\"16\":2}}],[\"miniprogram\",{\"1\":{\"18\":1}}],[\"merge\",{\"1\":{\"19\":1}}],[\"message格式\",{\"0\":{\"18\":1}}],[\"method\",{\"1\":{\"5\":1}}],[\"m\",{\"1\":{\"16\":2}}],[\"将dev分支合并到master分支\",{\"1\":{\"19\":1}}],[\"将代码推送到远程main分支并与当前分支绑定\",{\"1\":{\"16\":1}}],[\"将当前分支重命名为main\",{\"1\":{\"16\":1}}],[\"将暂存区中的修改提交到版本库\",{\"1\":{\"16\":1}}],[\"将工作区的修改添加到暂存区\",{\"1\":{\"16\":1}}],[\"found\",{\"1\":{\"28\":1}}],[\"foo\",{\"1\":{\"16\":1}}],[\"fryer\",{\"1\":{\"26\":1}}],[\"flushiobuffers\",{\"1\":{\"23\":3}}],[\"false\",{\"1\":{\"23\":1}}],[\"fazecast<\",{\"1\":{\"21\":1}}],[\"fix\",{\"1\":{\"18\":1}}],[\"feature\",{\"1\":{\"18\":1}}],[\"feat\",{\"1\":{\"18\":2}}],[\"function2\",{\"1\":{\"12\":1}}],[\"function1\",{\"1\":{\"12\":3}}],[\"function<\",{\"1\":{\"12\":1}}],[\"function<v\",{\"1\":{\"12\":1}}],[\"function<integer\",{\"1\":{\"12\":1}}],[\"function<string\",{\"1\":{\"5\":1}}],[\"function\",{\"1\":{\"10\":1}}],[\"functionalinterface注解\",{\"0\":{\"8\":1}}],[\"functionalinterface\",{\"1\":{\"7\":1}}],[\"初始化仓库\",{\"1\":{\"16\":1}}],[\"初始化与设置远程\",{\"0\":{\"16\":1}}],[\"http\",{\"1\":{\"27\":1}}],[\"https\",{\"1\":{\"15\":1,\"16\":1}}],[\"hello\",{\"1\":{\"10\":1}}],[\"安装\",{\"0\":{\"15\":1}}],[\"groupid>\",{\"1\":{\"21\":1,\"25\":3}}],[\"github\",{\"1\":{\"16\":1}}],[\"git\",{\"1\":{\"15\":1,\"16\":7,\"19\":7}}],[\"git相关\",{\"0\":{\"14\":1}}],[\"getbytes\",{\"1\":{\"23\":1}}],[\"getcommport\",{\"1\":{\"22\":1}}],[\"get\",{\"1\":{\"11\":2}}],[\"取反\",{\"1\":{\"13\":1}}],[\"相当于||\",{\"1\":{\"13\":1}}],[\"相当于\",{\"1\":{\"13\":2}}],[\"open\",{\"1\":{\"23\":2}}],[\"openport\",{\"1\":{\"23\":3}}],[\"one\",{\"1\":{\"22\":1}}],[\"org\",{\"1\":{\"27\":2}}],[\"origin\",{\"1\":{\"16\":2}}],[\"or\",{\"1\":{\"13\":1,\"19\":1}}],[\"other\",{\"1\":{\"13\":2}}],[\"out\",{\"1\":{\"10\":2,\"11\":1,\"12\":1,\"23\":1}}],[\"101\",{\"1\":{\"26\":1}}],[\"1000\",{\"1\":{\"22\":2}}],[\"1\",{\"1\":{\"13\":1,\"23\":1,\"27\":1}}],[\"12\",{\"1\":{\"12\":1}}],[\"0\",{\"1\":{\"13\":1,\"23\":3,\"25\":2,\"27\":2}}],[\"传入一个参数返回布尔值\",{\"1\":{\"13\":1}}],[\"传入一个参数并返回结果\",{\"1\":{\"12\":1}}],[\"backend\",{\"0\":{\"30\":1}}],[\"boot\",{\"1\":{\"25\":2}}],[\"boot<\",{\"1\":{\"25\":2}}],[\"boolean\",{\"1\":{\"13\":2,\"23\":2}}],[\"byte\",{\"1\":{\"23\":3}}],[\"bit\",{\"1\":{\"22\":1}}],[\"blocking\",{\"1\":{\"22\":1}}],[\"bean\",{\"1\":{\"22\":1}}],[\"before\",{\"1\":{\"12\":1}}],[\"b\",{\"1\":{\"19\":1}}],[\"buffer\",{\"1\":{\"23\":3}}],[\"build\",{\"1\":{\"18\":1}}],[\"bug\",{\"1\":{\"18\":1}}],[\"branch\",{\"1\":{\"16\":1,\"19\":3}}],[\"断言型接口\",{\"0\":{\"13\":1}}],[\"得到param2\",{\"1\":{\"12\":1}}],[\"先执行function2的apply\",{\"1\":{\"12\":1}}],[\"先执行consumer1的accept\",{\"1\":{\"10\":1}}],[\"version=\",{\"1\":{\"27\":1}}],[\"version>\",{\"1\":{\"21\":1,\"25\":2}}],[\"v\",{\"1\":{\"12\":1}}],[\"void\",{\"1\":{\"10\":1,\"23\":2}}],[\"217\",{\"1\":{\"26\":1}}],[\"2<\",{\"1\":{\"21\":1}}],[\"2\",{\"1\":{\"12\":1}}],[\"6\",{\"1\":{\"12\":1}}],[\"en\",{\"1\":{\"27\":1}}],[\"encoding=\",{\"1\":{\"27\":1}}],[\"env\",{\"1\":{\"27\":1}}],[\"exception\",{\"1\":{\"23\":1}}],[\"extends\",{\"1\":{\"12\":1}}],[\"else\",{\"1\":{\"23\":3}}],[\"e\",{\"1\":{\"12\":2,\"23\":2}}],[\"root\",{\"1\":{\"26\":1}}],[\"runtimeexception\",{\"1\":{\"23\":1}}],[\"rust\",{\"0\":{\"1\":1,\"29\":1}}],[\"receivedchar\",{\"1\":{\"23\":3}}],[\"receivedata\",{\"1\":{\"23\":2}}],[\"res\",{\"1\":{\"23\":5}}],[\"result\",{\"1\":{\"23\":3}}],[\"resources\",{\"1\":{\"27\":2}}],[\"resource\",{\"1\":{\"23\":1}}],[\"return\",{\"1\":{\"22\":1,\"23\":3}}],[\"readbytes\",{\"1\":{\"23\":1}}],[\"readbuffer\",{\"1\":{\"23\":4}}],[\"read\",{\"1\":{\"22\":1}}],[\"revert\",{\"1\":{\"18\":1}}],[\"refactor\",{\"1\":{\"18\":1}}],[\"remote\",{\"1\":{\"16\":1}}],[\"r>\",{\"1\":{\"12\":1}}],[\"r\",{\"1\":{\"12\":1}}],[\"函数型接口\",{\"0\":{\"12\":1}}],[\"函数式接口\",{\"0\":{\"6\":1}}],[\"无参有返回值\",{\"1\":{\"11\":1}}],[\"供给型接口\",{\"0\":{\"11\":1}}],[\"中consumer2的accept\",{\"1\":{\"10\":1}}],[\"执行顺序\",{\"1\":{\"10\":1,\"12\":1}}],[\"和accept的顺序不能颠倒\",{\"1\":{\"10\":1}}],[\"namespace=\",{\"1\":{\"27\":1}}],[\"namespace指向对应的接口类的路径\",{\"1\":{\"27\":1}}],[\"name\",{\"1\":{\"26\":1}}],[\"numread\",{\"1\":{\"23\":2}}],[\"not\",{\"1\":{\"23\":2,\"28\":1}}],[\"notnull\",{\"1\":{\"10\":1,\"12\":1,\"13\":2}}],[\"no\",{\"1\":{\"22\":1}}],[\"negate\",{\"1\":{\"13\":1}}],[\"new\",{\"1\":{\"5\":1,\"23\":5}}],[\"airfryer\",{\"1\":{\"27\":1}}],[\"air\",{\"1\":{\"26\":1}}],[\"application\",{\"1\":{\"27\":1}}],[\"apply\",{\"1\":{\"12\":3}}],[\"append\",{\"1\":{\"23\":1}}],[\"artifactid>\",{\"1\":{\"21\":1,\"25\":3}}],[\"add\",{\"1\":{\"16\":2}}],[\"and\",{\"1\":{\"13\":1}}],[\"andthen\",{\"1\":{\"10\":3}}],[\"after\",{\"1\":{\"10\":1}}],[\"accept\",{\"1\":{\"10\":3}}],[\"默认方法\",{\"1\":{\"10\":1,\"12\":1,\"13\":1}}],[\"即为accept\",{\"1\":{\"10\":1}}],[\"posts\",{\"0\":{\"31\":1}}],[\"port\",{\"1\":{\"23\":2}}],[\"password\",{\"1\":{\"26\":1}}],[\"parity\",{\"1\":{\"22\":1}}],[\"param2\",{\"1\":{\"12\":1}}],[\"param1\",{\"1\":{\"12\":2}}],[\"parameters\",{\"1\":{\"4\":1}}],[\"parseint\",{\"1\":{\"5\":2}}],[\"perf\",{\"1\":{\"18\":1}}],[\"push\",{\"1\":{\"16\":1}}],[\"public\",{\"1\":{\"10\":1,\"12\":1,\"13\":3,\"22\":2,\"23\":6,\"27\":1}}],[\"private\",{\"1\":{\"23\":1}}],[\"println\",{\"1\":{\"10\":2,\"11\":1,\"12\":1,\"23\":1}}],[\"predicate<\",{\"1\":{\"13\":2}}],[\"predicate<t>\",{\"1\":{\"13\":3}}],[\"predicate<integer>\",{\"1\":{\"13\":1}}],[\"predicate\",{\"1\":{\"13\":2}}],[\"例\",{\"1\":{\"10\":2,\"11\":1,\"12\":2,\"13\":1,\"18\":1}}],[\"但无需返回结果\",{\"1\":{\"10\":1}}],[\"接口路径\",{\"1\":{\"27\":1}}],[\"接口名称\",{\"1\":{\"7\":1}}],[\"接收数据\",{\"1\":{\"23\":1}}],[\"接收一个参数进行消费\",{\"1\":{\"10\":1}}],[\"接着执行function1中的apply\",{\"1\":{\"12\":1}}],[\"接着执行andthen\",{\"1\":{\"10\":1}}],[\"tostring\",{\"1\":{\"23\":1}}],[\"try\",{\"1\":{\"23\":1}}],[\"true\",{\"1\":{\"13\":1,\"23\":1}}],[\"throw\",{\"1\":{\"23\":3}}],[\"timeout\",{\"1\":{\"22\":1}}],[\"type\",{\"1\":{\"18\":1}}],[\"test\",{\"1\":{\"11\":2,\"13\":3,\"18\":1}}],[\"t>\",{\"1\":{\"10\":1,\"12\":1,\"13\":2}}],[\"t\",{\"1\":{\"10\":2,\"11\":1,\"12\":2,\"13\":4}}],[\"抽象方法\",{\"1\":{\"10\":1,\"11\":1,\"12\":1,\"13\":1}}],[\"消费型接口\",{\"0\":{\"10\":1}}],[\"常用函数式接口\",{\"0\":{\"9\":1}}],[\"非必须\",{\"1\":{\"8\":1}}],[\"否则会报错\",{\"1\":{\"8\":1}}],[\"当该注解作用于一个接口时\",{\"1\":{\"8\":1}}],[\"其他非抽象方法内容\",{\"1\":{\"7\":1}}],[\"可选参数信息\",{\"1\":{\"7\":1}}],[\"可以使用lambda表达式创建一个函数式接口的对象\",{\"1\":{\"7\":1}}],[\"可以使用classname\",{\"1\":{\"5\":1}}],[\"返回值类型\",{\"1\":{\"7\":1}}],[\"语法格式\",{\"1\":{\"7\":1}}],[\"dao\",{\"1\":{\"27\":1}}],[\"datasource\",{\"1\":{\"26\":1}}],[\"databuffer\",{\"1\":{\"23\":4}}],[\"data\",{\"1\":{\"23\":4,\"25\":1}}],[\"dtd\",{\"1\":{\"27\":3}}],[\"driver\",{\"1\":{\"26\":2}}],[\"d\",{\"1\":{\"19\":1}}],[\"dependency>\",{\"1\":{\"21\":1,\"25\":3}}],[\"dev\",{\"1\":{\"19\":7}}],[\"default以及object类所有的方法\",{\"1\":{\"7\":1}}],[\"doctype\",{\"1\":{\"27\":1}}],[\"docs\",{\"1\":{\"18\":1}}],[\"downloads\",{\"1\":{\"15\":1}}],[\"dspfomrepv\",{\"1\":{\"1\":1}}],[\"有且仅有一个抽象方法的接口被称为函数式接口\",{\"1\":{\"7\":1}}],[\"而第二个参数是实例方法的参数时\",{\"1\":{\"5\":1}}],[\"要与函数式接口中抽象方法的函数列表和返回值类型保存一致\",{\"1\":{\"5\":1}}],[\"spring\",{\"1\":{\"25\":2,\"26\":1}}],[\"springframework\",{\"1\":{\"25\":1}}],[\"springboot整合mybatis\",{\"0\":{\"24\":1}}],[\"synchronized\",{\"1\":{\"23\":1}}],[\"system\",{\"1\":{\"10\":2,\"11\":1,\"12\":1,\"23\":1}}],[\"sendandrecvsync\",{\"1\":{\"23\":1}}],[\"senddata\",{\"1\":{\"23\":2}}],[\"setlength\",{\"1\":{\"23\":1}}],[\"setparity\",{\"1\":{\"22\":1}}],[\"setnumstopbits\",{\"1\":{\"22\":1}}],[\"setnumdatabits\",{\"1\":{\"22\":1}}],[\"setcomporttimeouts\",{\"1\":{\"22\":1}}],[\"setbaudrate\",{\"1\":{\"22\":1}}],[\"serial\",{\"1\":{\"23\":2}}],[\"serialservice\",{\"1\":{\"23\":1}}],[\"serialport\",{\"1\":{\"22\":14,\"23\":12}}],[\"serialconfig\",{\"1\":{\"22\":1}}],[\"switch\",{\"1\":{\"19\":1}}],[\"subject\",{\"1\":{\"18\":1}}],[\"supplier\",{\"1\":{\"11\":2}}],[\"supplier<string>\",{\"1\":{\"11\":1}}],[\"super\",{\"1\":{\"10\":1,\"12\":1,\"13\":2}}],[\"scope\",{\"1\":{\"18\":1}}],[\"scm\",{\"1\":{\"15\":1}}],[\"s\",{\"1\":{\"5\":2}}],[\"starter<\",{\"1\":{\"25\":1}}],[\"starter\",{\"1\":{\"25\":1}}],[\"statements\",{\"1\":{\"4\":1}}],[\"stop\",{\"1\":{\"22\":1}}],[\"style\",{\"1\":{\"18\":1}}],[\"stringbuilder\",{\"1\":{\"23\":2}}],[\"string\",{\"1\":{\"5\":1,\"23\":6}}],[\"stringtointeger\",{\"1\":{\"5\":1}}],[\"==\",{\"1\":{\"23\":1}}],[\"=\",{\"1\":{\"5\":2,\"10\":1,\"11\":1,\"12\":1,\"13\":2,\"22\":1,\"23\":9}}],[\"方法\",{\"1\":{\"10\":2,\"12\":1}}],[\"方法的具体实现\",{\"1\":{\"10\":1}}],[\"方法名称\",{\"1\":{\"7\":1}}],[\"方法名\",{\"1\":{\"5\":1}}],[\"方法引用是一种更简洁的lambda表达式\",{\"1\":{\"5\":1}}],[\"方法引用\",{\"0\":{\"5\":1}}],[\"实例名\",{\"1\":{\"5\":1}}],[\"类名\",{\"1\":{\"5\":2}}],[\"它允许直接访问类或实例已经存在的方法或构造方法\",{\"1\":{\"5\":1}}],[\"它允许将函数作为方法的参数传递\",{\"1\":{\"4\":1}}],[\"同时不必显式返回\",{\"1\":{\"4\":1}}],[\"若lambda参数列表中的第一个参数是实例方法的调用者\",{\"1\":{\"5\":1}}],[\"若statements只包含一个语句\",{\"1\":{\"4\":1}}],[\"若parameters\",{\"1\":{\"4\":1}}],[\"则\",{\"1\":{\"4\":2}}],[\"只有一个参数\",{\"1\":{\"4\":1}}],[\"参数列表\",{\"1\":{\"4\":1}}],[\"><\",{\"1\":{\"27\":1}}],[\">\",{\"1\":{\"4\":1,\"5\":1,\"11\":1,\"12\":1,\"13\":2,\"23\":1,\"25\":1,\"27\":2}}],[\"定义\",{\"0\":{\"4\":1,\"7\":1}}],[\"介绍页\",{\"0\":{\"0\":1}}]],\"version\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const u=bt[s];e==="suggest"?self.postMessage([e,o,tt(t,u,n)]):e==="search"?self.postMessage([e,o,Z(t,u,n)]):self.postMessage({suggestions:[e,o,tt(t,u,n)],results:[e,o,Z(t,u,n)]})};
//# sourceMappingURL=index.js.map
