import * as types from "../constants/meme.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const getMemes = (pageNum = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: types.GET_MEMES_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`/memes?page=${pageNum}&limit=${limit}`);
    dispatch({ type: types.GET_MEMES_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_MEMES_FAILURE, payload: null });
  }
};

const createMeme = (image) => async (dispatch) => {
  dispatch({ type: types.CREATE_MEME_REQUEST, payload: null });
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post(`/memes`, formData);
    dispatch({ type: types.CREATE_MEME_SUCCESS, payload: res.data.data });
    toast.success("You can work on your meme now!");
  } catch (error) {
    dispatch({ type: types.CREATE_MEME_FAILURE, payload: null });
  }
};

const updateMeme = (texts, memeId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_MEME_REQUEST, payload: null });
  try {
    const res = await api.put(`/memes/${memeId}`, { texts });
    dispatch({ type: types.UPDATE_MEME_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_MEME_FAILURE, payload: null });
  }
};

const setSelectedMeme = (meme) => ({
  type: types.SET_SELECTED_MEME,
  payload: meme,
});

export const memeActions = {
  getMemes,
  createMeme,
  updateMeme,
  setSelectedMeme,
};
