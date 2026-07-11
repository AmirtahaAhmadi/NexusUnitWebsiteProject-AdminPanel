// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const Address = ({ stepper, type, data, onSubmit }) => {
  const [lat, setLat] = useState(
    data.latitude === "null" || data.latitude === "undefined"
      ? ""
      : data.latitude,
  );
  const [long, setLong] = useState(
    data.longitude === "null" || data.longitude === "undefined"
      ? ""
      : data.longitude,
  );
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView(
      [data.latitude || 35.6892, data.longitude || 51.389],
      12,
    );
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    ).addTo(map);
    markerRef.current = L.marker([
      data.latitude || 35.6892,
      data.longitude || 51.389,
    ]).addTo(map);
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      markerRef.current.setLatLng(e.latlng);
      setLat(lat);
      setLong(lng);
    });
    return () => map.remove();
  }, []);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data]);

  const OnSubmitForm = () => {
    onSubmit({ latitude: lat, longitude: long });
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">آدرس</h5>
        <small>آدرس را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(OnSubmitForm)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`longitude-${type}`}>
              مختصات طول جغرافیایی
            </Label>
            <div
              style={{
                height: "40px",
                paddingRight: "5px",
                border: "1px solid #24242410",
                borderRadius: "8px",
              }}
              className="d-flex align-items-center"
            >
              {long || data.longitude}
            </div>
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`latitude-${type}`}>
              مختصات عرض جغرافیایی
            </Label>
            <div
              style={{
                height: "40px",
                paddingRight: "5px",
                border: "1px solid #24242410",
                borderRadius: "8px",
              }}
              className="d-flex align-items-center"
            >
              {lat || data.latitude}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">نقشه</Label>
            <div
              style={{ height: "200px", borderRadius: "8px" }}
              ref={mapRef}
            ></div>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Address;
