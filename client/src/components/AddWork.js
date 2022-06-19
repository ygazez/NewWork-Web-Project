import React, { useState } from "react";
import serialize from "form-serialize";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";
import { height, minHeight } from "@mui/system";
import Stack from "@mui/material/Stack";
import axios from "axios";

class AddWork extends React.Component {
  state = {
    Kategori_ID: "",
    Tarih: new Date(),
    iş_aktivite_ID: "",
    iş_Durum_ID: "",
    Konum: "",
    iş_gün_sayısı: "",
    iş_ID: 0,
  };
  async componentDidMount() {
    if (
      this.props.match.params.id !== undefined &&
      this.props.match.params.id !== null
    ) {
      const response = await axios.get(
        `https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/Details/${this.props.match.params.id}`
      );
      const work = response.data;
      this.setState({
        Kategori_ID: work.Kategori_ID,
        Tarih: work.Tarih,
        iş_aktivite_ID: work.iş_aktivite_ID,
        iş_Durum_ID: work.iş_Durum_ID,
        Konum: work.Konum,
        iş_gün_sayısı: work.iş_gün_sayısı,
        iş_ID: this.props.match.params.id,
      });
    }
  }

  handleChangeKonum = (event) => {
    this.setState({ Konum: event.target.value });
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
    console.log(this.state.iş_ID);
    this.state.iş_ID === 0
      ? this.props.onAddWork(this.state)
      : this.props.onEditWork(this.state.iş_ID, this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <div>
              <input
                color="success"
                className="form-control"
                id="disabledInput"
                type="text"
                placeholder={
                  this.state.iş_ID === 0
                    ? "Yeni İş Ekleyiniz"
                    : "Mevcut İşi Güncelleyiniz"
                }
                disabled
              />
            </div>
            <Box sx={{ minWidth: 300, minHeight: 80 }}>
              <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
              <FormControl fullWidth margin="normal">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.Kategori_ID}
                  label="Kategori"
                  onChange={this.handleChangekategori}
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
            </Box>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "26ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth margin="normal" size="normal">
                  <TextField
                    margin="normal"
                    size="string"
                    id="outlined-basic"
                    label="Konum"
                    variant="outlined"
                    onChange={this.handleChangeKonum}
                    value={this.state.Konum}
                  />
                </FormControl>
              </Box>
            </div>
            <div>
              <Box sx={{ minWidth: 279, minHeight: 80 }}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-number"
                    label="Gün sayısı giriniz"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleChangeişgünsayısı}
                    value={this.state.iş_gün_sayısı}
                  />
                </FormControl>
              </Box>
            </div>
            <div>
              <Box sx={{ minWidth: 300, minHeight: 80 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Aktivite
                  </InputLabel>
                  <Select
                    label="demo-simple-select-helper"
                    labelId="demo-simple-select-helper-label"
                    id="aktivite-select"
                    value={this.state.iş_aktivite_ID}
                    onChange={this.handleChangeaktivite}
                    color="success"
                  >
                    <MenuItem value={1}>Aktif</MenuItem>
                    <MenuItem value={2}>Pasif</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div>
              <Box sx={{ minWidth: 300, minHeight: 80 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    İş Onay Durumu
                  </InputLabel>
                  <Select
                    label="demo-simple-select-helper"
                    labelId="demo-simple-select-helper-label"
                    id="durum-select"
                    value={this.state.iş_Durum_ID}
                    onChange={this.handleChangeOnay}
                  >
                    <MenuItem value={1}>Onaylandı</MenuItem>
                    <MenuItem value={2}>Onaylanmadı</MenuItem>
                    <MenuItem value={3}>Beklemede</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField size="normal" {...props} />
                  )}
                  label="Tarih Seçiniz"
                  value={this.state.Tarih}
                  onChange={(newDate) => {
                    this.handleDateChange(newDate);
                  }}
                />
              </Stack>
            </LocalizationProvider>
            <div>
              <button className="btn btn-danger btn-block" type="submit">
                {this.state.iş_ID === 0 ? "Yeni İş Ekle" : "İş Güncelle"}
              </button>
            </div>
          </Grid>
        </form>
      </div>
    );
  }
}
export default AddWork;
