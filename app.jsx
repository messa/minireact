const initialItems = [
  { title: 'First item', votes: 20 },
  { title: 'Second item', votes: 10 },
]

function App() {
  const items = initialItems
  return (
    <div>
      <ItemList items={items} />
      <NewItemForm />
    </div>
  )
}

function ItemList({ items }) {
  return (
    <ul className='items'>
      {items.map(item => (
        <li>
          {item.title}
          {' '}<button>-</button>{' '}
          {item.votes}
          {' '}<button>+</button>{' '}
        </li>
      ))}
    </ul>
  )
}

function NewItemForm() {
  const [ title, setTitle ] = React.useState('')
  const handleSubmit = (event) => {
    console.debug('Adding new item:', title)
    setTitle('')
    event.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='New item'
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
