import { Multiselect } from './multiselect.core'
//multiselect collection
window.multiselects = []

multiselect = (selector) => {
  let res = []
  if (!window.multiselects._items) {
    window.multiselects._items = []
  }

  elems = document.querySelectorAll(selector)
  elems.forEach((e) => {
    // console.log(e)
    let index = window.multiselects._items.indexOf(e)
    if (index == -1) {
      var inputItem = new Multiselect(e)
      window.multiselects.push(inputItem)
      window.multiselects._items.push(e)

      res.push(inputItem)
    } else {
      res.push(window.multiselects[index])
    }
  })

  return res.length == 1 ? res[0] : res
}
