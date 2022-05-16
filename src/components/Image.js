import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import html2canvas from 'html2canvas';
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

import 'react-image-crop/dist/ReactCrop.css';

import { useContextMenu } from "./Contextmenu";
import { useEffect, useRef, useState } from "react";

export const Image = (props) => {
  const [canva, setCanva] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [image, setImage] = useState(null);
  // const [completedCrop, setCompletedCrop] = useState();
  // const [scale, setScale] = useState(1);
  // const [rotate, setRotate] = useState(0);
  // const [aspect, setAspect] = useState(16 / 9);
  const [result, setResult] = useState(null);

  useContextMenu();

  const hideModal = () => {
    props.isOpen(false);
  };

  // html2canvas(document.querySelector('.react-flow')).then(canvas => {
  //   // html2canvas(document.querySelector('.asa')).then(canvas => {
  //   setCanva(canvas);

  // });

  const onInit = () => {
    setTimeout(async () => {
      const canvas = await html2canvas(document.querySelector('.react-flow'), {
        scale: 5,
      });
      // const base64image = canvas.toDataURL('image/png');
      setCanva(canvas.toDataURL('image/png'));
      console.log(123);
      // let dn = document.createElement("a");

      // // dn.href = `data:image/png,${canvas.toDataURL('image/png')}`
      // // dn.href = `data:${canvas.toDataURL('image/png')}`
      // dn.href = canvas.toDataURL('image/png')
      // dn.download = `png ${Date.now()}`;
      // dn.click();
    }, 100);
  }

  const handleDownload = async () => {
    // const canvas = await html2canvas(document.querySelector('.react-flow'));
    // console.log(canvas.toDataURL('image/png'));
    let canvas2 = await html2canvas(document.querySelector('.react-flow'), {
      scale: 5,
    });
    let dn = document.createElement("a");

    // dn.href = `data:image/png,${canvas.toDataURL('image/png')}`
    // dn.href = `data:${canvas.toDataURL('image/png')}`
    dn.href = canvas2.toDataURL('image/png')
      dn.download = `png ${Date.now()}`;
      dn.click();
  };

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = 1;
      const scaleY = 1;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/png", 1);
      setResult(base64Image);
      console.log(result);
    } catch (e) {
      console.log("crop the image", e);
    }
  };

  useEffect(() => {
    if (props.open) {
      onInit();
    }
  }, [props.open]);

  return (
    <Modal
      show={props.open}
      onHide={hideModal}
      size="lg"
    >
      <ModalBody>
        <div>
          <div style={{ height: '90%', width: '90%' }}>
            <ReactCrop
              onComplete={(crop, pixelCrop) => { setImage(crop) }}
              crop={crop}
              onChange={c => setCrop(c)}
              onImageLoaded={setImage}
            // onChange={(_, percentCrop) => setCrop(percentCrop)}
            >
              {/* <img src={src} /> */}
              <img src={canva} alt="" height={"60%"} />
            </ReactCrop>
          </div>
          <button type="button" className="btn btn-secondary" id="copyText" onClick={handleDownload}>Download</button>
        </div>
      </ModalBody>
    </Modal>
  )
};

// export default Menu;