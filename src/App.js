import { Component } from "react";
import imagesApi from "./services/imagesApi";

import Searchbar from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchQuery: "",
    page: 1,
    error: null,
    showModal: false,
    originalImageUrl: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    imagesApi
      .fetchImages(searchQuery, page)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  handleSubmitForm = (query) => {
    this.setState({ images: [], searchQuery: query, page: 1 });
  };

  // toggleModal = () => {
  //   this.setState((state) => ({
  //     showModal: !state.showModal,
  //   }));
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  //};
  handleClickImage = (largeImageURL) => {
    this.openModal(largeImageURL);
  };

  openModal = (largeImageURL) =>
    this.setState({ showModal: true, originalImageUrl: largeImageURL });

  closeModal = () => this.setState({ showModal: false, originalImageUrl: "" });

  render() {
    const { images, isLoading, showModal, originalImageUrl } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery images={images} onImageClick={this.handleClickImage} />
        {showModal && (
          <Modal largeImageURL={originalImageUrl} onClose={this.closeModal} />
        )}
        <div className="container">
          {isLoading && (
            <Loader
              type="Hearts"
              color="#3f51b5"
              height={80}
              width={80}
              timeout={3000}
            />
          )}
          {images.length > 0 && !isLoading && (
            <Button onClick={this.fetchImages} />
          )}
        </div>
      </>
    );
  }
}

export default App;
