const initialItems = [
  { title: 'First item', votes: 20 },
  { title: 'Second item', votes: 10 },
]

function App() {
  const [ items, setItems ] = React.useState(initialItems)

  const addVote = (item, delta) => {
    const newItems = items.map(currentItem => {
      if (currentItem === item) {
        return { ...currentItem, votes: currentItem.votes + delta }
      } else {
        return currentItem
      }
    })
    setItems(newItems)
  }

  const addItem = ({ title }) => {
    setItems(currentItems => [...currentItems, { title: title, votes: 1 }])
  }

  return (
    <div>
      <ItemList items={items} addVote={addVote} />
      <NewItemForm addItem={addItem} />
    </div>
  )
}

function ItemList({ items, addVote }) {
  return (
    <ul className='items'>
      {items.map(item => (
        <li>
          <span className='item-title'>{item.title}</span>
          {' '}<button onClick={() => addVote(item, -1)}>-</button>{' '}
          {item.votes}
          {' '}<button onClick={() => addVote(item, 1)}>+</button>{' '}
        </li>
      ))}
    </ul>
  )
}

function NewItemForm({ addItem }) {
  const [ title, setTitle ] = React.useState('')
  const handleSubmit = (event) => {
    console.debug('Adding new item:', title)
    addItem({ title })
    setTitle('')
    event.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add new item'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <input
        type='submit'
      />
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('app-root'))
