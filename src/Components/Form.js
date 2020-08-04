import React, { useState } from "react";

const Form = ({saveSearchLyrics}) => {
  const [search, saveSearch] = useState({
    author: "",
    song: "",
  });

  const [error, saveError] = useState(false);

  const { author, song } = search;

  const updateState = (e) => {
    saveSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const searchInfo = (e) => {
    e.preventDefault();

    if (author.trim() === "" || song.trim() === "") {
      saveError(true);
      return;
    }
    saveError(false);
    saveSearchLyrics(search);
  };

  return (
    <div className="bg-primary">
      {error ? (
        <p className="alert alert-danger text-center p-2">
          All the fields are required
        </p>
      ) : null}
      <div className="container">
        <div className="row">
          <form
            onSubmit={searchInfo}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Lyrics search engine</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      placeholder="Author name"
                      onChange={updateState}
                      value={author}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Song</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Song name"
                      onChange={updateState}
                      value={song}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-outline-secondary float-right">
                Search
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
