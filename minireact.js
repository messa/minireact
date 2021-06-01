'use strict';

function createElement(type, config, children) {
  const props = {}
  if (config) {
    Object.assign(props, config)
  }
  props.children = Array.from(arguments).slice(2).flat()
  return { // ReactElement
    type,
    props
  }
}

/**
ReactDOM.render

Usage:

  ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("app-root")
  );

*/
function render(element, container) {
  console.debug('Rendering:', element)
  if (element.reactRoot) {
    throw new Error('element already has reactRoot attached to it')
  }
  console.debug('ReactDOM render:', element)
  const instance = createElementInstance(element)
  container.appendChild(instance.getDomNode())
}

function createElementInstance(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new TextElementInstance(element.toString())
    } else if (typeof element.type === 'string') {
    const instance = new HTMLElementInstance()
    instance.setNewElement(element)
    return instance
  } else if (typeof element.type === 'function') {
    const instance = new ReactFunctionInstance()
    instance.setNewElement(element)
    return instance
  } else {
    throw new Error(`Unknown element type: ${element}`)
  }
}

class ReactFunctionInstance {

  constructor() {
    this.reactElement = null
    this.subItem = null
    this.hooksData = []
  }

  canAcceptNewElement(newElement) {
    return typeof newElement.type === 'function' && newElement.type === this.reactElement.type
  }

  setNewElement(reactElement) {
    if (typeof reactElement.type !== 'function') {
      throw new Error('React function element expected')
    }
    this.reactElement = reactElement
    this.render()
    this.reconcile()
  }

  render() {
    console.debug('Rendering', this.reactElement.type, 'with props:', this.reactElement.props)
    ReactCurrentDispatcher.current = new HooksDispatcher(this.hooksData, this.triggerRerender)
    try {
      this.renderResult = this.reactElement.type(this.reactElement.props)
    } finally {
      ReactCurrentDispatcher.current = null
    }
    console.debug('Render result:', this.renderResult)
  }

  reconcile() {
    if (!this.subItem) {
      this.subItem = createElementInstance(this.renderResult)
    } else if (this.subItem.canAcceptNewElement(this.renderResult)) {
      this.subItem.setNewElement(this.renderResult)
    } else {
        // destroy old subItem, create new one
        this.subItem = createElementInstance(this.renderResult)
      }
  }

  getDomNode() {
    return this.subItem.getDomNode()
  }

  triggerRerender = () => {
    // called from hooks
    this.render()
    this.reconcile()
  }

}

class HTMLElementInstance {

  constructor() {
    this.htmlElement = null
    this.domNode = null
    this.items = []
  }

  canAcceptNewElement(newElement) {
    return typeof newElement.type === 'string' && newElement.type === this.htmlElement.type
  }

  setNewElement(htmlElement) {
    if (typeof htmlElement.type !== 'string') {
      throw new Error('HTML element expected')
    }
    this.htmlElement = htmlElement
    this.reconcile()
  }

  reconcile() {
    if (!this.domNode) {
      this.domNode = document.createElement(this.htmlElement.type)
    }
    if (this.htmlElement.props.type) {
      this.domNode.type = this.htmlElement.props.type
    }
    if (this.htmlElement.props.value || this.htmlElement.props.value === '') {
      this.domNode.value = this.htmlElement.props.value
    }
    if (this.htmlElement.props.placeholder) {
      this.domNode.placeholder = this.htmlElement.props.placeholder
    }
    if (this.htmlElement.props.onClick) {
      this.domNode.onclick = this.htmlElement.props.onClick
    }
    if (this.htmlElement.props.onSubmit) {
      this.domNode.onsubmit = this.htmlElement.props.onSubmit
    }
    if (this.htmlElement.props.onChange) {
      this.domNode.onchange = this.htmlElement.props.onChange
      if (this.htmlElement.type === 'input') {
        this.domNode.onkeyup = this.htmlElement.props.onChange
      }
    }
    const children = this.htmlElement.props.children
    const newItems = []
    for (let index = 0; index < children.length; ++index) {
      if (this.items[index] && this.items[index].instance.canAcceptNewElement(children[index])) {
        this.items[index].instance.setNewElement(children[index])
        newItems[index] = this.items[index]
      } else {
        const newInstance = createElementInstance(children[index])
        newItems[index] = {
          instance: newInstance,
        }
        const newInstanceDomNode = newInstance.getDomNode()
        if (newInstanceDomNode) {
          if (this.items[index] && this.items[index].domNode) {
            this.domNode.replaceChild(newInstanceDomNode, this.items[index].domNode)
          } else {
            this.domNode.appendChild(newInstanceDomNode)
          }
          newItems[index].domNode = newInstanceDomNode
        }
      }
    }
    this.items = newItems
  }

  getDomNode() {
    return this.domNode
  }

}

class TextElementInstance {

  constructor(textElement) {
    if (typeof textElement !== 'string') {
      throw new Error('Text element was expected')
    }
    this.text = textElement
    this.domNode = document.createTextNode(this.text)
  }

  getDomNode() {
    return this.domNode
  }

  canAcceptNewElement(newElement) {
    // always destroy a create new text node
    return false
  }

}

const ReactCurrentDispatcher = { current: null }

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current
  if (dispatcher === null) {
    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component.')
  }
  return dispatcher
}

function useState(initialState) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}

class HooksDispatcher {

  constructor(hooksData, triggerRerender) {
    this.hooksData = hooksData
    this.hooksDataIndex = 0
    this.triggerRerender = triggerRerender
  }

  getHookData(hookType) {
    if (!this.hooksData[this.hooksDataIndex]) {
      this.hooksData[this.hooksDataIndex] = {
        type: 'useState',
      }
    }
    const hookData = this.hooksData[this.hooksDataIndex]
    this.hooksDataIndex++
    if (hookData.type !== 'useState') {
      throw new Error('Invalid hook data - hooks are probably being executed in different order')
    }
    return hookData
  }

  useState(initialState) {
    const hookData = this.getHookData('useState')
    if (typeof hookData.value === 'undefined') {
      hookData.value = initialState
    }
    const setNewValue = (newValue) => {
      hookData.value = newValue
      this.triggerRerender()
    }
    return [ hookData.value, setNewValue ]
  }

}

window.React = {
  createElement,
  useState,
}
window.ReactDOM = {
  render,
}
