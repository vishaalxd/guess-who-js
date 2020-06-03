export const Container = (flex, theme, height, width) => {
  let Wrapper = document.createElement("div");
  if (flex === "column") {
    Wrapper.classList.add("flex-col");
  } else Wrapper.classList.add("flex");

  if (theme) {
    Wrapper.classList.add(theme);
  }

  if (theme === "dark") {
    Wrapper.classList.add("dark");
  } else if (theme === "green") {
    Wrapper.classList.add("dark");
  } else Wrapper.classList.add("light");

  Wrapper.style.width = width;
  Wrapper.style.height = height;
  return Wrapper;
};

export const Card = (flex, title, content, index, show, secret, action) => {
  let Wrapper = document.createElement("div");
  Wrapper.style.width = "fit-content";
  Wrapper.style.maxWidth = "25%";
  Wrapper.style.height = "auto";
  Wrapper.style.margin = "20px";
  Wrapper.classList.add(
    "card",
    "min-width-20",
    "mr-5",
    "mt-10",
    "mb-10",
    "flex",
    "border-classic"
  );
  Wrapper.setAttribute("card-index", index);
  if (flex == "column") {
    Wrapper.classList.add("flex-col", "justify-center", "align-center");
  }

  let TitleHolder = document.createElement("div");

  if (show) {
    TitleHolder.classList.add("aqua", "sub-title", "text-align-center");
    TitleHolder.innerText = secret;
  } else {
    TitleHolder.classList.add("light", "sub-title", "text-align-center");
    TitleHolder.innerText = title;
  }
  let ContentBody = document.createElement("div");
  ContentBody.classList.add(
    "dark",
    "boxing",
    "para",
    "fullWidth",
    "contentCardHeight"
  );
  ContentBody.innerText = content;

  Wrapper.addEventListener("click", (e) => {
    action(index, show);
  });

  Wrapper.appendChild(TitleHolder);
  Wrapper.appendChild(ContentBody);
  return Wrapper;
};

export const PageTitle = (text, theme) => {
  let Wrapper = document.createElement("h1");
  Wrapper.innerText = text;
  if (theme === null) return;

  if (theme === "dark") {
    Wrapper.classList.add("dark", "title", "boxing");
  } else {
    Wrapper.classList.add("light", "title", "boxing");
  }

  return Wrapper;
};

export const InputGenerator = (
  type,
  label,
  placeholder,
  width,
  updateStatus
) => {
  let Wrapper = document.createElement("div");
  Wrapper.classList.add("mr-10", "boxing");
  let LabelWrapper = document.createElement("div");
  LabelWrapper.innerText = label;
  LabelWrapper.style.lineHeight = "50px";

  let element = null;
  if (type === "textArea") {
    element = document.createElement("textarea");
    element.style.height = "150px";
    element.classList.add("textarea");
  } else {
    element = document.createElement("input");
  }

  element.setAttribute("type", type);
  element.setAttribute("placeholder", placeholder);

  //Event handler
  element.addEventListener("keyup", (event) => {
    switch (type) {
      case "text":
        updateStatus({ name: event.target.value });
        break;
      case "password":
        updateStatus({ secret: event.target.value });
        break;
      case "textArea":
        updateStatus({ desc: event.target.value });
        break;
    }

    element.setAttribute("value", event.target.value);
    element.setAttribute("key", type);
    element.value = event.target.value;
  });

  //Append Children

  element.style.width = width;
  //   element.style.height = height;
  Wrapper.appendChild(LabelWrapper);
  Wrapper.appendChild(element);

  return Wrapper;
};

export const ButtonBuilder = (text, theme, action) => {
  let Wrapper = document.createElement("div");
  Wrapper.innerText = text;
  Wrapper.classList.add("btn-" + theme);

  Wrapper.addEventListener("click", () => {
    action();
  });

  return Wrapper;
};
