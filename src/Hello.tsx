import * as React from "react";

interface HelloProps {
  greeting: string;
}

export class Hello extends React.PureComponent<HelloProps> {
  public render() {
    return <h1>{this.props.greeting}</h1>;
  }
}
