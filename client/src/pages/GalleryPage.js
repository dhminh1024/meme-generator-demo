import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PaginationBar from "../components/PaginationBar";
import { memeActions } from "../redux/actions/meme.actions";
import { ClipLoader } from "react-spinners";

const GalleryPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.meme.totalPages);
  const loading = useSelector((state) => state.meme.loading);
  const memes = useSelector((state) => state.meme.memes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memeActions.getMemes(pageNum, 1));
  }, [dispatch, pageNum]);

  return (
    <Container>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="red" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap">
              {memes.map((meme) => (
                <li>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_API}/${meme.imageUrl}`}
                    alt="meme img"
                    width="200px"
                  />
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryPage;
