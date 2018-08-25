import * as cookie from 'react-cookie';

interface StorageAction {
	save: (name: string, data: any, path?: object) => void
	load: (name: string) => any
	remove: (name: string, path?: object) => void
	loadState: (name: string) => any,
	saveState: (data: any, name: string) => void
	removeState: (name: string) => void
}
export const storage: StorageAction = {
  save: (name: string, data: any, path?: object): void => {
    cookie.save(name, data, path)
  },
  load: (name: string): any => {
    return cookie.load(name)
  },
  remove: (name: string, path?: object): any => {
    return cookie.remove(name, path)
  },
  loadState: (name: string) => {
    try {
      const serializedState = localStorage.getItem(name);
      if (!serializedState) {
        return undefined
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined
    }
  },
  saveState: (data: any, name: string) => {
    try {
      const serializedState = JSON.stringify(data);
      localStorage.setItem(name, serializedState)
    } catch (err) {
      //console.log(err)
    }
  },
  removeState: (name: string) => {
    try {
      localStorage.removeItem(name)
    } catch (err) {
      ///console.log(err)
    }
  }
};