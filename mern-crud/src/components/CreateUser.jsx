import axios from 'axios';
import React, { Component } from 'react';


class CreateUser extends Component {

    constructor(props){
        super();
        this.state = {
            username:""
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e){
        this.setState({username:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username : this.state.username
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
            .then((res)=>console.log(res.data));

        this.setState({
            username:""
        });

        window.location = "/create";
    }


    render() {
        return (
            <div className="col-*" style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className="card" style={{width:'100%',padding:'20px',margin:'30px'}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default CreateUser;