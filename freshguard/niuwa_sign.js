/* SJCL 1.0.8 and js-md5 v0.8.3 distribution; see LICENSES.txt. */
var NF_CRYPTO = (function () {
var window = {}, self = window, module, process, define;
"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.s[0][0][0]||this.O();var b,c,d,e,f=this.s[0][4],g=this.s[1];b=a.length;var h=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return t(this,a,0)},decrypt:function(a){return t(this,a,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var a=this.s[0],b=this.s[1],c=a[4],d=b[4],e,f,g,h=[],k=[],l,n,m,p;for(e=0;0x100>e;e++)k[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=l||1,g=k[g]||1)for(m=g^g<<1^g<<2^g<<3^g<<4,m=m>>8^m&255^99,c[f]=m,d[m]=f,n=h[e=h[l=h[f]]],p=0x1010101*n^0x10001*e^0x101*l^0x1010100*f,n=0x101*h[m]^0x1010100*m,e=0;4>e;e++)a[e][f]=n=n<<24^n>>>8,b[e][m]=p=p<<24^p>>>8;for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function t(a,b,c){if(4!==b.length)throw new sjcl.exception.invalid("invalid aes block size");var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var h,k,l,n=d.length/4-2,m,p=4,r=[0,0,0,0];h=a.s[c];a=h[0];var q=h[1],v=h[2],w=h[3],x=h[4];for(m=0;m<n;m++)h=a[e>>>24]^q[f>>16&255]^v[g>>8&255]^w[b&255]^d[p],k=a[f>>>24]^q[g>>16&255]^v[b>>8&255]^w[e&255]^d[p+1],l=a[g>>>24]^q[b>>16&255]^v[e>>8&255]^w[f&255]^d[p+2],b=a[b>>>24]^q[e>>16&255]^v[f>>8&255]^w[g&255]^d[p+3],p+=4,e=h,f=k,g=l;for(m=
0;4>m;m++)r[c?3&-m:m]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^d[p++],h=e,e=f,f=g,g=b,b=h;return r}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.$(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.$(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b=b&31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},$:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},i:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&0xff00|(c&0xff00)<<8|c<<24;return a}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>8>>>8>>>8),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a=a+"00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};
sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(a,b,c){var d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,f="",g=0,h=sjcl.codec.base32.B,k=0,l=sjcl.bitArray.bitLength(a);c&&(h=sjcl.codec.base32.X);for(c=0;f.length*d<l;)f+=h.charAt((k^a[c]>>>g)>>>e),g<d?(k=a[c]<<d-g,g+=e,c++):(k<<=d,g-=d);for(;f.length&7&&!b;)f+="=";return f},toBits:function(a,b){a=a.replace(/\s|=/g,"").toUpperCase();var c=sjcl.codec.base32.BITS,
d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,f=[],g,h=0,k=sjcl.codec.base32.B,l=0,n,m="base32";b&&(k=sjcl.codec.base32.X,m="base32hex");for(g=0;g<a.length;g++){n=k.indexOf(a.charAt(g));if(0>n){if(!b)try{return sjcl.codec.base32hex.toBits(a)}catch(p){}throw new sjcl.exception.invalid("this isn't "+m+"!");}h>e?(h-=e,f.push(l^n>>>h),l=n<<c-h):(h+=d,l^=n<<c-h)}h&56&&f.push(sjcl.bitArray.partial(h&56,l,1));return f}};
sjcl.codec.base32hex={fromBits:function(a,b){return sjcl.codec.base32.fromBits(a,b,1)},toBits:function(a){return sjcl.codec.base32.toBits(a,1)}};
sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl.codec.base64.B,g=0,h=sjcl.bitArray.bitLength(a);c&&(f=f.substr(0,62)+"-_");for(c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c=[],d,e=0,f=sjcl.codec.base64.B,g=0,h;b&&(f=f.substr(0,62)+"-_");for(d=0;d<a.length;d++){h=f.indexOf(a.charAt(d));
if(0>h)throw new sjcl.exception.invalid("this isn't base64!");26<e?(e-=26,c.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e)}e&56&&c.push(sjcl.bitArray.partial(e&56,g,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.b[0]||this.O();a?(this.F=a.F.slice(0),this.A=a.A.slice(0),this.l=a.l):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.F=this.Y.slice(0);this.A=[];this.l=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.A=sjcl.bitArray.concat(this.A,a);b=this.l;a=this.l=b+sjcl.bitArray.bitLength(a);if(0x1fffffffffffff<a)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!==typeof Uint32Array){var d=new Uint32Array(c),e=0;for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,d.subarray(16*e,
16*(e+1))),e+=1;c.splice(0,16*e)}else for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.A,c=this.F,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.l/0x100000000));for(b.push(this.l|0);b.length;)u(this,b.splice(0,16));this.reset();return c},Y:[],b:[],O:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}for(var b=0,c=2,d,e;64>b;c++){e=!0;for(d=2;d*d<=c;d++)if(0===c%d){e=
!1;break}e&&(8>b&&(this.Y[b]=a(Math.pow(c,.5))),this.b[b]=a(Math.pow(c,1/3)),b++)}}};
function u(a,b){var c,d,e,f=a.F,g=a.b,h=f[0],k=f[1],l=f[2],n=f[3],m=f[4],p=f[5],r=f[6],q=f[7];for(c=0;64>c;c++)16>c?d=b[c]:(d=b[c+1&15],e=b[c+14&15],d=b[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+b[c&15]+b[c+9&15]|0),d=d+q+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(r^m&(p^r))+g[c],q=r,r=p,p=m,m=n+d|0,n=l,l=k,k=h,h=d+(k&l^n&(k^l))+(k>>>2^k>>>13^k>>>22^k<<30^k<<19^k<<10)|0;f[0]=f[0]+h|0;f[1]=f[1]+k|0;f[2]=f[2]+l|0;f[3]=f[3]+n|0;f[4]=f[4]+m|0;f[5]=f[5]+p|0;f[6]=f[6]+r|0;f[7]=
f[7]+q|0}
sjcl.mode.ccm={name:"ccm",G:[],listenProgress:function(a){sjcl.mode.ccm.G.push(a)},unListenProgress:function(a){a=sjcl.mode.ccm.G.indexOf(a);-1<a&&sjcl.mode.ccm.G.splice(a,1)},fa:function(a){var b=sjcl.mode.ccm.G.slice(),c;for(c=0;c<b.length;c+=1)b[c](a)},encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,k=h.bitLength(c)/8,l=h.bitLength(g)/8;e=e||64;d=d||[];if(7>k)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;4>f&&l>>>8*f;f++);f<15-k&&(f=15-k);c=h.clamp(c,
8*(15-f));b=sjcl.mode.ccm.V(a,b,c,d,e,f);g=sjcl.mode.ccm.C(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),k=f.clamp(b,h-e),l=f.bitSlice(b,h-e),h=(h-e)/8;if(7>g)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);c=f.clamp(c,8*(15-b));k=sjcl.mode.ccm.C(a,k,c,l,e,b);a=sjcl.mode.ccm.V(a,k.data,c,d,e,b);if(!f.equal(k.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");
return k.data},na:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,k=h.i;d=[h.partial(8,(b.length?64:0)|d-2<<2|f-1)];d=h.concat(d,c);d[3]|=e;d=a.encrypt(d);if(b.length)for(c=h.bitLength(b)/8,65279>=c?g=[h.partial(16,c)]:0xffffffff>=c&&(g=h.concat([h.partial(16,65534)],[c])),g=h.concat(g,b),b=0;b<g.length;b+=4)d=a.encrypt(k(d,g.slice(b,b+4).concat([0,0,0])));return d},V:function(a,b,c,d,e,f){var g=sjcl.bitArray,h=g.i;e/=8;if(e%2||4>e||16<e)throw new sjcl.exception.invalid("ccm: invalid tag length");
if(0xffffffff<d.length||0xffffffff<b.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");c=sjcl.mode.ccm.na(a,d,c,e,g.bitLength(b)/8,f);for(d=0;d<b.length;d+=4)c=a.encrypt(h(c,b.slice(d,d+4).concat([0,0,0])));return g.clamp(c,8*e)},C:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.i;var k=b.length,l=h.bitLength(b),n=k/50,m=n;c=h.concat([h.partial(8,f-1)],c).concat([0,0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!k)return{tag:d,data:[]};for(g=0;g<k;g+=4)g>n&&(sjcl.mode.ccm.fa(g/
k),n+=m),c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,l)}}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl.mode.ocb2.S,k=sjcl.bitArray,l=k.i,n=[0,0,0,0];c=h(a.encrypt(c));var m,p=[];d=d||[];e=e||64;for(g=0;g+4<b.length;g+=4)m=b.slice(g,g+4),n=l(n,m),p=p.concat(l(c,a.encrypt(l(c,m)))),c=h(c);m=b.slice(g);b=k.bitLength(m);g=a.encrypt(l(c,[0,0,0,b]));m=k.clamp(l(m.concat([0,0,0]),g),b);n=l(n,l(m.concat([0,0,0]),g));n=a.encrypt(l(n,l(c,h(c))));
d.length&&(n=l(n,f?d:sjcl.mode.ocb2.pmac(a,d)));return p.concat(k.concat(m,k.clamp(n,e)))},decrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");e=e||64;var g=sjcl.mode.ocb2.S,h=sjcl.bitArray,k=h.i,l=[0,0,0,0],n=g(a.encrypt(c)),m,p,r=sjcl.bitArray.bitLength(b)-e,q=[];d=d||[];for(c=0;c+4<r/32;c+=4)m=k(n,a.decrypt(k(n,b.slice(c,c+4)))),l=k(l,m),q=q.concat(m),n=g(n);p=r-32*c;m=a.encrypt(k(n,[0,0,0,p]));m=k(m,h.clamp(b.slice(c),p).concat([0,
0,0]));l=k(l,m);l=a.encrypt(k(l,k(n,g(n))));d.length&&(l=k(l,f?d:sjcl.mode.ocb2.pmac(a,d)));if(!h.equal(h.clamp(l,e),h.bitSlice(b,r)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return q.concat(h.clamp(m,p))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.S,e=sjcl.bitArray,f=e.i,g=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4)h=d(h),g=f(g,a.encrypt(f(h,b.slice(c,c+4))));c=b.slice(c);128>e.bitLength(c)&&(h=f(h,d(h)),c=e.concat(c,[-2147483648,0,0,0]));g=f(g,c);
return a.encrypt(f(d(f(h,d(h))),g))},S:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,c,d,e){var f=b.slice(0);b=sjcl.bitArray;d=d||[];a=sjcl.mode.gcm.C(!0,a,f,d,c,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,c,d,e){var f=b.slice(0),g=sjcl.bitArray,h=g.bitLength(f);e=e||128;d=d||[];e<=h?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]);a=sjcl.mode.gcm.C(!1,a,f,d,c,e);if(!g.equal(a.tag,b))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return a.data},ka:function(a,b){var c,d,e,f,g,h=sjcl.bitArray.i;e=[0,0,
0,0];f=b.slice(0);for(c=0;128>c;c++){(d=0!==(a[Math.floor(c/32)]&1<<31-c%32))&&(e=h(e,f));g=0!==(f[3]&1);for(d=3;0<d;d--)f[d]=f[d]>>>1|(f[d-1]&1)<<31;f[0]>>>=1;g&&(f[0]^=-0x1f000000)}return e},j:function(a,b,c){var d,e=c.length;b=b.slice(0);for(d=0;d<e;d+=4)b[0]^=0xffffffff&c[d],b[1]^=0xffffffff&c[d+1],b[2]^=0xffffffff&c[d+2],b[3]^=0xffffffff&c[d+3],b=sjcl.mode.gcm.ka(b,a);return b},C:function(a,b,c,d,e,f){var g,h,k,l,n,m,p,r,q=sjcl.bitArray;m=c.length;p=q.bitLength(c);r=q.bitLength(d);h=q.bitLength(e);
g=b.encrypt([0,0,0,0]);96===h?(e=e.slice(0),e=q.concat(e,[1])):(e=sjcl.mode.gcm.j(g,[0,0,0,0],e),e=sjcl.mode.gcm.j(g,e,[0,0,Math.floor(h/0x100000000),h&0xffffffff]));h=sjcl.mode.gcm.j(g,[0,0,0,0],d);n=e.slice(0);d=h.slice(0);a||(d=sjcl.mode.gcm.j(g,h,c));for(l=0;l<m;l+=4)n[3]++,k=b.encrypt(n),c[l]^=k[0],c[l+1]^=k[1],c[l+2]^=k[2],c[l+3]^=k[3];c=q.clamp(c,p);a&&(d=sjcl.mode.gcm.j(g,h,c));a=[Math.floor(r/0x100000000),r&0xffffffff,Math.floor(p/0x100000000),p&0xffffffff];d=sjcl.mode.gcm.j(g,d,a);k=b.encrypt(e);
d[0]^=k[0];d[1]^=k[1];d[2]^=k[2];d[3]^=k[3];return{tag:q.bitSlice(d,0,f),data:c}}};sjcl.misc.hmac=function(a,b){this.W=b=b||sjcl.hash.sha256;var c=[[],[]],d,e=b.prototype.blockSize/32;this.w=[new b,new b];a.length>e&&(a=b.hash(a));for(d=0;d<e;d++)c[0][d]=a[d]^909522486,c[1][d]=a[d]^1549556828;this.w[0].update(c[0]);this.w[1].update(c[1]);this.R=new b(this.w[0])};
sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){if(this.aa)throw new sjcl.exception.invalid("encrypt on already updated hmac called!");this.update(a);return this.digest(a)};sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]);this.aa=!1};sjcl.misc.hmac.prototype.update=function(a){this.aa=!0;this.R.update(a)};sjcl.misc.hmac.prototype.digest=function(){var a=this.R.finalize(),a=(new this.W(this.w[1])).update(a).finalize();this.reset();return a};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E4;if(0>d||0>c)throw new sjcl.exception.invalid("invalid params to pbkdf2");"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,k,l=[],n=sjcl.bitArray;for(k=1;32*l.length<(d||1);k++){e=f=a.encrypt(n.concat(b,[k]));for(g=1;g<c;g++)for(f=a.encrypt(f),h=0;h<f.length;h++)e[h]^=f[h];l=l.concat(e)}d&&(l=n.clamp(l,d));return l};
sjcl.prng=function(a){this.c=[new sjcl.hash.sha256];this.m=[0];this.P=0;this.H={};this.N=0;this.U={};this.Z=this.f=this.o=this.ha=0;this.b=[0,0,0,0,0,0,0,0];this.h=[0,0,0,0];this.L=void 0;this.M=a;this.D=!1;this.K={progress:{},seeded:{}};this.u=this.ga=0;this.I=1;this.J=2;this.ca=0x10000;this.T=[0,48,64,96,128,192,0x100,384,512,768,1024];this.da=3E4;this.ba=80};
sjcl.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;if(d===this.u)throw new sjcl.exception.notReady("generator isn't seeded");if(d&this.J){d=!(d&this.I);e=[];var f=0,g;this.Z=e[0]=(new Date).valueOf()+this.da;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.c.length&&(e=e.concat(this.c[g].finalize()),f+=this.m[g],this.m[g]=0,d||!(this.P&1<<g));g++);this.P>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.m.push(0));this.f-=f;f>this.o&&(this.o=
f);this.P++;this.b=sjcl.hash.sha256.hash(this.b.concat(e));this.L=new sjcl.cipher.aes(this.b);for(d=0;4>d&&(this.h[d]=this.h[d]+1|0,!this.h[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.ca&&y(this),e=z(this),c.push(e[0],e[1],e[2],e[3]);y(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){if(0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.M=a},addEntropy:function(a,
b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.H[c],h=this.isReady(),k=0;d=this.U[c];void 0===d&&(d=this.U[c]=this.ha++);void 0===g&&(g=this.H[c]=0);this.H[c]=(this.H[c]+1)%this.c.length;switch(typeof a){case "number":void 0===b&&(b=1);this.c[g].update([d,this.N++,1,b,f,1,a|0]);break;case "object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(k=1),c=0;c<a.length&&!k;c++)"number"!==typeof a[c]&&
(k=1);if(!k){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e=e>>>1;this.c[g].update([d,this.N++,2,b,f,a.length].concat(a))}break;case "string":void 0===b&&(b=a.length);this.c[g].update([d,this.N++,3,b,f,a.length]);this.c[g].update(a);break;default:k=1}if(k)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.m[g]+=b;this.f+=b;h===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},
isReady:function(a){a=this.T[void 0!==a?a:this.M];return this.o&&this.o>=a?this.m[0]>this.ba&&(new Date).valueOf()>this.Z?this.J|this.I:this.I:this.f>=a?this.J|this.u:this.u},getProgress:function(a){a=this.T[a?a:this.M];return this.o>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.D){this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)};if(window.addEventListener)window.addEventListener("load",
this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else if(document.attachEvent)document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector);else throw new sjcl.exception.bug("can't attach event");
this.D=!0}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",
this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener:function(a,b){this.K[a][this.ga++]=b},removeEventListener:function(a,b){var c,d,e=this.K[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},la:function(){C(this,1)},oa:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&this.addEntropy([b,c],2,"mouse");C(this,0)},qa:function(a){a=
a.touches[0]||a.changedTouches[0];this.addEntropy([a.pageX||a.clientX,a.pageY||a.clientY],1,"touch");C(this,0)},ma:function(){C(this,2)},ea:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&this.addEntropy(b,1,"accelerometer")}a&&this.addEntropy(a,2,"accelerometer");C(this,0)}};
function A(a,b){var c,d=sjcl.random.K[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function C(a,b){"undefined"!==typeof window&&window.performance&&"function"===typeof window.performance.now?a.addEntropy(window.performance.now(),b,"loadtime"):a.addEntropy((new Date).valueOf(),b,"loadtime")}function y(a){a.b=z(a).concat(z(a));a.L=new sjcl.cipher.aes(a.b)}function z(a){for(var b=0;4>b&&(a.h[b]=a.h[b]+1|0,!a.h[b]);b++);return a.L.encrypt(a.h)}
function B(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var D,E,F,G;if(G="undefined"!==typeof module&&module.exports){var H;try{H=require("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array((new Uint8Array(D)).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!==typeof window&&"undefined"!==typeof Uint32Array){F=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);
else break a;sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}
sjcl.json={defaults:{v:1,iter:1E4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json,f=e.g({iv:sjcl.random.randomWords(4,0)},e.defaults),g;e.g(f,c);c=f.adata;"string"===typeof f.salt&&(f.salt=sjcl.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl.codec.base64.toBits(f.iv));if(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&0x100!==f.ks||2>f.iv.length||
4<f.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters");"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof c&&(f.adata=c=sjcl.codec.utf8String.toBits(c));g=new sjcl.cipher[f.cipher](a);e.g(d,f);d.key=a;f.ct="ccm"===f.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&
b instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(g,b,f.iv,c,f.ts):sjcl.mode[f.mode].encrypt(g,b,f.iv,c,f.ts);return f},encrypt:function(a,b,c,d){var e=sjcl.json,f=e.ja.apply(e,arguments);return e.encode(f)},ia:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json;b=e.g(e.g(e.g({},e.defaults),b),c,!0);var f,g;f=b.adata;"string"===typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv));if(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===
typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&0x100!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters");"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,b),a=g.key.slice(0,b.ks/32),b.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof f&&(f=sjcl.codec.utf8String.toBits(f));g=new sjcl.cipher[b.cipher](a);f="ccm"===
b.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&b.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(g,b.ct,b.iv,b.tag,f,b.ts):sjcl.mode[b.mode].decrypt(g,b.ct,b.iv,f,b.ts);e.g(d,b);d.key=a;return 1===c.raw?f:sjcl.codec.utf8String.fromBits(f)},decrypt:function(a,b,c,d){var e=sjcl.json;return e.ia(a,e.decode(b),c,d)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");c+=d+'"'+
b+'":';d=",";switch(typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type");}}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");if(!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");
null!=d[3]?b[d[2]]=parseInt(d[3],10):null!=d[4]?b[d[2]]=d[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(d[4]):unescape(d[4]):null!=d[5]&&(b[d[2]]="true"===d[5])}return b},g:function(a,b,c){void 0===a&&(a={});if(void 0===b)return a;for(var d in b)if(b.hasOwnProperty(d)){if(c&&void 0!==a[d]&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},sa:function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&a[d]!==b[d]&&(c[d]=a[d]);return c},ra:function(a,
b){var c={},d;for(d=0;d<b.length;d++)void 0!==a[b[d]]&&(c[b[d]]=a[b[d]]);return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.pa={};sjcl.misc.cachedPbkdf2=function(a,b){var c=sjcl.misc.pa,d;b=b||{};d=b.iter||1E3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};c=void 0===b.salt?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);"function"===typeof define&&define([],function(){return sjcl});

/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2023
 * @license MIT
 */
!function(){"use strict";function t(t){if(t)b[0]=b[16]=b[1]=b[2]=b[3]=b[4]=b[5]=b[6]=b[7]=b[8]=b[9]=b[10]=b[11]=b[12]=b[13]=b[14]=b[15]=0,this.blocks=b,this.buffer8=a;else if(u){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}function r(r,e){var i,s=_(r);if(r=s[0],s[1]){var h,n=[],a=r.length,o=0;for(i=0;i<a;++i)(h=r.charCodeAt(i))<128?n[o++]=h:h<2048?(n[o++]=192|h>>>6,n[o++]=128|63&h):h<55296||h>=57344?(n[o++]=224|h>>>12,n[o++]=128|h>>>6&63,n[o++]=128|63&h):(h=65536+((1023&h)<<10|1023&r.charCodeAt(++i)),n[o++]=240|h>>>18,n[o++]=128|h>>>12&63,n[o++]=128|h>>>6&63,n[o++]=128|63&h);r=n}r.length>64&&(r=new t(!0).update(r).array());var f=[],u=[];for(i=0;i<64;++i){var c=r[i]||0;f[i]=92^c,u[i]=54^c}t.call(this,e),this.update(u),this.oKeyPad=f,this.inner=!0,this.sharedMemory=e}var e="input is invalid type",i="object"==typeof window,s=i?window:{};s.JS_MD5_NO_WINDOW&&(i=!1);var h=!i&&"object"==typeof self,n=!s.JS_MD5_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;n?s=global:h&&(s=self);var a,o=!s.JS_MD5_NO_COMMON_JS&&"object"==typeof module&&module.exports,f="function"==typeof define&&define.amd,u=!s.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,c="0123456789abcdef".split(""),y=[128,32768,8388608,-2147483648],p=[0,8,16,24],d=["hex","array","digest","buffer","arrayBuffer","base64"],l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),b=[];if(u){var v=new ArrayBuffer(68);a=new Uint8Array(v),b=new Uint32Array(v)}var w=Array.isArray;!s.JS_MD5_NO_NODE_JS&&w||(w=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var A=ArrayBuffer.isView;!u||!s.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&A||(A=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var _=function(t){var r=typeof t;if("string"===r)return[t,!0];if("object"!==r||null===t)throw new Error(e);if(u&&t.constructor===ArrayBuffer)return[new Uint8Array(t),!1];if(!w(t)&&!A(t))throw new Error(e);return[t,!1]},B=function(r){return function(e){return new t(!0).update(e)[r]()}},g=function(t){var r,i=require("crypto"),h=require("buffer").Buffer;r=h.from&&!s.JS_MD5_NO_BUFFER_FROM?h.from:function(t){return new h(t)};return function(s){if("string"==typeof s)return i.createHash("md5").update(s,"utf8").digest("hex");if(null===s||void 0===s)throw new Error(e);return s.constructor===ArrayBuffer&&(s=new Uint8Array(s)),w(s)||A(s)||s.constructor===h?i.createHash("md5").update(r(s)).digest("hex"):t(s)}},m=function(t){return function(e,i){return new r(e,!0).update(i)[t]()}};t.prototype.update=function(t){if(this.finalized)throw new Error("finalize already called");var r=_(t);t=r[0];for(var e,i,s=r[1],h=0,n=t.length,a=this.blocks,o=this.buffer8;h<n;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)if(u)for(i=this.start;h<n&&i<64;++h)(e=t.charCodeAt(h))<128?o[i++]=e:e<2048?(o[i++]=192|e>>>6,o[i++]=128|63&e):e<55296||e>=57344?(o[i++]=224|e>>>12,o[i++]=128|e>>>6&63,o[i++]=128|63&e):(e=65536+((1023&e)<<10|1023&t.charCodeAt(++h)),o[i++]=240|e>>>18,o[i++]=128|e>>>12&63,o[i++]=128|e>>>6&63,o[i++]=128|63&e);else for(i=this.start;h<n&&i<64;++h)(e=t.charCodeAt(h))<128?a[i>>>2]|=e<<p[3&i++]:e<2048?(a[i>>>2]|=(192|e>>>6)<<p[3&i++],a[i>>>2]|=(128|63&e)<<p[3&i++]):e<55296||e>=57344?(a[i>>>2]|=(224|e>>>12)<<p[3&i++],a[i>>>2]|=(128|e>>>6&63)<<p[3&i++],a[i>>>2]|=(128|63&e)<<p[3&i++]):(e=65536+((1023&e)<<10|1023&t.charCodeAt(++h)),a[i>>>2]|=(240|e>>>18)<<p[3&i++],a[i>>>2]|=(128|e>>>12&63)<<p[3&i++],a[i>>>2]|=(128|e>>>6&63)<<p[3&i++],a[i>>>2]|=(128|63&e)<<p[3&i++]);else if(u)for(i=this.start;h<n&&i<64;++h)o[i++]=t[h];else for(i=this.start;h<n&&i<64;++h)a[i>>>2]|=t[h]<<p[3&i++];this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>>2]|=y[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},t.prototype.hash=function(){var t,r,e,i,s,h,n=this.blocks;this.first?r=((r=((t=((t=n[0]-680876937)<<7|t>>>25)-271733879<<0)^(e=((e=(-271733879^(i=((i=(-1732584194^2004318071&t)+n[1]-117830708)<<12|i>>>20)+t<<0)&(-271733879^t))+n[2]-1126478375)<<17|e>>>15)+i<<0)&(i^t))+n[3]-1316259209)<<22|r>>>10)+e<<0:(t=this.h0,r=this.h1,e=this.h2,r=((r+=((t=((t+=((i=this.h3)^r&(e^i))+n[0]-680876936)<<7|t>>>25)+r<<0)^(e=((e+=(r^(i=((i+=(e^t&(r^e))+n[1]-389564586)<<12|i>>>20)+t<<0)&(t^r))+n[2]+606105819)<<17|e>>>15)+i<<0)&(i^t))+n[3]-1044525330)<<22|r>>>10)+e<<0),r=((r+=((t=((t+=(i^r&(e^i))+n[4]-176418897)<<7|t>>>25)+r<<0)^(e=((e+=(r^(i=((i+=(e^t&(r^e))+n[5]+1200080426)<<12|i>>>20)+t<<0)&(t^r))+n[6]-1473231341)<<17|e>>>15)+i<<0)&(i^t))+n[7]-45705983)<<22|r>>>10)+e<<0,r=((r+=((t=((t+=(i^r&(e^i))+n[8]+1770035416)<<7|t>>>25)+r<<0)^(e=((e+=(r^(i=((i+=(e^t&(r^e))+n[9]-1958414417)<<12|i>>>20)+t<<0)&(t^r))+n[10]-42063)<<17|e>>>15)+i<<0)&(i^t))+n[11]-1990404162)<<22|r>>>10)+e<<0,r=((r+=((t=((t+=(i^r&(e^i))+n[12]+1804603682)<<7|t>>>25)+r<<0)^(e=((e+=(r^(i=((i+=(e^t&(r^e))+n[13]-40341101)<<12|i>>>20)+t<<0)&(t^r))+n[14]-1502002290)<<17|e>>>15)+i<<0)&(i^t))+n[15]+1236535329)<<22|r>>>10)+e<<0,r=((r+=((i=((i+=(r^e&((t=((t+=(e^i&(r^e))+n[1]-165796510)<<5|t>>>27)+r<<0)^r))+n[6]-1069501632)<<9|i>>>23)+t<<0)^t&((e=((e+=(t^r&(i^t))+n[11]+643717713)<<14|e>>>18)+i<<0)^i))+n[0]-373897302)<<20|r>>>12)+e<<0,r=((r+=((i=((i+=(r^e&((t=((t+=(e^i&(r^e))+n[5]-701558691)<<5|t>>>27)+r<<0)^r))+n[10]+38016083)<<9|i>>>23)+t<<0)^t&((e=((e+=(t^r&(i^t))+n[15]-660478335)<<14|e>>>18)+i<<0)^i))+n[4]-405537848)<<20|r>>>12)+e<<0,r=((r+=((i=((i+=(r^e&((t=((t+=(e^i&(r^e))+n[9]+568446438)<<5|t>>>27)+r<<0)^r))+n[14]-1019803690)<<9|i>>>23)+t<<0)^t&((e=((e+=(t^r&(i^t))+n[3]-187363961)<<14|e>>>18)+i<<0)^i))+n[8]+1163531501)<<20|r>>>12)+e<<0,r=((r+=((i=((i+=(r^e&((t=((t+=(e^i&(r^e))+n[13]-1444681467)<<5|t>>>27)+r<<0)^r))+n[2]-51403784)<<9|i>>>23)+t<<0)^t&((e=((e+=(t^r&(i^t))+n[7]+1735328473)<<14|e>>>18)+i<<0)^i))+n[12]-1926607734)<<20|r>>>12)+e<<0,r=((r+=((h=(i=((i+=((s=r^e)^(t=((t+=(s^i)+n[5]-378558)<<4|t>>>28)+r<<0))+n[8]-2022574463)<<11|i>>>21)+t<<0)^t)^(e=((e+=(h^r)+n[11]+1839030562)<<16|e>>>16)+i<<0))+n[14]-35309556)<<23|r>>>9)+e<<0,r=((r+=((h=(i=((i+=((s=r^e)^(t=((t+=(s^i)+n[1]-1530992060)<<4|t>>>28)+r<<0))+n[4]+1272893353)<<11|i>>>21)+t<<0)^t)^(e=((e+=(h^r)+n[7]-155497632)<<16|e>>>16)+i<<0))+n[10]-1094730640)<<23|r>>>9)+e<<0,r=((r+=((h=(i=((i+=((s=r^e)^(t=((t+=(s^i)+n[13]+681279174)<<4|t>>>28)+r<<0))+n[0]-358537222)<<11|i>>>21)+t<<0)^t)^(e=((e+=(h^r)+n[3]-722521979)<<16|e>>>16)+i<<0))+n[6]+76029189)<<23|r>>>9)+e<<0,r=((r+=((h=(i=((i+=((s=r^e)^(t=((t+=(s^i)+n[9]-640364487)<<4|t>>>28)+r<<0))+n[12]-421815835)<<11|i>>>21)+t<<0)^t)^(e=((e+=(h^r)+n[15]+530742520)<<16|e>>>16)+i<<0))+n[2]-995338651)<<23|r>>>9)+e<<0,r=((r+=((i=((i+=(r^((t=((t+=(e^(r|~i))+n[0]-198630844)<<6|t>>>26)+r<<0)|~e))+n[7]+1126891415)<<10|i>>>22)+t<<0)^((e=((e+=(t^(i|~r))+n[14]-1416354905)<<15|e>>>17)+i<<0)|~t))+n[5]-57434055)<<21|r>>>11)+e<<0,r=((r+=((i=((i+=(r^((t=((t+=(e^(r|~i))+n[12]+1700485571)<<6|t>>>26)+r<<0)|~e))+n[3]-1894986606)<<10|i>>>22)+t<<0)^((e=((e+=(t^(i|~r))+n[10]-1051523)<<15|e>>>17)+i<<0)|~t))+n[1]-2054922799)<<21|r>>>11)+e<<0,r=((r+=((i=((i+=(r^((t=((t+=(e^(r|~i))+n[8]+1873313359)<<6|t>>>26)+r<<0)|~e))+n[15]-30611744)<<10|i>>>22)+t<<0)^((e=((e+=(t^(i|~r))+n[6]-1560198380)<<15|e>>>17)+i<<0)|~t))+n[13]+1309151649)<<21|r>>>11)+e<<0,r=((r+=((i=((i+=(r^((t=((t+=(e^(r|~i))+n[4]-145523070)<<6|t>>>26)+r<<0)|~e))+n[11]-1120210379)<<10|i>>>22)+t<<0)^((e=((e+=(t^(i|~r))+n[2]+718787259)<<15|e>>>17)+i<<0)|~t))+n[9]-343485551)<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+i<<0)},t.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return c[t>>>4&15]+c[15&t]+c[t>>>12&15]+c[t>>>8&15]+c[t>>>20&15]+c[t>>>16&15]+c[t>>>28&15]+c[t>>>24&15]+c[r>>>4&15]+c[15&r]+c[r>>>12&15]+c[r>>>8&15]+c[r>>>20&15]+c[r>>>16&15]+c[r>>>28&15]+c[r>>>24&15]+c[e>>>4&15]+c[15&e]+c[e>>>12&15]+c[e>>>8&15]+c[e>>>20&15]+c[e>>>16&15]+c[e>>>28&15]+c[e>>>24&15]+c[i>>>4&15]+c[15&i]+c[i>>>12&15]+c[i>>>8&15]+c[i>>>20&15]+c[i>>>16&15]+c[i>>>28&15]+c[i>>>24&15]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return[255&t,t>>>8&255,t>>>16&255,t>>>24&255,255&r,r>>>8&255,r>>>16&255,r>>>24&255,255&e,e>>>8&255,e>>>16&255,e>>>24&255,255&i,i>>>8&255,i>>>16&255,i>>>24&255]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},t.prototype.buffer=t.prototype.arrayBuffer,t.prototype.base64=function(){for(var t,r,e,i="",s=this.array(),h=0;h<15;)t=s[h++],r=s[h++],e=s[h++],i+=l[t>>>2]+l[63&(t<<4|r>>>4)]+l[63&(r<<2|e>>>6)]+l[63&e];return t=s[h],i+=l[t>>>2]+l[t<<4&63]+"=="},(r.prototype=new t).finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var r=this.array();t.call(this,this.sharedMemory),this.update(this.oKeyPad),this.update(r),t.prototype.finalize.call(this)}};var O=function(){var r=B("hex");n&&(r=g(r)),r.create=function(){return new t},r.update=function(t){return r.create().update(t)};for(var e=0;e<d.length;++e){var i=d[e];r[i]=B(i)}return r}();O.md5=O,O.md5.hmac=function(){var t=m("hex");t.create=function(t){return new r(t)},t.update=function(r,e){return t.create(r).update(e)};for(var e=0;e<d.length;++e){var i=d[e];t[i]=m(i)}return t}(),o?module.exports=O:(s.md5=O,f&&define(function(){return O}))}();
return {sjcl:sjcl, md5:window.md5};
}());
var NIUWA_CODEC = (function () {
var sjcl=NF_CRYPTO.sjcl, md5=NF_CRYPTO.md5;
var KEY_SALT='~!@#$%^&*()_+   +_)(*&^%$#@!~   ';
var IV_SALT='%$#@!  ^&*()';
  function asText(value) {
    if (typeof value === 'string') return value;
    if (value && typeof value.length === 'number') {
      var text = '';
      for (var i = 0; i < value.length; i++) {
        if (value[i] > 127) throw new Error('Encrypted body contains non-ASCII bytes');
        text += String.fromCharCode(value[i]);
      }
      return text;
    }
    throw new Error('Request/response body is unavailable');
  }

  function parseBody(value) {
    var text = asText(value).replace(/\s/g, '');
    if (!/^[A-Za-z0-9+/]+$/.test(text) || text.length <= 14) {
      throw new Error('Invalid encrypted body');
    }
    var numberText = sjcl.codec.utf8String.fromBits(sjcl.codec.base64.toBits(text.slice(-14)));
    if (!/^[0-9]{10}$/.test(numberText)) throw new Error('Invalid body integer');
    var payload = sjcl.codec.base64.toBits(text.slice(0, -14));
    if (sjcl.bitArray.bitLength(payload) < 128) throw new Error('Missing GCM authentication tag');
    return { number: Number(numberText), payload: payload };
  }

  function derive(number) {
    var key = md5(KEY_SALT + String(number)).toUpperCase();
    var iv = md5(IV_SALT + String(number)).toUpperCase().slice(5, 17);
    return {
      key: sjcl.codec.utf8String.toBits(key),
      iv: sjcl.codec.utf8String.toBits(iv)
    };
  }

  function encryptBody(plain, responseInteger, requestInteger) {
    if (!/^[0-9]{10}$/.test(String(responseInteger))) throw new Error('Invalid response integer');
    var params = derive(responseInteger + requestInteger);
    var bits = sjcl.mode.gcm.encrypt(new sjcl.cipher.aes(params.key),
      sjcl.codec.utf8String.toBits(plain), params.iv, [], 128);
    return sjcl.codec.base64.fromBits(bits, true) +
      sjcl.codec.base64.fromBits(sjcl.codec.utf8String.toBits(String(responseInteger)), true);
  }

  function decryptBody(value, requestInteger) {
    var body = parseBody(value);
    var params = derive(body.number + requestInteger);
    var bits = sjcl.mode.gcm.decrypt(new sjcl.cipher.aes(params.key), body.payload, params.iv, [], 128);
    return sjcl.codec.utf8String.fromBits(bits);
  }

return {parseBody:parseBody, decryptBody:decryptBody};
}());
/* 第二部分：定时签到，受 sign_enable 和插件 Cron 控制。 */
(function () {
  'use strict';
  var TOTAL_REQUESTS = 10;
  var INTERVAL_MS = 10000;
  var finished = false;
  function finish() {
    if (!finished) { finished = true; $done(); }
  }
  function notify(subtitle, content) {
    try { $notification.post('牛蛙助手', subtitle, String(content)); }
    catch (error) { console.log('[牛蛙助手] 通知失败：' + String(error)); }
  }
  function enabled(argument) {
    var value;
    if (argument === undefined || argument === null || argument === '') return true;
    if (typeof argument === 'object') value = argument.sign_enable;
    else {
      var text = String(argument).trim();
      try { var obj = JSON.parse(text); value = typeof obj === 'object' && obj !== null ? obj.sign_enable : obj; }
      catch (_) {
        var match = /(?:^|[&,])\s*sign_enable\s*=\s*([^&,]+)/.exec(text);
        value = match ? match[1].trim() : text;
      }
    }
    if (value === undefined) return true;
    if (value === true || value === 1 || /^(?:true|1)$/i.test(String(value))) return true;
    if (value === false || value === 0 || /^(?:false|0)$/i.test(String(value))) return false;
    throw new Error('无法识别sign_enable参数，请更新插件配置');
  }

  try {
    if (!enabled(typeof $argument === 'undefined' ? undefined : $argument)) {
      console.log('[牛蛙助手] 每日签到开关关闭，未发送请求');
      finish();
      return;
    }
    // Snapshot once, so later captures cannot change the integer for this request.
    var body = $persistentStore.read('niuwabody');
    if (typeof body !== 'string' || !body.trim()) {
      notify('尚未获取信息', '请先打开牛蛙助手的任务列表，等待“牛蛙助手信息已更新。”通知。');
      finish();
      return;
    }
    var requestInteger = NIUWA_CODEC.parseBody(body).number;
    // Check the stored body locally; send its original bytes without regenerating it.
    JSON.parse(NIUWA_CODEC.decryptBody(body, 0));
    var sent = 0;
    function scheduleNext() {
      if (sent >= TOTAL_REQUESTS) {
        console.log('[牛蛙助手] 本轮已发送' + sent + '次，任务结束');
        finish();
      } else {
        setTimeout(sendNext, INTERVAL_MS);
      }
    }
    function sendNext() {
      if (finished) return;
      var index = ++sent;
      var settled = false;
      function handleResponse(error, response, data) {
        if (finished || settled) return;
        settled = true;
        var progress = '（' + index + '/' + TOTAL_REQUESTS + '）';
        try {
          if (error) throw new Error('网络请求失败：' + String(error));
          var status = Number(response && (response.status || response.statusCode) || 0);
          if (status < 200 || status >= 300) throw new Error('服务器返回HTTP ' + status);
          var json = JSON.parse(NIUWA_CODEC.decryptBody(data, requestInteger));
          var result = json && json.body;
          if (result && typeof result.addesc === 'string' && result.addesc.length) {
            notify('定时任务结果' + progress, result.addesc);
          } else {
            var message = result && typeof result.desc === 'string' ? result.desc :
              (json && typeof json.pub_desc === 'string' ? json.pub_desc : '响应没有body.addesc字段');
            notify('响应未包含addesc' + progress, message);
          }
          console.log('[牛蛙助手] 第' + index + '次响应解密及GCM校验通过；pub_code=' + String(json.pub_code));
        } catch (failure) {
          notify('定时任务失败' + progress, String(failure && failure.message || failure));
        } finally {
          scheduleNext();
        }
      }
      try {
        $httpClient.post({
      url: 'https://api.ios222.com/device/gromoreplay',
      timeout: 20000,
      'auto-redirect': false,
      'auto-cookie': false,
      headers: {
        'Host': 'api.ios222.com',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'User-Agent': 'WJYProo/5100 CFNetwork/1404.0.5 Darwin/22.3.0',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: body
        }, handleResponse);
      } catch (transportError) {
        handleResponse(transportError, null, null);
      }
    }
    sendNext();
  } catch (error) {
    notify('定时任务失败', String(error && error.message || error));
    finish();
  }
}());
