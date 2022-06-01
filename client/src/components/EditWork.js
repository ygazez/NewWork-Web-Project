import React from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";

class EditWork extends React.Component {
  state = {
    Kategori_ID: "",
    Tarih: new Date(),
    iş_aktivite_ID: "",
    iş_Durum_ID: "",
    Konum: "",

    iş_gün_sayısı: "",
  };

  iş_ID = this.props.match.params.id;

  async componentDidMount() {
    const response = await axios.get(
      `https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/Details/${this.iş_ID}`
    );
    console.log(response.data);

    const work = response.data;

    this.setState({
      Kategori_ID: work.Kategori_ID,
      Tarih: work.Tarih,
      iş_aktivite_ID: work.iş_aktivite_ID,
      iş_Durum_ID: work.iş_Durum_ID,
      Konum: work.Konum,

      iş_gün_sayısı: work.iş_gün_sayısı,
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleDateChange = (newDate) => {
    this.setState({ Tarih: newDate });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      Kategori_ID,
      Tarih,
      Konum,

      iş_aktivite_ID,
      iş_Durum_ID,
      iş_gün_sayısı,
    } = this.state;

    const updatedWork = {
      Kategori_ID,
      Tarih,
      Konum,

      iş_aktivite_ID,
      iş_Durum_ID,
      iş_gün_sayısı,
    };
    this.props.onEditWork(this.iş_ID, updatedWork);
    this.props.history.push("/");
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
              placeholder="İŞ BİLGİLERİNİ GÜNCELLEYİNİZ.."
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
                name="Kategori_ID"
                value={this.state.Kategori_ID}
                onChange={this.onInputChange}
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
                name="Konum"
                onChange={this.onInputChange}
                value={this.state.Konum}
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
              name="iş_gün_sayısı"
              onChange={this.onInputChange}
              value={this.state.iş_gün_sayısı}
            />
          </div>
          <div>
            <FormControl size="small" color="success">
              <InputLabel id="aktivite-select">Aktivite</InputLabel>
              <Select
                label="Aktivite Durumu Seçiniz"
                labelId="aktivite-select"
                id="aktivite-select"
                name="iş_aktivite_ID"
                value={this.state.iş_aktivite_ID}
                onChange={this.onInputChange}
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
                name="iş_Durum_ID"
                value={this.state.iş_Durum_ID}
                onChange={this.onInputChange}
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
              İŞ BİLGİLERİNİ GÜNCELLE
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default EditWork;
