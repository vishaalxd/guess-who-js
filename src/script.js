import "./style.scss";
import {
  PageTitle,
  InputGenerator,
  Container,
  Card,
  ButtonBuilder,
} from "./Components/GenericComponents";

//Render DOM
document.addEventListener("DOMContentLoaded", function (event) {
  //Root DOM
  const renderDOM = document.querySelector("#root");
  let render = document.createElement("main");
  render.classList.add("page-width");
  renderDOM.appendChild(render);

  const App = () => {
    //feeds
    let feeds = [];

    let currentState = {
      name: null,
      desc: null,
      id: feeds.length,
      secret: null,
      show: false,
    };

    const cardClickedHandler = (id, show) => {
      const filtered = feeds.map((each, index) => {
        if (index === id) {
          each.show = !each.show;
        }
        return each
      });
      console.log(filtered,"Filter")
      reRenderCards(filtered);
    };

    const updateState = (props) => {
      if (props.name) {
        currentState["name"] = props.name;
      } else if (props.desc) {
        currentState["desc"] = props.desc;
      } else currentState["secret"] = props.secret;
    };

    const submitFeed = () => {
      if (currentState.name && currentState.desc && currentState.secret) {
        currentState.id = feeds.length + 1;
        currentState.show = false;
        feeds.push(currentState);
        currentState = {};

        let elements = document.getElementsByTagName("input");
        for (let i = 0; i < elements.length; i++) {
          document.getElementsByTagName("input")[i].value = "";
        }
        document.getElementsByTagName("textarea")[0].value = "";
      }

      reRenderCards(feeds);
    };

    const reRenderCards = (feed) => {
      //Cards
      containerDisplay.innerHTML = "";
      let cards = null;
      if (feed.length) {
        cards = feed.map((each, index) => {
          return containerDisplay.appendChild(
            Card(
              "column",
              each.name,
              each.desc,
              index,
              each.show,
              each.secret,
              cardClickedHandler
            )
          );
        });
      }
      // console.log(feed);
      containerMain.appendChild(containerDisplay);
    };

    let pageTitle = PageTitle("Guess who?", "dark");
    let containerMain = Container("flex", "green", "100vh", "100%");
    let containerAdd = Container("column", "dark", "100%", "30%");
    let containerDisplay = Container("row", "green", "fit-content", "70%");
    let buttonWrapper = Container("row", "dark", "fit-content", "100%");
    buttonWrapper.classList.add("justify-right", "p-10");
    let buttonElement = ButtonBuilder("Share", "dark", submitFeed);

    let nameInput = InputGenerator(
      "text",
      "Title,",
      "catchy adjective!",
      "80%",
      updateState
    );
    let roleInput = InputGenerator(
      "textArea",
      "Description,",
      "Special description or a secret!",
      "80%",
      updateState
    );
    let passwordInput = InputGenerator(
      "password",
      "Who is it?",
      "enter the victim's name",
      "80%",
      updateState
    );

    //Input Fields appended
    containerAdd.appendChild(nameInput);
    containerAdd.appendChild(roleInput);
    containerAdd.appendChild(passwordInput);
    containerAdd.appendChild(buttonWrapper);
    buttonWrapper.appendChild(buttonElement);

    //Sections
    containerMain.appendChild(containerAdd);
    containerMain.appendChild(containerDisplay);
    //DOM Append
    render.appendChild(pageTitle);
    render.appendChild(containerMain);
  };
  App();
});
