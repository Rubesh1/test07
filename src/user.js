import React, { Component } from "react";
import axios from 'axios';

class User extends React.Component{
    constructor(){
     super();
     this.state = {
         user: [],
         name:'',
         age:'',
         email:'',
     };
    }
    

    async componentDidMount() {
     var response = await axios.get (
      'https://625e5610873d6798e2a56511.mockapi.io/users/userDetails'
     );
     await this.setState({user: response.data});
 
    }

   render(){
       const handleSubmit = async (e) => {
           e.perventDefault();
           var response = await axios.post(
               'https://625e5610873d6798e2a56511.mockapi.io/users/userDetails',
               {
                   name: this.state.name,
                   age: this.state.age,
                   email: this.state.email,
               }
           );
           var user = [...this.state.user];
           user.push(response.data);
           this.setState({user,name:'', age:'', email:''});
       }
       return (
           <>  
                <h3> Curd Application </h3>
                <h3>Use Form</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <lable> Name </lable>
                        <input type='text' value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}></input>
                    </div><br/>
                    <div>
                        <lable> Age </lable>
                        <input type='text' value={this.state.age} onChange={(e)=>this.setState({age:e.target.value})}></input>
                    </div><br/>
                    <div>
                        <lable>Email : </lable>
                        <input type='text' value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}></input>
                    </div><br/>
                    <button type="submit">Submit</button> &nbsp;
                    <button type="reset">Reset</button><br/><br/>
                </form>
                <table border={1}>
                    <thead>
                        <tr>
                            <td> Id </td>
                            <td> Name </td>
                            <td> Age </td>
                            <td> Email </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.map((row) => (
                            <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

           </>
       )
   }
}
export default User;
