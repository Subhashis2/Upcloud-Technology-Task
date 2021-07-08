import React from 'react';
import classes from '../styles/MainDiv.module.css';
import utilClasses from '../styles/Utils.module.css';
import ShowDataEntries from './ShowData';
import FormValition from './FormValidation';

export default class MainDiv extends React.Component {
    state = {
        addData: true
    }
    render() {
        return (
            <div className={[utilClasses.container, utilClasses.flex, utilClasses.justifyCenter, utilClasses.itemCenter].join(" ")}>
                <div className={[classes.upperBtnDiv, utilClasses.flex, utilClasses.itemCenter, utilClasses.justifyCenter].join(" ")}>
                    <button onClick={() => this.setState({ addData: true })}
                        style={{
                            color: this.state.addData ? "var(--primary)" :
                                "var(--danger)", backgroundColor: this.state.addData ?
                                    "var(--secondary)" : "var(--primary)"
                        }}
                        className={[utilClasses.btn, classes.addBtn].join(" ")}>Add Data</button>
                    <button onClick={() => this.setState({ addData: false })}
                        style={{
                            color: this.state.addData ? "var(--danger)" :
                                "var(--primary)", backgroundColor: this.state.addData ?
                                    "var(--primary)" : "var(--secondary)"
                        }}
                        className={[utilClasses.btn, classes.showBtn].join(" ")}>Show Data</button>
                </div>

                {this.state.addData ?
                    (<FormValition />) :
                    (<div className={[classes.showDataSection, utilClasses.flex, utilClasses.itemCenter].join(" ")}>
                        <div className={[utilClasses.colFlex].join(" ")}>
                            <p>
                                <span>Gouri Kannukar</span>
                                <span>0987654321</span>
                            </p>
                            <p>gourikannukar@gmail.com</p>
                            <p>7, Jeevraj Bhanji Shah Amrket, Y M Rd, Nr Masjid Rly Stn, Masjid Bunder (west)</p>
                        </div>
                        <div className={[utilClasses.colFlex].join(" ")}>
                            <p>
                                <span>Gouri Kannukar</span>
                                <span>0987654321</span>
                            </p>
                            <p>gourikannukar@gmail.com</p>
                            <p>7, Jeevraj Bhanji Shah Amrket, Y M Rd, Nr Masjid Rly Stn, Masjid Bunder (west)</p>
                        </div>
                        <ShowDataEntries />
                    </div>)
                }
            </div>
        )
    }
}
