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
    const items = initialItems;
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(ItemList, {
        items: items
      }),
      /*#__PURE__*/ React.createElement(NewItemForm, null)
    );
  }

  function ItemList({ items }) {
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
          /*#__PURE__*/ React.createElement("button", null, "-"),
          " ",
          item.votes,
          " ",
          /*#__PURE__*/ React.createElement("button", null, "+"),
          " "
        )
      )
    );
  }

  function NewItemForm() {
    const [title, setTitle] = React.useState("");

    const handleSubmit = (event) => {
      console.debug("Adding new item:", title);
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
