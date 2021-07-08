import React from 'react';
import utilClasses from '../styles/Utils.module.css';
import classes from '../styles/MainDiv.module.css';

const validateName = (name) => {
    if (name === "")
        return null
    let sFormat = new RegExp(/[`!@#$%^&*()_+/\-=[\]{};':"\\|,.<>?~]/);
    let numFormat = new RegExp(/\d/);
    if (name.length < 3)
        return "*name should have minimum 3 characters"
    else if (name.length > 30)
        return "*name should have maximum 30 characters"
    else if (typeof (name) === 'number')
        return "*name should be string only"
    else if (sFormat.test(name))
        return "*name should not contain special characters [*,"
    else if (numFormat.test(name))
        return "*name should not contain numbers"
    else
        return null
}

const validateEmail = (email) => {
    if (email === "")
        return null
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email))
        return "*invalid email format"
    else
        return null
}

const validateContact = (contact) => {
    if (contact === "")
        return null
    let aFormat = new RegExp(/.*[a-zA-Z]+.*/);
    let sFormat = new RegExp(/[ `!@#$%^&*()_+/\-=[\]{};':"\\|,.<>?~]/);
    if (!aFormat.test(contact) && !sFormat.test(contact))
        if (contact.length === 10)
            if (Math.sign(contact) === 1)
                return null
            else
                return "*contact number should be positive"
        else
            return "*contact number should have 10 digits"
    else
        return "*contact number should be integer"
}

const validateAddress = (address) => {
    if (address === "")
        return null
    let sFormat = new RegExp(/[`!@#$%^&*()_+=[\]{}'"\\|.<>?~]/);
    if (!sFormat.test(address))
        return null
    else
        return "*address should not contain special characters .[*$"
}

export default class FormValition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", email: "", contact: "", address: "",
            errors: { nameError: "", emailError: "", contactError: "", addressError: "" }
        };
    }
    handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'name': errors.nameError = validateName(value); break;
            case 'email': errors.emailError = validateEmail(value); break;
            case 'contact': errors.contactError = validateContact(value); break;
            case 'address': errors.addressError = validateAddress(value); break;
            default: break;
        }
        this.setState({ errors, [name]: value });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.errors["nameError"] === null && this.state.errors["emailError"] === null && this.state.errors["contactError"] === null && this.state.errors["addressError"] === null) {
            let data = {
                "name": this.state.name,
                "email": this.state.email,
                "contact": this.state.contact,
                "address": this.state.address
            }
            // console.log(data);
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            await fetch('https://dry-bayou-99944.herokuapp.com/profiles', requestOptions)
                .then(async response => response.json())
                .then(data => console.log(data));
        }
    };
    render() {
        const inputDataItems = [["Name", "name", "text", "nameError"], ["Email", "email", "email", "emailError"], ["Contact", "contact", "tel", "contactError"], ["Address", "address", "text", "addressError"]];
        return (
            <form onSubmit={this.handleSubmit} className={[classes.inputSection, utilClasses.flex, utilClasses.itemCenter].join(" ")}>
                {inputDataItems.map((item, pos) => {
                    return (
                        <div key={pos} className={[utilClasses.rowFlex, utilClasses.itemCenter, utilClasses.justifyCenter].join(" ")}>
                            <label>{item[0]}</label>
                            <div>
                                <input name={item[1]} type={item[2]} autoComplete="off" onChange={this.handleChange} required />
                                <div>{this.state.errors[item[3]]}</div>
                            </div>
                        </div>
                    )
                })}
                <button type="submit" className={[utilClasses.btn, classes.saveBtn].join(" ")}>Save Data</button>
            </form>
        )
    }
}