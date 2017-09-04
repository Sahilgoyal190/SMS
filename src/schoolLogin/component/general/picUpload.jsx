import React, { Component } from 'react';
import firebase from 'firebase';
import default_images from '../../constant/default_images.jsx'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // const file = e.target.files[0];
    const iconFile = this.state.file;
    // const iconFile = this.refs.imgFile;

    this.uploadFile(iconFile, result => {

      if (result.progress) {
        // Handle progress
        return;
      }

      if (result.downloadURL) {
        firebase.database().ref('/users/'+this.props.userData.uid).update({
          imageUrl: result.downloadURL
        })
        this.setState({ result: result.downloadURL });
        return;
      }

      if (result.error) {
        // Handle error
      }
    });
  }

  handleIconFile = (e) => {

  }

  uploadFile = (iconFile, callback) => {

    const fileName = iconFile.name
    const storageRef = firebase.storage().ref()
    const uploadTask = storageRef.child('/icon/' + fileName).put(iconFile)

    uploadTask.on('state_changed', snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      callback({ progress });
    }, error => {
      callback({ error });
    }, () => {
      var downloadURL = uploadTask.snapshot.downloadURL;
      callback({ downloadURL });
    });
  }


  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    imagePreviewUrl = imagePreviewUrl ? imagePreviewUrl : this.props.userData.imageUrl ?  this.props.userData.imageUrl : default_images.dummy_male
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img img-thumbnail pull-right" src={imagePreviewUrl} />);
    }

    return (
      <div className="previewComponent">
        <div className="row">
          <div className="col-md-6 text-center parent">
            <form className="verticle-center" onSubmit={(e) => this._handleSubmit(e)}>
              <input className="fileInput"
                type="file"
                ref="imgFile"
                onChange={(e) => this._handleImageChange(e)} />
              <button className="btn btn-primary btn"
                type="submit"
                onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
            </form>
          </div>
          <div className="col-md-6">
            <div className=" imgPreview">
              {$imagePreview}
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default ImageUpload;