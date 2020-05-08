import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Header, Input } from "react";
import "./Home.css";
// import { getAPI } from "./_actions/getAPI";
// import { connect } from "react-redux";

function Home() {
  const [userInput, SetUserInput] = useState("");
  const [name, SetCountry_Region] = useState("");
  const [positif, SetConfirmed] = useState("");
  const [meninggal, SetDeaths] = useState("");
  const [sembuh, SetRecovered] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.kawalcorona.com/indonesia/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
      });
  }, []);
  //covid19.mathdro.id/api/countries/indonesia

  const handleSearch = (e) => {
    SetUserInput(e.target.value);
  };

  const setData = ({ name, positif, meninggal, sembuh }) => {
    SetCountry_Region(name);
    SetConfirmed(positif);
    SetDeaths(meninggal);
    SetRecovered(sembuh);
  };

  const handleSubmit = () => {
    fetch(`https://api.kawalcorona.com/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
        }
      });
  };
  return (
    <div>
      <header className="HeaderHome">
        <div className="kiri">
          <img className="Logo" src={require("./img/lawancorona.jpg")} />
        </div>
        <marquee className="marquee">
          <p>STOP Mudik!! Cintai Keluarga Anda dengan #dirumahaja</p>
        </marquee>
      </header>
      {/* body */}
      <div className="body">
        <div className="banner">
          <img className="banner" src={require("./img/bannercovid.jpg")} />
        </div>
        <div className="pembungkus-search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Masukan Negara"
            className="search"
            onChange={handleSearch}
          />
          <img
            className="searchlogo"
            onChange={handleSearch}
            src={require("./img/searchlogo.jpg")}
          />
        </div>
        <div className="negara">
          <p>Negara : </p>
          <p>{name}</p>
        </div>
        <div className="kasus">
          <div className="Meninggal">
            <p>Meninggal : </p>
            <p>{meninggal}</p>
          </div>
          <div className="Sembuh">
            <p>Sembuh : </p>
            <p>{sembuh}</p>
          </div>
          <div className="Positif">
            <p>Positif : </p>
            <p>{positif}</p>
          </div>
        </div>
        {/* <div className="kasus">
          <div className="Sembuh">
            <p>Sembuh:</p>
            <p>250</p>
          </div>
          <div className="Meninggal">
            <p>Meninggal:</p>
            <p>250</p>
          </div>
        </div> */}
        <div className="Provinsi">
          <p>Provinsi</p>
        </div>
      </div>
      {/* end body */}
    </div>
  );
}

export default Home;
