import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

export function ImageGalleryItem({
  src,
  id,
  alt,
  srcOriginal,
  getLargeImageURL,
}) {
  const handleClick = (evt) => getLargeImageURL(evt.target.dataset.source);

  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={src}
        alt={alt}
        data-source={srcOriginal}
        data-id={id}
        className={styles.imageGalleryItemImage}
        onClick={handleClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  srcOriginal: PropTypes.string.isRequired,
  id: PropTypes.number,
  getLargeImageURL: PropTypes.func.isRequired,
};
