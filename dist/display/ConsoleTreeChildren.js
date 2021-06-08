import { DepthFirstSearchRecursiveNested } from "./DepthFirstSearchRecursiveNested";
function GetInfo(entry) {
  const legend = entry.numChildren > 0 ? "Parent" : "Child";
  return `${legend} [ type=${typeof entry}, name=${entry.name} ]`;
}
function LogChildren(entry) {
  console.group(GetInfo(entry.node));
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      LogChildren(child);
    } else {
      console.log(GetInfo(child.node));
    }
  });
  console.groupEnd();
}
export function ConsoleTreeChildren(parent) {
  const entries = DepthFirstSearchRecursiveNested(parent);
  if (parent.world === parent) {
    console.group("World");
  } else {
    console.group(GetInfo(parent));
  }
  entries.forEach((entry) => {
    if (entry.children.length) {
      LogChildren(entry);
    } else {
      console.log(GetInfo(entry.node));
    }
  });
  console.groupEnd();
}
