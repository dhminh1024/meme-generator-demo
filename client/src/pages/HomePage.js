import React, { useRef, useEffect } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";

const HomePage = () => {
  const inputFile = useRef(null);
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const dispatch = useDispatch();

  const handleImportImage = () => {
    const file = inputFile.current.files[0];
    const meme = {
      uploadedImage: file,
      localImageUrl: window.URL.createObjectURL(file),
    };
    dispatch(memeActions.setSelectedMeme(meme));
  };
  const handleSubmitImage = () => {
    // console.log(inputFile.current.files[0]);
    dispatch(memeActions.createMeme(selectedMeme.uploadedImage));
  };

  const handleCancel = () => {
    dispatch(memeActions.setSelectedMeme(null));
  };

  useEffect(() => {
    dispatch(memeActions.getMemes());
  }, [dispatch]);
  return (
    <Container className="fill d-flex justify-content-center align-items-center">
      {selectedMeme ? (
        <>
          <div
            className="content-overlay"
            style={{ backgroundImage: `url(${selectedMeme.localImageUrl})` }}
          />
          {selectedMeme.id ? (
            <div className="main-meme">
              <img src={selectedMeme.localImageUrl} alt="selected meme" />
              <Button variant="light" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="main-meme">
              <img src={selectedMeme.localImageUrl} alt="selected meme" />
              <ButtonGroup className="d-flex m-3">
                <Button onClick={handleSubmitImage}>Take this Image</Button>
                <Button variant="light" onClick={handleCancel}>
                  Cancel
                </Button>
              </ButtonGroup>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <label>
            Please select a meme in the gallery <br />
            <input
              ref={inputFile}
              type="file"
              accept="image/png, image/jpeg"
              className="import-image-label-input"
              onChange={handleImportImage}
            />
            or <span className="import-image-label-text">upload an image</span>
          </label>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
