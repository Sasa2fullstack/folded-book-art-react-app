import React from 'react';

const base64Img = window.require('base64-img');

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path || this.props.size !== prevProps.size || this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.updateImage();
    }
  }

  updateImage = () => {
    const { path, width, height, size, alt } = this.props;
    let h; let
      w;
    if (width / height > 1) {
      w = size;
      h = (height * size * 1.0) / (width * 1.0);
    } else {
      w = (width * size * 1.0) / (height * 1.0);
      h = size;
    }
    const dx = (size - w) / 2;
    const dy = (size - h) / 2;

    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    const img = new Image();

    img.onload = function() {
      ctx.drawImage(this, dx, dy, w, h);
    };

    img.src = base64Img.base64Sync(path);
  };

  render() {
    const { path, width, height, size, alt } = this.props;

    // return <img src={imgData} width={w} height={h} alt={alt} style={{ margin: 'auto' }} />;
    return <canvas ref="canvas" width={size} height={size} className="canvas-image" style={{ margin: 'auto' }} />;
  }
}

export default ImageViewer;
