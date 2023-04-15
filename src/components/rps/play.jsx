import React, {useState} from "react";
import {toast} from "react-toastify";
import Loader from "../utils/Loader";
import {NotificationError, NotificationSuccess} from "../utils/Notifications";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import {play,p1wins,p2wins,draws,reveal} from "../../utils/rpsgame";
import { NavLink} from 'react-router-dom';

const Playreveal = ({address, fetchBalance}) => {
    const [move, setmove] = useState("");
    const [loading, setLoading] = useState(false);

    if (loading) {
	    return <Loader/>;
	}

    return (
        <>
         <div className="textboxes" style={{ display:"flex" , justifycontent:"center", alignitem:"center" ,margin: "0 auto", width: "12%"}}>
                <TextBoxComponent  placeholder="Enter Move" floatLabelType="Auto" onChange={(e) => {
                                    setmove(e.target.value)
                                }}/>
            </div>
            <div style={{ display:"flex" , justifycontent:"center", alignitem:"center"}}>
            <Button 
                    onClick={() => {
                        let data = {move}
                        play(address, data)
                        .then(() => {
                            toast(<NotificationSuccess text="Play was sucessfull."/>);
                            fetchBalance(address);
                        })
                        .catch(error => {
                            console.log(error);
                            toast(<NotificationError text="Making play was unsucessfull."/>);
                            setLoading(false);
                        })
                       
                    }}
                    color='blue'
                    className="rounded-pill px-0"
                    style={{ margin: "10px auto", width: "10%"}}>
                        play
            </Button>
            </div>
            
            
            <div style={{ display:"flex" , justifycontent:"center", alignitem:"center"}}>
            <Button 
                    onClick={() => {
                        reveal(address)
                            .then(() => {
                                toast(<NotificationSuccess text=" Reavel successful"/>);
                                fetchBalance(address);
                            })
                            .catch(error => {
                                console.log(error);
                                toast(<NotificationError text="Error occured."/>);
                                setLoading(false);
                            })
                        
                    }}
                    color='blue'
                    className="rounded-pill px-0"
                    style={{ margin: "10px auto", width: "10%"}}>
                        Reveal winner
            </Button>
            </div>
            <NavLink to='/'>
            <div style={{ display:"flex" , justifycontent:"center", alignitem:"center"}}>
            <Button 
                    color='blue'
                    className="rounded-pill px-0"
                    style={{ margin: "10px auto", width: "10%"}}>
                        Restart
            </Button>
            </div>
            </NavLink>

        <h3>Player1_count:{p1wins}</h3>
        <h3>Player2_count:{p2wins}</h3>
        <h3>Draw_count:{draws}</h3>
            
        </>    
    );
};

Playreveal.propTypes = {
    address: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
};

export default Playreveal;