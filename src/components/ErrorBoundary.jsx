import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 12px",
            background: "#212121",
            color: "#fff",
          }}
        >
          <p>Something went wrong! ! !</p>
          <p>
            Click{" "}
            <a
              style={{
                fontWeight: "600",
                color: "blue",
                textDecoration: "underline",
              }}
              href="/"
            >
              Here
            </a>{" "}
            to go back home
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
