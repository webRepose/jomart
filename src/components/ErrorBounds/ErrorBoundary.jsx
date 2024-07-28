import { Component } from "react";
import Error from "./Error";

// компоннт с логикой при отлове ошибки классовый компонент

export default class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}
