import axios from "axios";
import { useState } from "react";
import "../styles/Home.css";
import logo from '../assets/logo.png'

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  console.log(searchText);

  const handleSearchButton = async () => {
    try{await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`)
      .then((response) => {
        const res = response.data;
        setData(res);
        console.log("data", data[0]);
      })
      .then((error) => {
        console.log("Error!!!", error);
        // setData([])
      });
    }catch(error){
        console.log("errorrr")
        setData([])
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    handleSearchButton()
    console.log("handleSubmit")
  }

  return (
    <div className="container">
      <div className="title">
        <img src={logo} alt="logo"/>
      </div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search word..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearchButton}>Search</button>
      </form>


      {data && data[0]?.meanings?.length>0?(
        <div className="word-card">
            <div>{data[0]?.word}</div>
            {data[0]?.phonetic ? (

                <div>{data[0]?.phonetic}</div>
                ): null}
        </div>
      ):<div style={{paddingTop:"2rem"}}>No words found</div>}

      {data ? (
        <div className="cards">
          {data[0]?.meanings.map((meaning, index) => {
            return (
              <div key={index} className="single-card">
                <div className="speech">{meaning.partOfSpeech}</div>
                <div>
                  {meaning.definitions.slice(0,5).map((def, index) => {
                    return (
                      <div key={index} className="def">
                        <div>●{" "}{def.definition}</div>
                        {/* <hr/> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
