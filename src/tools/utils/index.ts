
export function makeActionCreator<T>(type:string, ...argNames: string[]){
  return (...args: any[]) => {
    let action= { type: type };
    argNames.forEach((arg, index) => {
      if(arg === 'data'){
        action[argNames[index]] = <T>args[index]
      } else if (arg === 'action'){
        const addType:string = args[index]
        if(addType){
          const addTypeArr = addType.split('/');
          action.type = type + '/' + addTypeArr[addTypeArr.length - 1]
        }
      } else {
        action[argNames[index]] = <any>args[index]
      }
    });
    return action;
  }
}

export const addActiveFlag = (items: any[]) => {
  items = items.map((item: any) => {
    return {
      ...item,
      isActive: false
    }
  });
  return items
}

export const queryParse = (search:string) => {
 // console.log('queryParse')
  //console.log(search)
  if(!search){
    return null;
  }
  const parsed = search.slice(1).split('&');
  let query = {};
  parsed.forEach((item:any) => {
    let arr = item.split('=');
    if(!arr.length){
      return query;
    }
    //console.log(arr)
  // console.log(arr[0])
    //console.log(arr[1])
    query[arr[0]] = arr[1]
  });
  //console.log(parsed)
  //console.log(query)
 //console.log('queryParse')
  return query;
};

export const isInEnum = (en: any, el: string | number) =>{
 // console.log('isInEnum');
  let result: boolean = false
  for (let item in en) {
    if (isNaN(Number(item))) {
     // console.log(el);
      //console.log(en[item]);
      //console.log(en[item].sort);
      if(en[item] == el){
        result = true;
      }
    }
  }
  //console.log('result');
  //console.log(result);
  return result;
};

export let localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key: any) {
      return store[key];
    },
    setItem: function (key: any, value: any) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: any) {
      delete store[key];
    }
  };
})();
