import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';


class CreateTask extends Component {
    constructor(props){
        super();
        this.state = {
            username:"",
            description:"",
            duration:0,
            date: new Date(),
            users:[]
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users/").then((response)=>{
            if(response.data.length>0){
                this.setState({
                    users: response.data.map((user)=> user.username),
                    username: response.data[0].username
                });
            }
        });
    }

    onChangeUsername(e){
        this.setState({username:e.target.value});
    }
    onChangeDescription(e){
        this.setState({description:e.target.value});
    }
    onChangeDuration(e){
        this.setState({duration:e.target.value});
    }
    onChangeDate(date){
        this.setState({date:date});
    }
    onSubmit(e){
        e.preventDefault();
        const task = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(task);

        axios
            .post("http://localhost:5000/tasks/add",task)
            .then((res)=> console.log(res.data));

            window.location="/"
    }

    render() {
        return (
            <div className="col-*" style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className="card" style={{width:"100%",padding:"20px",margin:"30px"}}>
              <h3>Create New Task</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Username:</label>
                    <select 
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    >
                        {this.state.users.map((user)=>{
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                  </div>
                  <div className="form-group">
                        <label>Description:</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                  </div>
                  <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                  </div>
                  <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                  </div>
                  <div className="form-group">
                        <input
                        type="submit"
                        value="Create Task"
                        className="btn btn-primary"
                        />
                  </div>
              </form>
            </div>
            </div>
        );
    }
}

export default CreateTask;