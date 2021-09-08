import Image from '../models/Image';

interface imagesView {
  id: number;
  url: string;
}
export default {
  render(image: Image): imagesView {
    return {
      id: image.id,
      url: `http:localhost:3334/upload/${image.path}`, // http://192.168.1.10:3333/
    };
  },
  renderMany(images: Image[]): imagesView[] {
    return images.map(image => this.render(image));
  },
};
