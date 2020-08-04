import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Form from "./Components/Form";
import Song from "./Components/Song";
import Info from "./Components/Info";


function App() {
  const [searchLyrics, saveSearchLyrics] = useState({});
  const [lyrics, saveLyrics] = useState("");
  const [info, saveInfo] = useState({});

  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;

    const api = async () => {
      const { author, song } = searchLyrics;
      const url = `https://api.lyrics.ovh/v1/${author}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${author}`;

      const [lyrics, information] = await Promise.all([
        axios(url),
        axios(url2),
      ]);

      saveLyrics(lyrics.data.lyrics);
      saveInfo(information.data.artists[0]);
    };
    api();
  }, [searchLyrics, info]);

  return (
    <Fragment className="bg-primary">
      <Form saveSearchLyrics={saveSearchLyrics} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Song lyrics={lyrics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
