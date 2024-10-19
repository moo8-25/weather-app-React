import Container from '@mui/material/Container';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';


let time = null
let cancelAxios = null;
export default function Card() {

    const [selectState, setSelectState] = useState("Banha")
    const [result, setResult] = useState({
        city: null,
        temp: null,
        icon: null,
        max: null,
        min: null,
        nameState: ""
    })
    const [apiReaquest, setApiReaquest] = useState({
        lat: 30.45199120,
        lon: 31.17763010
    })

    //=== handlers ===//

    function handleSelect(event) {
        setSelectState(event.target.value)
        if (event.target.value == "Qalyubia") {
            setApiReaquest({
                lat: 30.243404,
                lon: 31.244295
            })
        }
        else if (event.target.value == "hafr") {
            setApiReaquest({
                lat: 28.4,
                lon: 45.9
            })
        }
        else if (event.target.value == "cairo") {
            setApiReaquest({
                lat: 30.033333,
                lon: 31.233334
            })
        }
        else if (event.target.value == "Riyadh") {
            setApiReaquest({
                lat: 24.774265,
                lon: 46.738586
            })
        }
        else if (event.target.value == "NewYork") {
            setApiReaquest({
                lat: 40.730610,
                lon: -73.935242
            })
        }
        else if (event.target.value == "London") {
            setApiReaquest({
                lat: 51.509865,
                lon: -0.118092
            })
        }
        else if (event.target.value == "california") {
            setApiReaquest({
                lat: 36.778259,
                lon: -119.417931
            })
        }
        else if (event.target.value == "paris") {
            setApiReaquest({
                lat: 48.864716,
                lon: 2.349014
            })
        }
        else if (event.target.value == "LiverPool") {
            setApiReaquest({
                lat: 53.400002,
                lon: -2.983333
            })
        }
        else if (event.target.value == "Banha") {
            setApiReaquest({
                lat: 30.45199120,
                lon: 31.17763010
            })
        }
    }

    //======= time =====//
    useEffect(() => {
        time = moment().format("DD / MM / Y");
    }, [])


    //======== api request =======//
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${apiReaquest.lat}&lon=${apiReaquest.lon}&appid=1980ac91dba771fdd71f8934fcec640b`, {
            cancelToken: new axios.CancelToken((c) => {
                cancelAxios = c;
            }),
        })
            .then((response) => {
                const responseTemp = Math.round(
                    response.data.main.temp - 272.15
                );
                const min = Math.round(response.data.main.temp_min - 272.15);
                const max = Math.round(response.data.main.temp_max - 272.15);
                const description = response.data.weather[0].description;
                const responseIcon = response.data.weather[0].icon;
                const responseCity = response.data.name
                setResult({
                    temp: responseTemp,
                    min: min,
                    max: max,
                    nameState: description,
                    icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
                    city: responseCity
                });
            })
            .catch((error) => {
                console.log(error)
            })
        return () => {
            console.log("canceling");
            cancelAxios();
        };
    }, [apiReaquest])


    return (
        <Container maxWidth="sm" style={{ height: "100vh", marginTop: "100px", }} >
            <div style={{ borderRadius: "10px", boxShadow: "black 0px 2px 2px", padding: "5px", display: "flex", justifyContent: "center", alignItems: "center", direction: "ltr", backgroundColor: "rgb(0 61 72)", color: "white" }}>
                {/* card */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    {/* city and time */}
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }} >
                        <h1 style={{ textAlign: "left" }}>{result.city}</h1>
                        <h4>{time} </h4>
                    </div>
                    <hr style={{ width: "100%" }} />
                    {/* =========city and time======= */}

                    {/* weather info */}
                    <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                        {/* weather details */}
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                <h1>{result.temp}</h1>
                                <img src={result.icon} style={{ width: "100px", height: "100px" }} alt='dddd' />
                            </div>
                            <div>
                                <h4>{result.nameState}</h4>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h4>min : {result.min}</h4>
                                    <h4 style={{ margin: "0 15px" }}>|</h4>
                                    <h4>max : {result.max}</h4>
                                </div>
                            </div>
                        </div>
                        {/*====== weather details======== */}
                        {/* logo */}
                        <div style={{ width: "100%" }}>
                            <ThermostatIcon style={{ fontSize: "200px", textAlign: "right" }} />
                        </div>
                        {/*====== logo =======*/}
                    </div>
                    {/* ========weather info===== */}
                </div>
                {/* ===card=== */}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                <select
                    value={selectState}
                    onChange={(event) => {
                        handleSelect(event)
                    }}
                    style={{
                        padding: "7px", marginTop: "20px", backgroundColor: "transparent",
                        color: "white", width: "70%", borderRadius: "10px", borderColor: "rgb(0 61 72)",
                        background: "#00575f"
                    }}>
                    <option value="Banha">Banha</option>
                    <option value="cairo">Cairo</option>
                    <option value="Qalyubia">AL-Qalyubia</option>
                    <option value="Riyadh">Riyadh</option>
                    <option value="hafr">Hafr Albatin</option>
                    <option value="London">London</option>
                    <option value="LiverPool">LiverPool</option>
                    <option value="NewYork">NewYork</option>
                    <option value="california">California</option>
                    <option value="paris">Paris</option>
                </select>
            </div>
        </Container>
    )
}

