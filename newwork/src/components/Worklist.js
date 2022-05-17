import React, { useState } from "react";
import "./Work.css";

const Worklist = (props) => {
  // function handleClick(event){
  //    console.log(event);
  //}

  return (
    <div className="row">
      {props.works.map((u) => (
        <div className="col-lg-3" key={u.iş_ID}>
          <div className="card mb-4 shadow-sm">
            <h5 className="card-title">{u.Tbl_Kategori.Kategori_Adi}</h5>

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&usqp=CAU"
              className="card-img-top"
              alt="User"
            />
            <div className="card-body">
              <p className="card-text">{u.Konum}</p>
              <p className="card-text2">
                {u.Tbl_iş_aktivite.iş_aktivite_durumu}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={(event) => props.deleteWorkprop(u)}
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>
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
