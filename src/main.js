 const $siteList = $('.siteList');
 const $lastli = $siteList.find('li.last');
 const x = localStorage.getItem('x')
 console.log('x')
 console.log(x)
 const xObject = JSON.parse(x)

 const hashMap = xObject || [
     {logo: 'A', logoType:'text', url: 'https://www.acfun.cn'},
     {logo:'B', logoType:'text', url: 'https://www.bilibili.com'},
    ]
 const removeX = (url)=>{
     return url.replace('https://','')
       .replace('http://','')
       .replace('www.','')
        .replace(/\/.*/, '')
    }
 const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=> {
     const $li = $(` <li>
        <div class="site">
          <div class="log">${removeX(node.url)[0]}</div>
          <div class="link">${removeX(node.url)}</div>
          <div class="close">
            <svg class="icon" >
              <use xlink:href="#icon-close">
              </use>
             </svg>
         </div>
        </div>
     </li>`).insertBefore($lastli)     
     $li.on('click', ()=>{
         window.open(node.url)
     })
     $li.on('click', '.close',(e)=>{
         e.stopPropagation() 
        hashMap.splice(index, 1)
        render()
     })
 })
};
render()
 
    
 $('.addButton')
    .on('click', ()=>{
     let url = window.prompt('请输入需要添加的网址')
     if(url.indexOf('http') !== 0){
         url = 'http://' + url
     }
     console.log(url)
     hashMap.push({
         logo: url[0],
         logoType: 'text',
         url: url,
     });
     
     render()
    });



    window.onbeforeunload = ()=>{
        console.log('我关闭了')
        const string = JSON.stringify(hashMap)
        window.localStorage.setItem('x', string)
    }

    $(document).on('keypress', (e)=>{
        const {key} = e // const key = e.key
        for (let i=0; i < hashMap.length; i++){
            if (hashMap[i].logo.toLowerCase() === key){
                window.open(hashMap[i].url)
            }
        }
    })