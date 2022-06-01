import React, { useState } from "react";
import "./Work.css";
import { Link } from "react-router-dom";
import "./App";

const Worklist = (props) => {
  // function handleClick(event){
  //    console.log(event);
  //}
  const photoSelect = (Kategori_Adi) => {
    let imgUrl = "";
    if (Kategori_Adi === "Teknoloji") {
      imgUrl =
        "https://www.vargonen.com/blog/wp-content/uploads/2020/05/teknoloji-nereye-gidiyor.jpg";
    } else if (Kategori_Adi === "Bahçe") {
      imgUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFM4VDHmnandM2tH1z-eebvcvwxuDWX2zHuA&usqp=CAU";
    } else if (Kategori_Adi === "Temizlik") {
      imgUrl =
        "https://www.dogutemizlik.com/File_Uploadx/Sayfa/buyuk/metropol-temizlik-sirketi-197683.JPG";
    } else if (Kategori_Adi === "Eğitim") {
      //Kategori_Adi==Eğitim
      imgUrl =
        "https://edx.com.tr/wp-content/uploads/2020/06/egitim_modelleri.jpg";
    }
    return imgUrl;
  };
  return (
    <div className="row">
      {props.works.map((u, i) => (
        <div className="col-lg-3" key={i}>
          <div className="card mb-4 shadow-sm" align="center">
            <h5 className="card-title">{u.Tbl_Kategori.Kategori_Adi}</h5>
            <div align="center">
              <img
                src={photoSelect(u.Tbl_Kategori.Kategori_Adi)}
                className="card-img-top"
                alt="User"
              />
            </div>
            <div className="card-body">
              <p className="card-text">{u.Konum}</p>

              <p className="card-text2">
                {u.Tbl_iş_aktivite.iş_aktivite_durumu}
              </p>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={(event) => props.deleteWorkProp(u.iş_ID)}
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>
                <Link
                  type="button"
                  className="btn btn-md btn-outline-primary"
                  to={`Edit/${u.iş_ID}`}
                >
                  Edit{" "}
                </Link>
                <h2>
                  <span className="badge badge-info">
                    {u.iş_gün_sayısı}
                    {"gün"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Worklist;
