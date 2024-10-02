import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Image from "next/image";
import { KTIcon } from "@/_metronic/helpers";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";

const ProfileShare = ({ data }: { data: any }) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-auto p-3 border border-2 share_profile"
      >
        Share <KTIcon iconName="send" iconType="duotone" className="fs-2" />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <label htmlFor="title" className="fw-bold mb-5">
              Share your profile via
            </label>
            <div className="d-flex justify-content-center align-items-center gap-5 mt-2">
              {data?.Facebook && (
                <div style={{ cursor: "pointer" }}>
                  <Link href={data.Facebook}>
                    <Image
                      src={"/media/svg/facebook-4.svg"}
                      alt="Facebook"
                      width={35}
                      height={35}
                      id="tooltipFacebook"
                    />
                  </Link>
                </div>
              )}
              {data?.twitter && (
                <div style={{ cursor: "pointer" }}>
                  <Link href={data.twitter}>
                    <Image
                      src={"/media/svg/twitter.svg"}
                      alt="Twitter"
                      width={40}
                      height={40}
                      id="tooltiptwitter"
                    />
                  </Link>
                </div>
              )}
              {data?.Linkedin && (
                <div style={{ cursor: "pointer" }}>
                  <Link href={data.Linkedin}>
                    <Image
                      src={"/media/svg/linkedin-2.svg"}
                      alt="LinkedIn"
                      width={35}
                      height={35}
                      id="tooltiplinkedin"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-center">
            <label className="fw-bold mb-5">Or copy link</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Copy profile link"
                aria-label="Copy profile link"
                aria-describedby="basic-addon3"
                value={data?.profile_url}
                readOnly
              />
              <CopyToClipboard
                text={data?.profile_url}
                onCopy={() => setCopied(true)}
              >
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                >
                  <KTIcon iconName="copy" iconType="duotone" className="fs-2" />
                </span>
              </CopyToClipboard>
            </div>
            {copied ? <span style={{ color: "blue" }}>Copied!</span> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileShare;
