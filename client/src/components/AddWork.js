import React, { useState } from "react";
import serialize from "form-serialize";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";

class AddWork extends React.Component {
  state = {
    Kategori_ID: "",
    Tarih: new Date(),
    iş_aktivite_ID: "",
    iş_Durum_ID: "",
    konum: "",

    iş_gün_sayısı: "",
  };

  handleChangeKonum = (event) => {
    this.setState({ konum: event.target.value });
  };

  handleChangeişgünsayısı = (event) => {
    this.setState({ iş_gün_sayısı: parseInt(event.target.value) });
  };
  handleChangekategori = (event) => {
    this.setState({ Kategori_ID: event.target.value });
  };
  handleChangeaktivite = (event) => {
    this.setState({ iş_aktivite_ID: event.target.value });
  };
  handleChangeOnay = (event) => {
    this.setState({ iş_Durum_ID: event.target.value });
  };
  handleDateChange = (newDate) => {
    this.setState({ Tarih: newDate });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // const newWork = serialize(e.target, { hash: true });
    this.props.onAddWork(this.state);
  };

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleFormSubmit} color="success">
          <div>
            <input
              sx={{ width: 220, height: 53 }}
              color="success"
              className="form-control"
              id="disabledInput"
              type="text"
              placeholder="YENİ İŞ EKLEYİNİZ..."
              disabled
            />
          </div>
          <div className="form-row">
            <FormControl size="small" color="success">
              <InputLabel id="kategori-select">Kategori</InputLabel>
              <Select
                sx={{ width: 220, height: 53 }}
                label="Kategori Seçiniz"
                labelId="kategori-select"
                id="kategori-select"
                value={this.state.Kategori_ID}
                onChange={this.handleChangekategori}
                color="success"
              >
                <MenuItem value={1} color="success">
                  Teknoloji
                </MenuItem>
                <MenuItem value={2} color="success">
                  Temizlik
                </MenuItem>
                <MenuItem value={3} color="success">
                  Bahçe
                </MenuItem>
                <MenuItem value={1003} color="success">
                  Eğitim
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Box
              component="form"
              sx={{ width: 220, height: 53 }}
              noValidate
              autoComplete="off"
              color="success"
            >
              <TextField
                id="outlined-basic"
                label="Konum"
                variant="outlined"
                color="success"
                onChange={this.handleChangeKonum}
              />
            </Box>
          </div>

          <div>
            <TextField
              sx={{ width: 220, height: 53 }}
              id="outlined-number"
              label="Gün sayısı giriniz"
              type="number"
              color="success"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeişgünsayısı}
            />
          </div>
          <div>
            <FormControl size="small" color="success">
              <InputLabel id="aktivite-select">Aktivite</InputLabel>
              <Select
                label="Aktivite Durumu Seçiniz"
                labelId="aktivite-select"
                id="aktivite-select"
                value={this.state.iş_aktivite_ID}
                onChange={this.handleChangeaktivite}
                sx={{ width: 220, height: 53 }}
                color="success"
              >
                <MenuItem value={1}>Aktif</MenuItem>
                <MenuItem value={2}>Pasif</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              color="success"
              size="small"
              sx={{ width: 220, height: 53 }}
            >
              <InputLabel id="durum-select">İş Onay Durumu</InputLabel>
              <Select
                label="Onay Durumu Seçiniz"
                labelId="durum-select"
                id="durum-select"
                value={this.state.iş_Durum_ID}
                onChange={this.handleChangeOnay}
                sx={{ width: 220, height: 53 }}
              >
                <MenuItem value={1}>Onaylandı</MenuItem>
                <MenuItem value={2}>Onaylanmadı</MenuItem>
                <MenuItem value={3}>Beklemede</MenuItem>
              </Select>
            </FormControl>
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  sx={{ width: 220, height: 53 }}
                  color="success"
                  size="small"
                  {...props}
                />
              )}
              sx={{ width: 220, height: 53 }}
              label="Tarih Seçiniz"
              value={this.state.Tarih}
              onChange={(newDate) => {
                this.handleDateChange(newDate);
              }}
            />
          </LocalizationProvider>
          <div>
            <button className="btn btn-danger btn-block" type="submit">
              Add Work
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default AddWork;
