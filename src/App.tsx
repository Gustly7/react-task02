import * as React from "react";
import { Hello } from "./Hello";
import { Goodbye } from "./Goodbye";

export class App extends React.PureComponent {
  public render() {
    return (
      <main>
        <Hello greeting="Hi" />
        <Goodbye />
      </main>
    );
  }
}
