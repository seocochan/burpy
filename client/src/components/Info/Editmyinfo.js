import React, { Component } from 'react';
import axios from 'axios';
import InfoField from './InfoField';
import {reduxForm,Field,initialize} from 'redux-form';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router';
import SelectField from './SelectField';
import Select from 'material-ui';
import DateField from './DateField';
import momentLocaliser from 'react-widgets-moment'
import moment from 'moment';
import configure from 'react-widgets/lib/configure'

moment.locale('en')
momentLocaliser()
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
            const { name,gender,birthday } = res.data;
            this.UserId = res.data._id;
            this.props.initialize({name,gender});
        });
    }

    renderMyinfo(){
        return (
            <div>
                <div>
            <Field
              key="name"
              component={InfoField}
              type="text"
              label="이름"
              name="name"
            />
                </div>
                <div>
            <label>성별</label>
            <Field
            key="gender"
            component={SelectField}
            name="gender"
            data={['male','female']}
            />
                </div>
                <div>
            <label>생일</label>
            <Field
              key="birthday"
              component={DateField}
              showTime = {true}
              name="birthday"
            />
                </div>
          </div>
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