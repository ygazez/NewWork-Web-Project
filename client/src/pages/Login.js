import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const AdRef = useRef();
  const SoyadRef = useRef();

  const ŞifreRef = useRef();

  const errRef = useRef();

  const [Ad, setAd] = useState("");
  const [Soyad, setSoyad] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Mail, setMail] = useState("");

  const [Şifre, setŞifre] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [Ad, Soyad, Telefon, Mail, Şifre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ Ad, Soyad, Telefon, Mail, Şifre }),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ Ad, Soyad, Telefon, Mail, Şifre, roles, accessToken });
      setAd("");
      setSoyad("");
      setTelefon("");
      setMail("");

      setŞifre("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sunucu Yanıtı Yok");
      } else if (err.response?.status === 401) {
        setErrMsg("Yetkisiz");
      } else {
        setErrMsg("Giriş başarısız oldu");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Giriş yaptınız!</h1>
          <br />
          <p>
            <a href="/Work">Ana Sayfa</a>
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
          <h1>Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Ad">Ad:</label>
            <input
              type="text"
              id="Ad"
              ref={AdRef}
              autoComplete="off"
              onChange={(e) => setAd(e.target.value)}
              value={Ad}
              required
            />
            <label htmlFor="Soyad">Soyad:</label>
            <input
              type="text"
              id="Soyad"
              ref={SoyadRef}
              autoComplete="off"
              onChange={(e) => setSoyad(e.target.value)}
              value={Soyad}
              required
            />

            <label htmlFor="Şifre  ">Şifre:</label>
            <input
              type="password"
              id="Şifre"
              ref={ŞifreRef}
              onChange={(e) => setŞifre(e.target.value)}
              value={Şifre}
              required
            />
            <button>Giriş Yap</button>
          </form>
          <p>
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/Register">Kayıt Ol</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
