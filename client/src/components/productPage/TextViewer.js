import React, { Component } from 'react';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import 'tui-editor/dist/tui-editor-contents.css';

class TextViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { viewer: null };
  }

  componentDidMount() {
    let viewer = new Viewer({
      el: document.querySelector('#viewSection'),
      initialValue: this.props.value,
      height: 'auto'
    });

    this.setState({ viewer });
  }

  render() {
    return (
      <div style={{ margin: 'auto' }}>
        <div id="viewSection" />
      </div>
    );
  }
}

export default TextViewer;
