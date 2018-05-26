import React, { Component } from 'react';
import axios from 'axios';
import InfoField from './InfoField';
import {reduxForm,Field,initialize} from 'redux-form';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router';
import TextField from 'material-ui';


class Myinfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDone : false
        }
        this.UserId = '';
    }

    componentDidMount(){
        axios.get('/api/myinfo').then(res=>{
            const { birthday } = res.data;
            this.UserId = res.data._id;
            this.props.initialize({birthday});
        });
    }
    renderMyinfo(){
        return (
            <Field
              key="birthday"
              component={InfoField}
              type="text"
              label="생일"
              name="birthday"
            />
          );
    }

    async onSubmit(values) {
        const res = await axios.put(`/api/myinfo/${this.UserId}`, values);
        this.setState({ isDone: true });
    }

    render(){
        return(
            <div>
            내정보 수정
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              {this.renderMyinfo()}
              <Button variant="raised" color="primary" type="submit">
                완료
                <Icon>send</Icon>
              </Button>
              {this.state.isDone && <Redirect to={'/myinfo'} />}
            </form>
          </div>
        )

    }
}


function validate(values) {
    const errors = {};
    // TODO: 여기에 validation 구현
  
    return errors;
  }
  
  export default reduxForm({
    validate,
    form: 'infoform',
    destroyOnUnmount: true
  })(Myinfo);