import React, { Component } from 'react';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editor: null };
    this.props.input.value = null;
  }

  componentDidMount() {
    let editor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      language: 'ko',
      height: '500px',
      toolbarItems: [
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'hr',
        'quote',
        'divider',
        'ul',
        'ol',
        'indent',
        'outdent',
        'link'
        // 'task', 'table', 'image', 'code', 'codeblock'
      ],
      events: {
        change: this.onChange
        // load: '에디터 로딩 이후 트리거'
      }
      // initialValue: '초기값 지정 (non-async)',
    });

    this.setState({ editor });
  }

  componentWillReceiveProps(nextProps) {
    // redux-form이 초기 값으로 전달한 value를 에디터에 set
    // 단, initialize가 async하므로 값이 왔을 때 update
    // (value를 null로 초기화하고 검사하여 최초 1회만 setValue())
    const { value } = nextProps.input;
    this.props.input.value == null &&
      value &&
      this.state.editor.setValue(value);
  }

  onChange = event => {
    // tui-editor API로 현재 값을 가져오고,
    // redux-form에서 내려온 onChange()를 통해 값을 동기화
    const text = this.state.editor.getValue();
    this.props.input.onChange(text);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.detailsField}>
        <div id="editSection" />
      </div>
    );
  }
}

export default TextEditor;
