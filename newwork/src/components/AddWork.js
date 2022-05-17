import React, { useState } from "react";
import serialize from "form-serialize";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

class AddWork extends React.Component {
  state = {
    kategori: "",
    date: new Date(),
    aktivite: "",
    onay: "",
  };
  handleChangekategori = (event) => {
    this.setState({ kategori: event.target.value });
  };
  handleChangeaktivite = (event) => {
    this.setState({ aktivite: event.target.value });
  };
  handleChangeOnay = (event) => {
    this.setState({ onay: event.target.value });
  };

  handleDateChange = (newDate) => {
    this.setState({ date: newDate });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const newWork = serialize(e.target, { hash: true });

    this.props.onAddWork(newWork);
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
                value={this.state.kategori}
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
                <MenuItem value={4} color="success">
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
            />
          </div>
          <div>
            <FormControl size="small" color="success">
              <InputLabel id="aktivite-select">Aktivite</InputLabel>
              <Select
                label="Aktivite Durumu Seçiniz"
                labelId="aktivite-select"
                id="aktivite-select"
                value={this.state.aktivite}
                onChange={this.handleChangeaktivite}
                sx={{ width: 220, height: 53 }}
                color="success"
              >
                <MenuItem value={5}>Aktif</MenuItem>
                <MenuItem value={6}>Pasif</MenuItem>
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
                value={this.state.onay}
                onChange={this.handleChangeOnay}
                sx={{ width: 220, height: 53 }}
              >
                <MenuItem value={7}>Onaylandı</MenuItem>
                <MenuItem value={8}>Onaylanmadı</MenuItem>
                <MenuItem value={9}>Beklemede</MenuItem>
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
              value={this.state.date}
              onChange={(newDate) => {
                this.handleDateChange(newDate);
              }}
            />
          </LocalizationProvider>
          <div>
            <Button
              variant="contained"
              color="success"
              sx={{ width: 220, height: 53 }}
            >
              Yeni İş Ekle
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
export default AddWork;
