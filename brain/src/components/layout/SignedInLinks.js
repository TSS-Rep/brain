import M from "materialize-css";

let elems = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
