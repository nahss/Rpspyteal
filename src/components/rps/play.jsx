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
                    onClick={async () => {
                        try {
                            let data = {move}
                            await play(address, data)
                            toast(<NotificationSuccess text="Play was sucessfull."/>);
                            await fetchBalance(address);
                        } catch (error) {
                            console.log(error);
                            toast(<NotificationError text="Making play was unsucessfull."/>);
                          
                        }finally {
                            setLoading(false);
                        }
                       
                    }}
                    color='blue'
                    className="rounded-pill px-0"
                    style={{ margin: "10px auto", width: "10%"}}>
                        play
            </Button>
            </div>
            
            
            <div style={{ display:"flex" , justifycontent:"center", alignitem:"center"}}>
            <Button 
                    onClick={async () => {
                      try {
                        await reveal(address)
                    
                        toast(<NotificationSuccess text=" Reavel successful"/>);
                        await fetchBalance(address); 
                      } catch (error) {
                        console.log(error);
                        toast(<NotificationError text="Error occured."/>);
              
                      } finally {
                        setLoading(false);
                    }
                        
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


        <h4>Game rules</h4>
        <p>1 Both players can register play in no certain order i.e regardless of player status</p>
        <p>2 Player 2 must click the reveal winner button first, then player 1 clicks in that order</p>
        <p>3 Both players can click the Restart button after 3 rounds of play in no certain order</p>



        <h5>Player1_count:{p1wins}</h5>     
        <h5>Player2_count:{p2wins}</h5>
        <h5>Draw_count:{draws}</h5>
            
        </>    
    );
};

Playreveal.propTypes = {
    address: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired,
};

export default Playreveal;