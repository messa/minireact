const initialItems = [
    {
      title: "First item",
      votes: 20
    },
    {
      title: "Second item",
      votes: 10
    }
  ];

  function App() {
    const [items, setItems] = React.useState(initialItems);

    const addVote = (item, delta) => {
      const newItems = items.map((currentItem) => {
        if (currentItem === item) {
          return { ...currentItem, votes: currentItem.votes + delta };
        } else {
          return currentItem;
        }
      });
      setItems(newItems);
    };

    const addItem = ({ title }) => {
      const newItems = [
        ...items,
        {
          title: title,
          votes: 1
        }
      ];
      setItems(newItems);
    };

    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(ItemList, {
        items: items,
        addVote: addVote
      }),
      /*#__PURE__*/ React.createElement(NewItemForm, {
        addItem: addItem
      })
    );
  }

  function ItemList({ items, addVote }) {
    return /*#__PURE__*/ React.createElement(
      "ul",
      {
        className: "items"
      },
      items.map((item) =>
        /*#__PURE__*/ React.createElement(
          "li",
          null,
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "item-title"
            },
            item.title
          ),
          " ",
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => addVote(item, -1)
            },
            "-"
          ),
          " ",
          item.votes,
          " ",
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => addVote(item, 1)
            },
            "+"
          ),
          " "
        )
      )
    );
  }

  function NewItemForm({ addItem }) {
    const [title, setTitle] = React.useState("");

    const handleSubmit = (event) => {
      console.debug("Adding new item:", title);
      addItem({
        title
      });
      setTitle("");
      event.preventDefault();
    };

    return /*#__PURE__*/ React.createElement(
      "form",
      {
        onSubmit: handleSubmit
      },
      /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: "Add new item",
        value: title,
        onChange: (event) => setTitle(event.target.value)
      }),
      /*#__PURE__*/ React.createElement("input", {
        type: "submit"
      })
    );
  }

  ReactDOM.render(
    /*#__PURE__*/ React.createElement(App, null),
    document.getElementById("app-root")
  );
