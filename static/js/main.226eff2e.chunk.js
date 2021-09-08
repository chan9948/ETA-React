(this["webpackJsonpeta-react"]=this["webpackJsonpeta-react"]||[]).push([[0],{42:function(t,e,n){},65:function(t,e,n){"use strict";n.r(e);var s=n(16),a=n(15),o=n(13),r=n(22),c=n(21),i=n(12),l=n(0),u=n.n(l),p=n(11),d=n.n(p),h=(n(42),n(29)),b=n(106),f=n(107),j=n(108),v=n(6),O=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(a.a)(this,n),(s=e.call(this,t)).state={showRoutes:[],showStops:[],selectedRoute:null,selectedStop:null,routeValue:null,stopValue:null},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=[];console.log("loading"),this.props.routes.forEach((function(e){var n=e.route+" : "+e.orig_tc+" -> "+e.dest_tc;t.push({value:e,label:n})})),this.setState({showRoutes:t},(function(){console.log("loading end")}))}},{key:"render",value:function(){var t=this;return Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"01"}),Object(v.jsx)(j.a,{options:this.state.showRoutes,getOptionLabel:function(t){return t.label},renderInput:function(t){return Object(v.jsx)(f.a,Object(h.a)(Object(h.a)({},t),{},{label:"Route",variant:"outlined"}))},onChange:function(e,n){!function(e){var n=[];t.props.mappings.forEach((function(s){s.route===e.value.route&&s.bound===e.value.bound&&t.props.stops.forEach((function(t){s.stop===t.stop&&n.push({value:t,label:t.name_tc})}))})),t.setState({showStops:n,stopValue:null,selectedStop:null,selectedRoute:e.value,routeValue:{value:e.value,label:e.label}})}(n)},value:this.state.routeValue,autoSelect:!0}),Object(v.jsx)(j.a,{options:this.state.showStops,getOptionLabel:function(t){return t.label},renderInput:function(t){return Object(v.jsx)(f.a,Object(h.a)(Object(h.a)({},t),{},{label:"Stop",variant:"outlined"}))},onChange:function(e,n){!function(e){t.setState({selectedStop:e.value,stopValue:{value:e.value,label:e.label}})}(n)},value:this.state.stopValue,autoSelect:!0}),Object(v.jsx)(b.a,{disabled:null==this.state.selectedRoute||null==this.state.selectedStop,style:{width:"100%"},variant:"outlined",onClick:function(e){t.props.addTrack(t.state.selectedRoute,t.state.selectedStop),t.setState({selectedRoute:null,selectedStop:null,routeValue:null,stopValue:null})},children:"Add"})]})}}]),n}(u.a.Component),g=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(a.a)(this,n),(s=e.call(this,t)).state={etas:[]},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=function(){fetch(t.props.track.url).then((function(t){return t.json()})).then((function(e){var n=e.data,s=[],a=Date.now();n.forEach((function(e){if(e.dir===t.props.track.bound){var n=Math.round((new Date(e.eta)-a)/1e3/60);n>=0&&s.push(n)}})),0===s.length&&s.push("no car"),t.setState({etas:s})}))};e(),setInterval((function(){e()}),1e4)}},{key:"render",value:function(){var t=this;return Object(v.jsxs)("div",{onContextMenu:function(){t.props.removeTrack(t.props.track.url)},style:{fontSize:"10px",marginBottom:"10px",borderRadius:"12px",aspectRatio:"4/1",width:"100%",maxWidth:"12cm",backgroundColor:"lightsteelblue",display:"flex",flexDirection:"row"},children:[" ",Object(v.jsx)("div",{style:{width:"20%",margin:"2.5%",backgroundColor:"lightgray",borderRadius:"50%",aspectRatio:"1/1",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(v.jsx)("div",{style:{padding:"10%",fontSize:"1.5em",aspectRatio:"1/1"},children:this.props.track.route})}),Object(v.jsxs)("div",{style:{width:"75%",aspectRatio:"3/1"},children:[Object(v.jsx)("div",{style:{aspectRatio:"6/1",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(v.jsx)("div",{style:{fontSize:"1.3em"},children:this.props.track.orig+" -> "+this.props.track.dest})}),Object(v.jsxs)("div",{style:{aspectRatio:"6/1",display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-around"},children:[Object(v.jsx)("div",{style:{fontSize:"1.5em"},children:this.props.track.stop}),Object(v.jsx)("div",{style:{width:"30%",display:"flex",justifyContent:"space-between",alignItems:"center"},children:this.state.etas.map((function(t,e){return Object(v.jsx)("div",{style:{backgroundColor:"lightblue",padding:"2.5px 5px",borderRadius:"7.5px"},children:t},e)}))})]})]})]})}}]),n}(u.a.Component),k=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(a.a)(this,n),(s=e.call(this,t)).state={},s}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(v.jsx)("div",{style:{display:"flex",flexDirection:"column",padding:"10px 0"},children:null!==this.props.tracks?this.props.tracks.map((function(e){return Object(v.jsx)(g,{track:e,removeTrack:t.props.removeTrack},e.created)})):""})}}]),n}(u.a.Component),m=n(35),x=(n(64),function(t,e,n){var s=window.localStorage,a=s.getItem(e);if(a)console.log("load "+e+" from localStorage"),t.setState(Object(i.a)({},e,JSON.parse(a)));else if(n)console.log("load "+e+" from internet"),function(t){return fetch(t).then((function(t){return t.json()}))}(n).then((function(n){var a=n.data;s.setItem(e,JSON.stringify(a)),t.setState(Object(i.a)({},e,a))}));else{console.log("store empty "+e+" to localStorage");var o=[];t.setState(Object(i.a)({},e,o)),s.setItem(e,JSON.stringify(o))}return Promise.resolve()}),S=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(a.a)(this,n),(s=e.call(this,t)).state={routes:null,stops:null,mappings:null,tracks:null},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=this;x(this,"routes","https://data.etabus.gov.hk/v1/transport/kmb/route/").then((function(){t.setState({showRoutes:t.state.routes})})),x(this,"stops","https://data.etabus.gov.hk/v1/transport/kmb/stop").then((function(){t.setState({showStops:t.state.stops})})),x(this,"mappings","https://data.etabus.gov.hk/v1/transport/kmb/route-stop"),x(this,"tracks",null)}},{key:"render",value:function(){var t=this;return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("code",{children:" Right click card to remove "}),Object(v.jsx)("br",{}),Object(v.jsx)("code",{children:" Refresh rate: 10 s "})," ",this.state.routes?Object(v.jsx)(O,{addTrack:function(e,n){if(null!==e&&null!==n){var a={created:new Date,route:e.route,orig:e.orig_tc,dest:e.dest_tc,stop:n.name_tc,bound:e.bound,url:"https://data.etabus.gov.hk/v1/transport/kmb/eta/".concat(n.stop,"/").concat(e.route,"/1")},o=!1;t.state.tracks.forEach((function(t){t.url===a.url&&t.bound===a.bound&&(o=!0)})),o?(r="track already exists",m.b.warn(r)):t.setState({tracks:[].concat(Object(s.a)(t.state.tracks),[a])},(function(){window.localStorage.setItem("tracks",JSON.stringify(t.state.tracks))}))}var r},routes:this.state.routes,stops:this.state.stops,mappings:this.state.mappings,children:" "}):"",Object(v.jsx)(k,{tracks:this.state.tracks,removeTrack:function(e){var n,s=JSON.parse(JSON.stringify(t.state.tracks));s.forEach((function(t){t.url===e&&(n=t.route,s.splice(s.indexOf(t),1))})),t.setState({tracks:s},(function(){var e;window.localStorage.setItem("tracks",JSON.stringify(t.state.tracks)),e="removed "+n+" track",m.b.info(e)}))},children:" "})," ",Object(v.jsx)(m.a,{position:"bottom-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0})]})}}]),n}(u.a.Component);d.a.render(Object(v.jsx)(S,{}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.226eff2e.chunk.js.map