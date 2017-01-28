const R=require("rambda"),c=/[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g,d=/[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])/g,e=/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g,f=/<[^>]*>/g;function between(g,h,k){return R.last(R.split(h,R.head(R.split(k,g)))).trim();}function camelCase(l,m=!1){const n=R.join("",R.map(o=>`${R.toUpper(R.head(o))}${R.toLower(R.tail(o))}`,splitToWords(l,m)));return`${R.toLower(R.head(n))}${R.tail(n)}`;}function clean(p){return R.replace(/\s+/g," ",p).trim();}function count(q,r){return R.length(R.split(r,q))-1;}function distance(a,b){if(a.length===0){return b.length;}if(b.length===0){return a.length;}let i,j,s,t,u;if(a.length>b.length){u=a;a=b;b=u;}row=Array(a.length+1);for(i=0;i<=a.length;i++){row[i]=i;}for(i=1;i<=b.length;i++){s=i;for(j=1;j<=a.length;j++){if(b[i-1]===a[j-1]){t=row[j-1];}else{t=Math.min(row[j-1]+1,Math.min(s+1,row[j]+1));}row[j-1]=s;s=t;}row[a.length]=s;}return row[a.length];}const normalizeGermanChar=v=>{const w=["ä","ö","ü","ß"],x=["a","o","u","ss"],y=w.indexOf(v);if(y===-1){return v;}return x[y];},normalizeGermanWord=z=>R.join("",R.map(A=>normalizeGermanChar(A),R.split("",R.toLower(z))));function distanceGerman(a,b){return distance(normalizeGermanWord(a),normalizeGermanWord(b));}function filter(B,C){return R.join("",R.filter(D=>C(D),R.split("",B)));}function glob(E,F){const G=count(F,"*");if(G===1){if(R.head(F)==="*"){return E.endsWith(R.tail(F));}else if(R.last(F)==="*"){return E.startsWith(R.init(F));}}else if(G===2&&R.head(F)==="*"&&R.last(F)==="*"){F=R.init(R.tail(F));const H=E.indexOf(F);return H>0&&H+F.length<E.length;}return E.includes(F);}function indent(I,J,K=" "){return R.join("\n",R.map(L=>`${K.repeat(J)}${L}`,R.split("\n",I)));}function kebabCase(M,N=!1){return R.toLower(R.join("-",splitToWords(M,N)));}function map(O,P){return R.join("",R.map(Q=>P(Q),R.split("",O)));}const addSpaceAroundPunctuation=S=>S.replace(e,T=>` ${T} `),maskWordHelper=(U,V,W)=>{if(R.test(e,U)||U.length<2){return U;}if(U.length<W){return`${R.head(U)}${V.repeat(U.length-1)}`;}return`${R.head(U)}${V.repeat(U.length-2)}${R.last(U)}`;};function maskSentence({sentence,replacer="_",charLimit=3,words=[]}){sentence=clean(addSpaceAroundPunctuation(sentence));const X=[],Y=[];R.map(Z=>{let a1;if(words.length===0||words.includes(Z)){a1=maskWordHelper(Z,replacer,charLimit);}else{a1=Z;}X.push(Z);Y.push(a1);},R.split(" ",sentence));return{hidden:X,visible:Y};}function splitSentence(b1){return R.split(" ",clean(addSpaceAroundPunctuation(b1)));}function maskWords({words,replacer="_",charLimit=3}){const c1=R.map(d1=>maskWordHelper(d1,replacer,charLimit),R.split(" ",words));return R.join(" ",c1);}function padLeft({str,padLimit,padChar}){const e1=str.length;if(padLimit<e1){return str;}return`${padChar.repeat(padLimit-e1)}${str}`;}function padRight({str,padLimit,padChar}){const f1=str.length;if(padLimit<f1){return str;}return`${str}${padChar.repeat(padLimit-f1)}`;}function removeLeftPadding({str,padChar}){let g1=-1,h1=!0;while(h1&&++g1<str.length){if(str[g1]!==padChar){h1=!1;}}return str.substr(g1);}function removeRightPadding({str,padChar}){let i1=str.length,j1=!0;while(j1&&--i1>0){if(str[i1]!==padChar){j1=!1;}}return str.substring(0,i1+1);}function replaceLast(k1,l1=""){return`${R.init(k1)}${l1}`;}function replaceFirst(m1,n1=""){return`${n1}${R.tail(m1)}`;}function reverse(o1){return o1.split("").reverse().join("");}function seoTitle(p1,q1=3,r1=!1){const s1=R.join(" ",R.map(t1=>{if(t1.length>=q1){return`${R.toUpper(R.head(t1))}${R.toLower(R.tail(t1))}`;}return t1;},splitToWords(p1,r1)));return`${R.toUpper(R.head(s1))}${R.tail(s1)}`;}const shuffleArr=u1=>{let v1=u1.length;while(v1>0){const w1=Math.floor(Math.random()*v1);v1--;const x1=u1[v1];u1[v1]=u1[w1];u1[w1]=x1;}return u1;};function shuffle(y1){return R.join("",shuffleArr(R.split("",y1)));}function snakeCase(z1,A1=!1){return R.toLower(R.join("_",splitToWords(z1,A1)));}function stripPunctuation(B1){return R.replace(e,"",B1);}function stripTags(C1){return R.replace(/\s+/g," ",R.replace(f," ",C1)).trim();}function surround(D1,E1,F1){if(F1===void 0){F1=E1;}return`${E1}${D1}${F1}`;}function titleCase(G1,H1=!1){return R.join(" ",R.map(I1=>`${R.toUpper(R.head(I1))}${R.toLower(R.tail(I1))}`,splitToWords(G1,H1)));}function truncate(J1,K1,L1="..."){if(J1.length>K1){K1=K1-L1.length;return`${J1.substr(0,K1)}${L1}`;}return J1;}function splitToWords(M1,N1=!1){const O1=N1?d:c;return R.match(O1,M1);}function wrap(P1,Q1,R1=!1){Q1=Q1<=0?1:Q1;const S1=P1.split(""),T1=[];let U1=0;Array(P1.length).fill().map((V1,W1)=>{if(W1===U1){const X1=W1+Q1;if(X1>S1.length){T1.push(P1.substr(W1));}else{const Y1=P1.substr(W1,Q1);if(S1[X1]===" "){T1.push(Y1);U1=X1+1;}else{let Z1=Y1.lastIndexOf(" ");if(Z1>-1){T1.push(Y1.substring(0,Z1));U1=Z1+W1+1;}else{const a2=P1.substr(W1);Z1=a2.indexOf(" ");if(Z1>-1){if(R1){T1.push(a2.substring(0,Z1));}U1=Z1+W1+1;}else{if(R1){T1.push(a2);}U1=P1.length;}}}}}});return T1;}module.exports.between=between;module.exports.camelCase=camelCase;module.exports.clean=clean;module.exports.count=count;module.exports.distance=distance;module.exports.distanceGerman=distanceGerman;module.exports.filter=filter;module.exports.glob=glob;module.exports.indent=indent;module.exports.kebabCase=kebabCase;module.exports.map=map;module.exports.maskSentence=maskSentence;module.exports.maskWords=maskWords;module.exports.padLeft=padLeft;module.exports.padRight=padRight;module.exports.removeLeftPadding=removeLeftPadding;module.exports.removeRightPadding=removeRightPadding;module.exports.replaceFirst=replaceFirst;module.exports.replaceLast=replaceLast;module.exports.reverse=reverse;module.exports.seoTitle=seoTitle;module.exports.shuffle=shuffle;module.exports.snakeCase=snakeCase;module.exports.splitSentence=splitSentence;module.exports.stripPunctuation=stripPunctuation;module.exports.stripTags=stripTags;module.exports.surround=surround;module.exports.titleCase=titleCase;module.exports.truncate=truncate;module.exports.words=splitToWords;module.exports.wrap=wrap;