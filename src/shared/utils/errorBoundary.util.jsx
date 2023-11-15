import { logger } from "@mv-d/toolbelt";
import { nanoid } from "nanoid";
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
      errorMessage: "",
      errorName: "",
      details: props.details,
      componentId: props.componentId,
      traceId: props.traceId ?? nanoid(),
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorMessage: error.message.split("\n")[0],
      errorName: error.name,
      errorInfo: errorInfo,
    });
  }

  buildReport() {
    const { errorMessage, errorInfo, componentId, traceId, details } = this.state;

    return {
      message: errorMessage,
      stack: errorInfo?.componentStack ?? errorInfo,
      componentId,
      traceId,
      details,
    };
  }

  render() {
    if (this.state.errorInfo) {
      logger.error({ message: JSON.stringify(this.buildReport()) });
      return null;
    }

    return this.props.children;
  }
}
