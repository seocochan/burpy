import React, { Component } from 'react';
import axios from 'axios';
import Icon from 'material-ui/Icon';
import { Redirect } from 'react-router';
import {IconButton} from 'material-ui';
import {Link} from 'react-router-dom';
import { Edit } from "material-ui-icons";


class Myinfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            Info : {}
        }
    }

    componentDidMount(){
        axios.get('/api/myinfo').then(res=>{
            this.setState({Info : res.data})
        });
    }

    renderNameButton(){
        return(
              <IconButton aria-label="Edit">
                <Link to={`/edit/name/${this.state.Info._id}`}>
                  <Edit />
                </Link>
              </IconButton>
        )
      }
      renderGenderButton(){
          return(
            <IconButton aria-label="Edit">
            <Link to={`/edit/gender/${this.state.Info._id}`}>
              <Edit />
            </Link>
          </IconButton>
          )
      }
      renderBirthdayButton(){
        return(
            <IconButton aria-label="Edit">
            <Link to={`/edit/Birthday/${this.state.Info._id}`}>
              <Edit />
            </Link>
          </IconButton>
          )
      }
    render(){
        return(
            <div>
                <li>이름 : {this.state.Info.name} {this.renderNameButton()}</li>
                <li>성별 : {this.state.Info.gender==null ? '추가로 입력하세요.' : this.state.Info.gender} {this.renderGenderButton()}</li>
                <li>생일 : {this.state.Info.birthday==null ? '추가로 입력하세요.' : this.state.Info.birthday} {this.renderBirthdayButton()}</li>

            </div>

        )

    }
}

  
  export default Myinfo