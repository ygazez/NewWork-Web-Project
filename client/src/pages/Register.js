import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const Ad_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Şifre_REGEX = /^[0-9-_]{3,23}$/;
const Soyad_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Mail_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Telefon_REGEX = /^[0-9-_]{3,23}$/;

const REGISTER_URL = "/Create";

const Register = () => {
  const SoyadRef = useRef();
  const TelefonRef = useRef();
  const MailRef = useRef();
  const ŞifreRef = useRef();
  const AdRef = useRef();

  const errRef = useRef();

  const [Ad, setAd] = useState("");
  const [Soyad, setSoyad] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Mail, setMail] = useState("");
  const [Şifre, setSifre] = useState("");

  const [validAd, setValidAd] = useState(false);
  const [AdFocus, setAdFocus] = useState(false);

  const [validSoyad, setValidSoyad] = useState(false);
  const [SoyadFocus, setSoyadFocus] = useState(false);

  const [validTelefon, setValidTelefon] = useState(false);
  const [TelefonFocus, setTelefonFocus] = useState(false);

  const [validMail, setValidMail] = useState(false);
  const [MailFocus, setMailFocus] = useState(false);

  const [validŞifre, setValidŞifre] = useState(false);
  const [ŞifreFocus, setŞifreFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AdRef.current.focus();
  }, []);
  useEffect(() => {
    SoyadRef.current.focus();
  }, []);

  useEffect(() => {
    TelefonRef.current.focus();
  }, []);

  useEffect(() => {
    MailRef.current.focus();
  }, []);

  useEffect(() => {
    ŞifreRef.current.focus();
  }, []);

  useEffect(() => {
    setValidAd(Ad_REGEX.test(Ad));
  }, [Ad]);

  useEffect(() => {
    setValidSoyad(Soyad_REGEX.test(Soyad));
  }, [Soyad]);

  useEffect(() => {
    setValidTelefon(Telefon_REGEX.test(Telefon));
  }, [Telefon]);

  useEffect(() => {
    setValidMail(Mail_REGEX.test(Mail));
  }, [Mail]);

  useEffect(() => {
    setValidŞifre(Şifre_REGEX.test(Şifre));
  }, [Şifre]);

  useEffect(() => {
    setErrMsg("");
  }, [Ad, Soyad, Telefon, Mail, Şifre]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = Ad_REGEX.test(Ad);
    const v2 = Soyad_REGEX.test(Soyad);
    const v3 = Telefon_REGEX.test(Telefon);
    const v4 = Mail_REGEX.test(Mail);
    const v5 = Şifre_REGEX.test(Şifre);

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Geçersiz Girdi");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ Ad, Soyad, Telefon, Mail, Şifre }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setAd("");
      setSoyad("");
      setTelefon("");
      setMail("");
      setSifre("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sunucu Yanıtı Yok");
      } else {
        setErrMsg("Kayıt başarısız");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Başarılı!</h1>
          <p>
            <a href="#">Giriş yap</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Kayıt ol</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Ad">
              Ad:
              <FontAwesomeIcon
                icon={faCheck}
                className={validAd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validAd || !Ad ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="Ad"
              ref={AdRef}
              autoComplete="off"
              onChange={(e) => setAd(e.target.value)}
              value={Ad}
              required
              aria-invalid={validAd ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setAdFocus(true)}
              onBlur={() => setAdFocus(false)}
            />
            <p
              id="Ad"
              className={
                AdFocus && Ad && !validAd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 ila 24 karakter.
              <br />
              Bir harfle başlamalıdır.
              <br />
            </p>

            <label htmlFor="Soyad">
              Soyad:
              <FontAwesomeIcon
                icon={faCheck}
                className={validSoyad ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validSoyad || !Soyad ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="Soyad"
              ref={SoyadRef}
              autoComplete="off"
              onChange={(e) => setSoyad(e.target.value)}
              value={Soyad}
              required
              aria-invalid={validSoyad ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setSoyadFocus(true)}
              onBlur={() => setSoyadFocus(false)}
            />
            <p
              id="uidnote"
              className={
                SoyadFocus && Soyad && !validSoyad
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 ila 24 karakter.
              <br />
              Bir harfle başlamalıdır.
              <br />
            </p>
            <label htmlFor="Telefon">
              Telefon:
              <FontAwesomeIcon
                icon={faCheck}
                className={validTelefon ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validTelefon || !Telefon ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="Telefon"
              ref={TelefonRef}
              autoComplete="off"
              onChange={(e) => setTelefon(e.target.value)}
              value={Telefon}
              required
              aria-invalid={validTelefon ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setTelefonFocus(true)}
              onBlur={() => setTelefonFocus(false)}
            />
            <p
              id="uidnote"
              className={
                TelefonFocus && Telefon && !validTelefon
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 ila 24 karakter.
              <br />
              Bir harfle başlamalıdır.
              <br />
            </p>
            <label htmlFor="Mail">
              Mail:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMail || !Mail ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="Mail"
              ref={MailRef}
              autoComplete="off"
              onChange={(e) => setMail(e.target.value)}
              value={Mail}
              required
              aria-invalid={validMail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setMailFocus(true)}
              onBlur={() => setMailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                MailFocus && Mail && !validMail ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              <br />
            </p>

            <label htmlFor="şifre">
              Şifre:
              <FontAwesomeIcon
                icon={faCheck}
                className={validŞifre ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validŞifre || !Şifre ? "hide" : "invalid"}
              />
            </label>
            <input
              type="Sifre"
              id="Şifre"
              ref={ŞifreRef}
              onChange={(e) => setSifre(e.target.value)}
              value={Şifre}
              required
              aria-invalid={validŞifre ? "false" : "true"}
              aria-describedby="Şifrenote"
              onFocus={() => setŞifreFocus(true)}
              onBlur={() => setŞifreFocus(false)}
            />
            <p
              id="Şifrenote"
              className={
                ŞifreFocus && !validŞifre ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 ila 24 karakter.
              <br />
              Büyük ve küçük harfler, bir sayı ve özel bir karakter içermelidir.
              <br />
              İzin verilen özel karakterler:
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <button disabled={!validAd || !validŞifre ? true : false}>
              Kayıt ol
            </button>
          </form>
          <p>
            <span className="line">
              {/*put router link here*/}
              <a href="/Login">Giriş yap</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
