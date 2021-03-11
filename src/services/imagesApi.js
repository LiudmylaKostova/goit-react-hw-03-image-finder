import axios from "axios";

const fetchImages = (searchQuery, page = 1) => {
  const APIKey = "19847070-2f6934a26cdc244bf33deaec0";
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${APIKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((res) => res.data.hits);
};

export default { fetchImages };
